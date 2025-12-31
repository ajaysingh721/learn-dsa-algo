'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Table, Link as LinkIcon, Layers, List, GitBranch, Network, Hash, Triangle,
  ArrowUpDown, Search, Zap, Target, Share2, ChevronDown
} from 'lucide-react'
import { useState } from 'react'

interface NavItem {
  title: string
  slug: string
  icon: React.ComponentType<{ className?: string }>
  children?: Omit<NavItem, 'children'>[]
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navigationData: NavSection[] = [
  {
    title: 'Data Structures',
    items: [
      { title: 'Arrays', slug: 'arrays', icon: Table },
      { title: 'Linked Lists', slug: 'linked-lists', icon: LinkIcon },
      { title: 'Stacks', slug: 'stacks', icon: Layers },
      { title: 'Queues', slug: 'queues', icon: List },
      { title: 'Trees', slug: 'trees', icon: GitBranch },
      { title: 'Graphs', slug: 'graphs', icon: Network },
      { title: 'Hash Tables', slug: 'hash-tables', icon: Hash },
      { title: 'Heaps', slug: 'heaps', icon: Triangle },
    ],
  },
  {
    title: 'Algorithms',
    items: [
      { 
        title: 'Sorting', 
        slug: 'sorting', 
        icon: ArrowUpDown,
        children: [
          { title: 'Quick Sort', slug: 'sorting/quick-sort', icon: ArrowUpDown },
          { title: 'Merge Sort', slug: 'sorting/merge-sort', icon: ArrowUpDown },
          { title: 'Heap Sort', slug: 'sorting/heap-sort', icon: ArrowUpDown },
          { title: 'Bubble Sort', slug: 'sorting/bubble-sort', icon: ArrowUpDown },
          { title: 'Insertion Sort', slug: 'sorting/insertion-sort', icon: ArrowUpDown },
          { title: 'Selection Sort', slug: 'sorting/selection-sort', icon: ArrowUpDown },
          { title: 'Counting Sort', slug: 'sorting/counting-sort', icon: ArrowUpDown },
        ]
      },
      { 
        title: 'Searching', 
        slug: 'searching', 
        icon: Search,
        children: [
          { title: 'Binary Search', slug: 'searching', icon: Search },
          { title: 'Linear Search', slug: 'searching/linear-search', icon: Search },
        ]
      },
      { title: 'Dynamic Programming', slug: 'dynamic-programming', icon: Zap },
      { title: 'Greedy', slug: 'greedy', icon: Target },
      { title: 'Graph Algorithms', slug: 'graph-algorithms', icon: Share2 },
    ],
  },
]

export function SideNav() {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(['Data Structures', 'Algorithms'])
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    )
  }

  const toggleItem = (slug: string) => {
    setExpandedItems((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  return (
    <div className="w-64 border-r bg-card h-screen overflow-y-auto">
      <div className="p-6 border-b">
        <Link href="/">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Learn DSA
          </h2>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">
          Data Structures & Algorithms
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {navigationData.map((section) => {
          const isExpanded = expandedSections.includes(section.title)
          const basePath = section.title === 'Data Structures' ? 'data-structures' : 'algorithms'

          return (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-foreground hover:bg-accent rounded-md transition-colors"
              >
                {section.title}
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform',
                    isExpanded && 'transform rotate-180'
                  )}
                />
              </button>

              {isExpanded && (
                <div className="ml-2 mt-1 space-y-1">
                  {section.items.map((item) => {
                    const href = `/${basePath}/${item.slug}`
                    const isActive = pathname === href
                    const Icon = item.icon
                    const hasChildren = item.children && item.children.length > 0
                    const isItemExpanded = expandedItems.includes(item.slug)

                    return (
                      <div key={item.slug}>
                        {hasChildren ? (
                          <>
                            <button
                              onClick={() => toggleItem(item.slug)}
                              className={cn(
                                'flex items-center justify-between w-full gap-3 px-3 py-2 text-sm rounded-md transition-colors',
                                isActive
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{item.title}</span>
                              </div>
                              <ChevronDown
                                className={cn(
                                  'w-3 h-3 transition-transform',
                                  isItemExpanded && 'transform rotate-180'
                                )}
                              />
                            </button>
                            
                            {isItemExpanded && (
                              <div className="ml-6 mt-1 space-y-1 border-l-2 border-border pl-2">
                                {item.children?.map((child) => {
                                  const childHref = `/${basePath}/${child.slug}`
                                  const isChildActive = pathname === childHref
                                  const ChildIcon = child.icon

                                  return (
                                    <Link key={child.slug} href={childHref}>
                                      <div
                                        className={cn(
                                          'flex items-center gap-2 px-3 py-1.5 text-xs rounded-md transition-colors',
                                          isChildActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                        )}
                                      >
                                        <ChildIcon className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">{child.title}</span>
                                      </div>
                                    </Link>
                                  )
                                })}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link href={href}>
                            <div
                              className={cn(
                                'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
                                isActive
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                              )}
                            >
                              <Icon className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{item.title}</span>
                            </div>
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
