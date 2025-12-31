import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SideNav } from '@/components/side-nav'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learn DSA - Data Structures & Algorithms',
  description: 'Interactive learning platform for Data Structures and Algorithms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-background">
          <SideNav />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
