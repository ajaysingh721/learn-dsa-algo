'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, CheckCircle2, XCircle, Code2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Example {
  id: number
  title: string
  slug: string
  description: string
  explanation: string
  time_complexity: string
  space_complexity: string
  difficulty: string
  code_example: string
  use_cases: string[]
  pros: string[]
  cons: string[]
}

export default function ArraysPage() {
  const [example, setExample] = useState<Example | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch from API
    // For now, using mock data
    const mockExample: Example = {
      id: 1,
      title: "Dynamic Array (List)",
      slug: "dynamic-array",
      description: "A resizable array that grows automatically when elements are added",
      explanation: `Dynamic arrays are one of the most fundamental data structures in programming. Unlike static arrays with fixed sizes, dynamic arrays can grow and shrink as needed.

**How They Work:**
Dynamic arrays start with an initial capacity. When you add elements and reach this capacity, the array automatically allocates a new, larger block of memory (typically double the previous size), copies all existing elements to the new location, and then adds the new element.

**Key Operations:**
- **Access**: O(1) - Direct index-based access
- **Append**: O(1) amortized - Usually fast, occasional resize
- **Insert**: O(n) - May need to shift elements
- **Delete**: O(n) - May need to shift elements
- **Search**: O(n) - Linear search unless sorted`,
      time_complexity: "O(1) average for append, O(n) for insert at position",
      space_complexity: "O(n)",
      difficulty: "beginner",
      code_example: `# Dynamic Array Example
class DynamicArray:
    def __init__(self):
        self.array = []
    
    def append(self, item):
        """Add element to the end - O(1) amortized"""
        self.array.append(item)
    
    def get(self, index):
        """Get element at index - O(1)"""
        if 0 <= index < len(self.array):
            return self.array[index]
        raise IndexError("Index out of bounds")
    
    def insert(self, index, item):
        """Insert element at index - O(n)"""
        self.array.insert(index, item)
    
    def remove(self, index):
        """Remove element at index - O(n)"""
        if 0 <= index < len(self.array):
            return self.array.pop(index)
        raise IndexError("Index out of bounds")
    
    def size(self):
        """Get array size - O(1)"""
        return len(self.array)

# Usage Example
arr = DynamicArray()

# Adding elements
arr.append(10)
arr.append(20)
arr.append(30)
print(f"Size: {arr.size()}")  # Output: 3

# Accessing elements
print(f"Element at index 1: {arr.get(1)}")  # Output: 20

# Inserting elements
arr.insert(1, 15)  # Insert 15 at index 1
print(f"After insert: {[arr.get(i) for i in range(arr.size())]}")
# Output: [10, 15, 20, 30]

# Removing elements
arr.remove(2)  # Remove element at index 2
print(f"After remove: {[arr.get(i) for i in range(arr.size())]}")
# Output: [10, 15, 30]`,
      use_cases: [
        "Storing collections of items where size changes dynamically",
        "Implementing other data structures (stacks, queues, heaps)",
        "Database record storage and manipulation",
        "Image processing (pixel arrays)",
        "Building buffers for I/O operations",
        "Game development for entity management"
      ],
      pros: [
        "Fast random access O(1) - can directly access any element",
        "Cache-friendly due to contiguous memory allocation",
        "Simple to implement and use",
        "Memory efficient when size is predictable",
        "Supports iteration in natural order"
      ],
      cons: [
        "Insertions/deletions in middle are expensive O(n)",
        "Resizing operation can be costly when it occurs",
        "May waste memory if allocated size > actual usage",
        "Not suitable for frequent insertions/deletions at arbitrary positions"
      ]
    }

    setExample(mockExample)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!example) {
    return <div className="container mx-auto px-4 py-8">Example not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{example.title}</h1>
          <Badge variant={example.difficulty === 'beginner' ? 'secondary' : 'default'}>
            {example.difficulty.charAt(0).toUpperCase() + example.difficulty.slice(1)}
          </Badge>
        </div>
        <p className="text-xl text-muted-foreground">{example.description}</p>
      </div>

      {/* Complexity Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Time Complexity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-lg font-mono">{example.time_complexity}</code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="w-5 h-5" />
              Space Complexity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-lg font-mono">{example.space_complexity}</code>
          </CardContent>
        </Card>
      </div>

      {/* Explanation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Explanation</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
          {example.explanation.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 whitespace-pre-wrap">{paragraph}</p>
          ))}
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Code Example
          </CardTitle>
          <CardDescription>Python implementation with detailed comments</CardDescription>
        </CardHeader>
        <CardContent>
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
            }}
          >
            {example.code_example}
          </SyntaxHighlighter>
        </CardContent>
      </Card>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {example.pros.map((pro, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <XCircle className="w-5 h-5" />
              Disadvantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {example.cons.map((con, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Real-World Use Cases</CardTitle>
          <CardDescription>Where this data structure is commonly used</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-3">
            {example.use_cases.map((useCase, idx) => (
              <li key={idx} className="flex gap-2 items-start">
                <span className="text-primary mt-1">▹</span>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
