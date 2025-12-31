import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Code2, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Master Data Structures & Algorithms
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Learn, visualize, and practice DSA with interactive examples and comprehensive explanations
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/data-structures/arrays">
              <Button size="lg" className="gap-2">
                Start Learning <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/algorithms/sorting">
              <Button size="lg" variant="outline" className="gap-2">
                Explore Algorithms
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Rich Content</h3>
            <p className="text-muted-foreground">
              Detailed explanations, time/space complexity analysis, and real-world use cases
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Code Examples</h3>
            <p className="text-muted-foreground">
              Multiple language implementations with syntax highlighting and best practices
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Interactive</h3>
            <p className="text-muted-foreground">
              Visual demonstrations and step-by-step algorithm walkthroughs
            </p>
          </div>
        </div>

        {/* Topics Overview */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Data Structures</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: 'Arrays', slug: 'arrays', desc: 'Linear data structure basics' },
                { name: 'Linked Lists', slug: 'linked-lists', desc: 'Node-based structures' },
                { name: 'Stacks & Queues', slug: 'stacks', desc: 'LIFO and FIFO structures' },
                { name: 'Trees', slug: 'trees', desc: 'Hierarchical data organization' },
                { name: 'Graphs', slug: 'graphs', desc: 'Network and relationships' },
                { name: 'Hash Tables', slug: 'hash-tables', desc: 'Fast key-value lookups' },
              ].map((ds) => (
                <Link key={ds.slug} href={`/data-structures/${ds.slug}`}>
                  <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <h3 className="font-semibold mb-1">{ds.name}</h3>
                    <p className="text-sm text-muted-foreground">{ds.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Algorithms</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: 'Sorting', slug: 'sorting', desc: 'Arrange data in order' },
                { name: 'Searching', slug: 'searching', desc: 'Find elements efficiently' },
                { name: 'Dynamic Programming', slug: 'dynamic-programming', desc: 'Optimization techniques' },
                { name: 'Graph Algorithms', slug: 'graph-algorithms', desc: 'Traverse and analyze graphs' },
              ].map((algo) => (
                <Link key={algo.slug} href={`/algorithms/${algo.slug}`}>
                  <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <h3 className="font-semibold mb-1">{algo.name}</h3>
                    <p className="text-sm text-muted-foreground">{algo.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
