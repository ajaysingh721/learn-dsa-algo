'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, Code2, CheckCircle2, XCircle } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function HeapSortPage() {
  const algorithm = {
    name: "Heap Sort",
    description: "In-place sorting algorithm using binary heap data structure with O(n log n) complexity",
    difficulty: "intermediate",
    explanation: `Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It combines the space efficiency of insertion sort with the time efficiency of merge sort.

**How It Works:**

1. **Build Max Heap**: Convert array into a max heap where parent ≥ children
2. **Extract Max**: Repeatedly remove the largest element (root) and place it at the end
3. **Heapify**: Restore heap property after each extraction

**Key Characteristics:**
- **In-Place**: Sorts within the original array (O(1) extra space)
- **Not Stable**: May change relative order of equal elements
- **Predictable**: Always O(n log n) regardless of input
- **No Extra Memory**: Unlike merge sort

**Heap Property:**
- **Max Heap**: Parent ≥ all children
- **Complete Binary Tree**: All levels filled except possibly the last

**When to Use:**
- When O(n log n) guarantee is needed with O(1) space
- For implementing priority queues
- When stability is not required
- For finding k largest/smallest elements`,
    timeBest: "O(n log n)",
    timeAverage: "O(n log n)",
    timeWorst: "O(n log n)",
    spaceComplexity: "O(1)",
    pythonCode: `# Heap Sort Implementation

def heap_sort(arr):
    """
    Sorts array using heap sort algorithm
    Time: O(n log n), Space: O(1)
    """
    n = len(arr)
    
    # Build max heap - O(n)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap one by one - O(n log n)
    for i in range(n - 1, 0, -1):
        # Move current root (max) to end
        arr[0], arr[i] = arr[i], arr[0]
        
        # Heapify the reduced heap
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    """
    Maintain max heap property for subtree rooted at index i
    Time: O(log n)
    
    Args:
        arr: Array to heapify
        n: Size of heap
        i: Root index of subtree
    """
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    # Check if left child is larger than root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # Check if right child is larger than current largest
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # If largest is not root, swap and continue heapifying
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Example 1: Basic Usage
arr = [12, 11, 13, 5, 6, 7]
print(f"Original: {arr}")
heap_sort(arr)
print(f"Sorted: {arr}")

# Example 2: Min Heap Sort (ascending order using min heap)
def min_heapify(arr, n, i):
    """Maintain min heap property"""
    smallest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] < arr[smallest]:
        smallest = left
    
    if right < n and arr[right] < arr[smallest]:
        smallest = right
    
    if smallest != i:
        arr[i], arr[smallest] = arr[smallest], arr[i]
        min_heapify(arr, n, smallest)

def heap_sort_descending(arr):
    """Sort in descending order using min heap"""
    n = len(arr)
    
    # Build min heap
    for i in range(n // 2 - 1, -1, -1):
        min_heapify(arr, n, i)
    
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        min_heapify(arr, i, 0)
    
    return arr

# Example 3: Find K Largest Elements
def find_k_largest(arr, k):
    """
    Find k largest elements using heap
    Time: O(n log n), Space: O(1)
    """
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    result = []
    temp = arr.copy()  # Preserve original
    
    # Extract k largest elements
    for i in range(min(k, n)):
        result.append(temp[0])
        temp[0] = temp[n - 1 - i]
        heapify(temp, n - i - 1, 0)
    
    return result

arr = [3, 2, 1, 5, 6, 4]
k = 3
print(f"\\n{k} largest elements in {arr}: {find_k_largest(arr, k)}")

# Example 4: Iterative Heapify (avoiding recursion)
def heapify_iterative(arr, n, i):
    """
    Iterative version of heapify
    Better for large heaps (avoids stack overflow)
    """
    while True:
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n and arr[left] > arr[largest]:
            largest = left
        
        if right < n and arr[right] > arr[largest]:
            largest = right
        
        if largest == i:
            break
        
        arr[i], arr[largest] = arr[largest], arr[i]
        i = largest

def heap_sort_iterative(arr):
    """Heap sort using iterative heapify"""
    n = len(arr)
    
    for i in range(n // 2 - 1, -1, -1):
        heapify_iterative(arr, n, i)
    
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify_iterative(arr, i, 0)
    
    return arr

# Example 5: Heap Sort with Comparison Function
def heap_sort_custom(arr, key=None, reverse=False):
    """
    Heap sort with custom comparison function
    
    Args:
        arr: Array to sort
        key: Function to extract comparison key
        reverse: Sort in descending order
    """
    if key is None:
        key = lambda x: x
    
    def compare(i, j, n):
        if reverse:
            return key(arr[i]) < key(arr[j])
        return key(arr[i]) > key(arr[j])
    
    def custom_heapify(n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n and compare(left, largest, n):
            largest = left
        
        if right < n and compare(right, largest, n):
            largest = right
        
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            custom_heapify(n, largest)
    
    n = len(arr)
    
    # Build heap
    for i in range(n // 2 - 1, -1, -1):
        custom_heapify(n, i)
    
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        custom_heapify(i, 0)
    
    return arr

# Sort by absolute value
arr = [-5, 3, -2, 8, -9, 1]
heap_sort_custom(arr, key=abs)
print(f"\\nSorted by absolute value: {arr}")

# Sort strings by length
words = ["apple", "pie", "banana", "cat", "dog"]
heap_sort_custom(words, key=len)
print(f"Sorted by length: {words}")

# Example 6: Verify Heap Property
def is_max_heap(arr, i=0):
    """Check if array is a valid max heap"""
    n = len(arr)
    left = 2 * i + 1
    right = 2 * i + 2
    
    # Check left child
    if left < n:
        if arr[i] < arr[left]:
            return False
        if not is_max_heap(arr, left):
            return False
    
    # Check right child
    if right < n:
        if arr[i] < arr[right]:
            return False
        if not is_max_heap(arr, right):
            return False
    
    return True

arr = [9, 5, 6, 2, 3]
print(f"\\nIs {arr} a max heap? {is_max_heap(arr)}")`,
    pros: [
      "O(1) space complexity - sorts in place",
      "Guaranteed O(n log n) time - no worst case degradation",
      "No recursion depth issues - iterative version available",
      "Good for embedded systems with limited memory",
      "Naturally finds k largest/smallest elements",
      "Used in priority queue implementations"
    ],
    cons: [
      "Not stable - relative order not preserved",
      "Slower than quicksort in practice due to poor cache locality",
      "More complex to implement than simpler sorts",
      "Constant factors higher than quicksort",
      "Not adaptive - doesn't benefit from partial sorting"
    ],
    useCases: [
      "Systems with strict memory constraints",
      "Finding k largest/smallest elements",
      "Priority queue implementation",
      "When O(n log n) guarantee is needed without extra space",
      "Embedded systems and real-time applications",
      "Selection algorithms (median finding)"
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{algorithm.name}</h1>
          <Badge variant="default">{algorithm.difficulty.charAt(0).toUpperCase() + algorithm.difficulty.slice(1)}</Badge>
        </div>
        <p className="text-xl text-muted-foreground">{algorithm.description}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Best Case</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-lg font-mono text-green-600 dark:text-green-400">{algorithm.timeBest}</code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Case</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-lg font-mono text-blue-600 dark:text-blue-400">{algorithm.timeAverage}</code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Worst Case</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-lg font-mono text-red-600 dark:text-red-400">{algorithm.timeWorst}</code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Space</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-lg font-mono">{algorithm.spaceComplexity}</code>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How Heap Sort Works</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
          {algorithm.explanation.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 whitespace-pre-wrap">{paragraph}</p>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Implementation
          </CardTitle>
          <CardDescription>Complete heap sort with variations</CardDescription>
        </CardHeader>
        <CardContent>
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{ margin: 0, borderRadius: '0.5rem' }}
          >
            {algorithm.pythonCode}
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
              {algorithm.pros.map((pro, idx) => (
                <li key={idx} className="flex gap-2 items-start">
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
              {algorithm.cons.map((con, idx) => (
                <li key={idx} className="flex gap-2 items-start">
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
          <CardTitle>Common Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-3">
            {algorithm.useCases.map((useCase, idx) => (
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
