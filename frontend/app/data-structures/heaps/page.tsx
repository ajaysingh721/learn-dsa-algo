'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, CheckCircle2, XCircle, Code2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function HeapsPage() {
  const example = {
    title: "Binary Heap (Min/Max Heap)",
    difficulty: "intermediate",
    description: "A complete binary tree that satisfies the heap property, used for efficient priority queue implementation",
    explanation: `A heap is a specialized tree-based data structure that maintains a heap property. It's implemented as a complete binary tree but stored in an array for efficiency.

**Heap Property:**
- **Max Heap**: Parent ≥ children (root is maximum)
- **Min Heap**: Parent ≤ children (root is minimum)

**Complete Binary Tree:**
All levels are fully filled except possibly the last level, which is filled from left to right.

**Array Representation:**
For node at index i:
- **Left child**: 2i + 1
- **Right child**: 2i + 2
- **Parent**: (i - 1) // 2

**Key Operations:**
- **Insert**: O(log n) - Add element and bubble up
- **Extract Min/Max**: O(log n) - Remove root and heapify
- **Peek**: O(1) - View root element
- **Heapify**: O(log n) - Restore heap property`,
    time_complexity: "O(log n) for insert and extract, O(1) for peek",
    space_complexity: "O(n) for storing n elements",
    code_example: `# Min Heap Implementation
class MinHeap:
    """Min Heap - parent is smaller than children"""
    def __init__(self):
        self.heap = []
    
    def parent(self, i):
        """Get parent index"""
        return (i - 1) // 2
    
    def left_child(self, i):
        """Get left child index"""
        return 2 * i + 1
    
    def right_child(self, i):
        """Get right child index"""
        return 2 * i + 2
    
    def swap(self, i, j):
        """Swap two elements"""
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
    
    def insert(self, value):
        """Insert value into heap - O(log n)"""
        self.heap.append(value)
        self._bubble_up(len(self.heap) - 1)
    
    def _bubble_up(self, i):
        """Move element up to restore heap property"""
        parent = self.parent(i)
        
        if i > 0 and self.heap[i] < self.heap[parent]:
            self.swap(i, parent)
            self._bubble_up(parent)
    
    def extract_min(self):
        """Remove and return minimum element - O(log n)"""
        if not self.heap:
            raise IndexError("Heap is empty")
        
        if len(self.heap) == 1:
            return self.heap.pop()
        
        min_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._bubble_down(0)
        
        return min_val
    
    def _bubble_down(self, i):
        """Move element down to restore heap property"""
        min_index = i
        left = self.left_child(i)
        right = self.right_child(i)
        
        if left < len(self.heap) and self.heap[left] < self.heap[min_index]:
            min_index = left
        
        if right < len(self.heap) and self.heap[right] < self.heap[min_index]:
            min_index = right
        
        if min_index != i:
            self.swap(i, min_index)
            self._bubble_down(min_index)
    
    def peek(self):
        """Return minimum without removing - O(1)"""
        if not self.heap:
            raise IndexError("Heap is empty")
        return self.heap[0]
    
    def size(self):
        """Return number of elements"""
        return len(self.heap)
    
    def is_empty(self):
        """Check if heap is empty"""
        return len(self.heap) == 0

# Example 1: Basic Heap Operations
heap = MinHeap()
values = [5, 3, 8, 1, 9, 2]

for val in values:
    heap.insert(val)
    print(f"Inserted {val}, min is now: {heap.peek()}")

print("\\nExtracting elements in sorted order:")
while not heap.is_empty():
    print(heap.extract_min(), end=" ")
print()

# Example 2: Priority Queue for Task Scheduling
class Task:
    def __init__(self, name, priority):
        self.name = name
        self.priority = priority
    
    def __lt__(self, other):
        return self.priority < other.priority
    
    def __repr__(self):
        return f"Task({self.name}, priority={self.priority})"

class PriorityQueue:
    """Priority Queue using Min Heap"""
    def __init__(self):
        self.heap = MinHeap()
    
    def add_task(self, task):
        """Add task with priority"""
        self.heap.insert(task)
    
    def get_next_task(self):
        """Get highest priority task"""
        return self.heap.extract_min()
    
    def peek_next(self):
        """View next task without removing"""
        return self.heap.peek()

pq = PriorityQueue()
pq.add_task(Task("Email", 3))
pq.add_task(Task("Bug Fix", 1))
pq.add_task(Task("Meeting", 2))

print("\\nProcessing tasks by priority:")
while not pq.heap.is_empty():
    task = pq.get_next_task()
    print(f"Processing: {task}")

# Example 3: Finding K Smallest Elements
def k_smallest(arr, k):
    """Find k smallest elements using heap"""
    heap = MinHeap()
    
    for num in arr:
        heap.insert(num)
    
    result = []
    for _ in range(k):
        result.append(heap.extract_min())
    
    return result

arr = [7, 10, 4, 3, 20, 15]
k = 3
print(f"\\n{k} smallest elements: {k_smallest(arr, k)}")

# Example 4: Merge K Sorted Lists
def merge_k_sorted(lists):
    """Merge k sorted lists using heap"""
    heap = MinHeap()
    result = []
    
    # Insert first element from each list
    for i, lst in enumerate(lists):
        if lst:
            heap.insert((lst[0], i, 0))  # (value, list_index, element_index)
    
    while not heap.is_empty():
        val, list_idx, elem_idx = heap.extract_min()
        result.append(val)
        
        # Insert next element from same list
        if elem_idx + 1 < len(lists[list_idx]):
            next_val = lists[list_idx][elem_idx + 1]
            heap.insert((next_val, list_idx, elem_idx + 1))
    
    return result

lists = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
print(f"\\nMerged sorted lists: {merge_k_sorted(lists)}")

# Example 5: Heap Sort
def heap_sort(arr):
    """Sort array using heap - O(n log n)"""
    heap = MinHeap()
    
    # Build heap
    for num in arr:
        heap.insert(num)
    
    # Extract elements in sorted order
    sorted_arr = []
    while not heap.is_empty():
        sorted_arr.append(heap.extract_min())
    
    return sorted_arr

arr = [12, 11, 13, 5, 6, 7]
print(f"\\nHeap sorted: {heap_sort(arr)}")`,
    use_cases: [
      "Priority queue implementation",
      "Heap sort algorithm",
      "Finding K largest/smallest elements",
      "Median maintenance in streaming data",
      "Graph algorithms (Dijkstra's, Prim's)",
      "Job scheduling in operating systems",
      "Event-driven simulation systems",
      "Merge K sorted lists/arrays"
    ],
    pros: [
      "O(1) access to min/max element",
      "O(log n) insertion and deletion",
      "Space efficient - uses array",
      "Perfect for priority queues",
      "Better than sorted array for frequent insertions"
    ],
    cons: [
      "No O(1) search for arbitrary elements",
      "Not suitable for searching specific values",
      "Only root element is easily accessible",
      "Building heap from array takes O(n log n)",
      "More complex than simple array or list"
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{example.title}</h1>
          <Badge>{example.difficulty.charAt(0).toUpperCase() + example.difficulty.slice(1)}</Badge>
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
            Heap Implementation
          </CardTitle>
          <CardDescription>Complete Min Heap with practical examples</CardDescription>
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
          <CardDescription>Where heaps are essential</CardDescription>
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
