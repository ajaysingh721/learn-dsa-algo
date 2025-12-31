'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, CheckCircle2, XCircle, Code2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function LinkedListsPage() {
  const example = {
    title: "Singly Linked List",
    difficulty: "beginner",
    description: "A linear data structure where elements are stored in nodes with pointers to the next node",
    explanation: `A linked list is a fundamental data structure consisting of nodes, where each node contains data and a reference (link) to the next node in the sequence.

**Structure:**
Each node has two parts:
1. **Data**: The value stored in the node
2. **Next**: A pointer/reference to the next node

**Key Operations:**
- **Insert at Head**: O(1) - Add new node at beginning
- **Insert at Tail**: O(n) or O(1) with tail pointer - Add at end
- **Delete**: O(n) - Remove a node
- **Search**: O(n) - Find a value
- **Access**: O(n) - No random access like arrays

**Advantages Over Arrays:**
- Dynamic size - grows and shrinks easily
- Efficient insertions/deletions at beginning
- No wasted memory from pre-allocation`,
    time_complexity: "O(1) for insertion at head, O(n) for search and access",
    space_complexity: "O(n)",
    code_example: `# Singly Linked List Implementation
class Node:
    """Node class for linked list"""
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    """Singly Linked List implementation"""
    def __init__(self):
        self.head = None
        self.size = 0
    
    def insert_at_head(self, data):
        """Insert node at the beginning - O(1)"""
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    def insert_at_tail(self, data):
        """Insert node at the end - O(n)"""
        new_node = Node(data)
        
        if not self.head:
            self.head = new_node
            self.size += 1
            return
        
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
        self.size += 1
    
    def delete(self, data):
        """Delete first occurrence of data - O(n)"""
        if not self.head:
            return False
        
        # If head needs to be deleted
        if self.head.data == data:
            self.head = self.head.next
            self.size -= 1
            return True
        
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                self.size -= 1
                return True
            current = current.next
        
        return False
    
    def search(self, data):
        """Search for a value - O(n)"""
        current = self.head
        position = 0
        
        while current:
            if current.data == data:
                return position
            current = current.next
            position += 1
        
        return -1
    
    def display(self):
        """Display the linked list"""
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        return " -> ".join(elements) + " -> None"
    
    def reverse(self):
        """Reverse the linked list - O(n)"""
        prev = None
        current = self.head
        
        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        
        self.head = prev

# Usage Example
ll = LinkedList()

# Insert elements
ll.insert_at_head(3)
ll.insert_at_head(2)
ll.insert_at_head(1)
ll.insert_at_tail(4)
ll.insert_at_tail(5)

print("Linked List:", ll.display())
# Output: 1 -> 2 -> 3 -> 4 -> 5 -> None

# Search for element
position = ll.search(3)
print(f"Element 3 found at position: {position}")  # Output: 2

# Delete element
ll.delete(3)
print("After deleting 3:", ll.display())
# Output: 1 -> 2 -> 4 -> 5 -> None

# Reverse the list
ll.reverse()
print("After reversing:", ll.display())
# Output: 5 -> 4 -> 2 -> 1 -> None`,
    use_cases: [
      "Implementing stacks and queues",
      "Browser history navigation (back/forward)",
      "Music player playlists",
      "Undo functionality in applications",
      "Hash table collision resolution (chaining)",
      "Memory allocation in operating systems",
      "Polynomial representation in mathematics",
      "Image viewer (next/previous image)"
    ],
    pros: [
      "Dynamic size - no need to specify size upfront",
      "Easy insertion/deletion at beginning O(1)",
      "No memory waste from unused allocated space",
      "Can grow indefinitely (memory permitting)",
      "Efficient for implementing other data structures"
    ],
    cons: [
      "No random access - must traverse from head",
      "Extra memory for storing pointers",
      "Not cache-friendly due to non-contiguous memory",
      "Reverse traversal requires doubly linked list",
      "Accessing middle elements is slow O(n)"
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{example.title}</h1>
          <Badge variant="secondary">{example.difficulty.charAt(0).toUpperCase() + example.difficulty.slice(1)}</Badge>
        </div>
        <p className="text-xl text-muted-foreground">{example.description}</p>
      </div>

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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Code Example
          </CardTitle>
          <CardDescription>Python implementation with all operations</CardDescription>
        </CardHeader>
        <CardContent>
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{ margin: 0, borderRadius: '0.5rem' }}
          >
            {example.code_example}
          </SyntaxHighlighter>
        </CardContent>
      </Card>

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

      <Card>
        <CardHeader>
          <CardTitle>Real-World Use Cases</CardTitle>
          <CardDescription>Where linked lists are commonly used</CardDescription>
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
