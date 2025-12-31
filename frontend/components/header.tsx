'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    if (pathname === '/') return []

    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs = []

    for (let i = 0; i < paths.length; i++) {
      const path = `/${paths.slice(0, i + 1).join('/')}`
      const label = paths[i]
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      breadcrumbs.push({ label, path })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <header className="border-b bg-card">
      <div className="flex items-center h-16 px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>

          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1

            return (
              <div key={crumb.path} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
                {isLast ? (
                  <span className="font-medium text-foreground">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          {/* Future: Add search, theme toggle, etc. */}
        </div>
      </div>
    </header>
  )
}
