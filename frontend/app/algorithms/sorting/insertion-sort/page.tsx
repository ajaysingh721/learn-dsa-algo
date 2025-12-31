'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, Code2, CheckCircle2, XCircle } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function InsertionSortPage() {
  const algorithm = {
    name: "Insertion Sort",
    description: "Simple sorting algorithm that builds final sorted array one item at a time",
    difficulty: "beginner",
    explanation: `Insertion Sort works similar to how you sort playing cards in your hands. You take one card at a time and insert it into its correct position among the already sorted cards.

**How It Works:**

1. **Start with Second Element**: First element is considered sorted
2. **Pick Next**: Select the next unsorted element
3. **Find Position**: Compare with sorted elements to find correct position
4. **Shift and Insert**: Shift larger elements right, insert element

**Key Characteristics:**
- **Stable**: Maintains relative order of equal elements
- **In-Place**: Sorts within original array (O(1) space)
- **Adaptive**: Very efficient for nearly sorted data
- **Online**: Can sort data as it arrives

**Visual Example:**
```
[5, 2, 4, 6, 1, 3]
 ↓ sorted
[5 | 2, 4, 6, 1, 3]  → Insert 2
[2, 5 | 4, 6, 1, 3]  → Insert 4
[2, 4, 5 | 6, 1, 3]  → Insert 6
[2, 4, 5, 6 | 1, 3]  → Insert 1
[1, 2, 4, 5, 6 | 3]  → Insert 3
[1, 2, 3, 4, 5, 6]   → Done!
```

**When to Use:**
- Small datasets (< 50 elements)
- Nearly sorted data
- Online algorithms (sorting as data arrives)
- When simplicity and low overhead matter`,
    timeBest: "O(n)",
    timeAverage: "O(n²)",
    timeWorst: "O(n²)",
    spaceComplexity: "O(1)",
    pythonCode: `# Insertion Sort Implementations

def insertion_sort(arr):
    """
    Basic insertion sort implementation
    Time: O(n²) worst case, O(n) best case
    Space: O(1)
    """
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Insert key at correct position
        arr[j + 1] = key
    
    return arr

# Example 1: Basic Usage
arr = [12, 11, 13, 5, 6]
print(f"Original: {arr}")
insertion_sort(arr)
print(f"Sorted: {arr}")

# Example 2: Insertion Sort with Visualization
def insertion_sort_verbose(arr):
    """
    Insertion sort with step-by-step output
    Shows how each element is inserted
    """
    print(f"Initial: {arr}")
    
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        print(f"\\nInserting {key} from position {i}:")
        print(f"  Before: {arr}")
        
        # Shift elements
        shifts = 0
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
            shifts += 1
        
        arr[j + 1] = key
        print(f"  After {shifts} shifts: {arr}")
    
    return arr

arr = [5, 2, 4, 6, 1, 3]
print("\\nVerbose insertion sort:")
insertion_sort_verbose(arr)

# Example 3: Binary Insertion Sort
def binary_insertion_sort(arr):
    """
    Uses binary search to find insertion position
    Reduces comparisons but not shifts
    Time: O(n²) still, but fewer comparisons
    """
    for i in range(1, len(arr)):
        key = arr[i]
        
        # Find position using binary search
        pos = binary_search_position(arr, key, 0, i)
        
        # Shift elements and insert
        arr = arr[:pos] + [key] + arr[pos:i] + arr[i+1:]
    
    return arr

def binary_search_position(arr, key, start, end):
    """Find correct position for key in sorted portion"""
    while start < end:
        mid = (start + end) // 2
        if arr[mid] < key:
            start = mid + 1
        else:
            end = mid
    return start

arr = [12, 11, 13, 5, 6]
print(f"\\nBinary insertion sort: {binary_insertion_sort(arr)}")

# Example 4: Recursive Insertion Sort
def insertion_sort_recursive(arr, n=None):
    """
    Recursive implementation of insertion sort
    Not practical, but shows algorithm structure
    """
    if n is None:
        n = len(arr)
    
    # Base case
    if n <= 1:
        return arr
    
    # Sort first n-1 elements
    insertion_sort_recursive(arr, n - 1)
    
    # Insert nth element
    key = arr[n - 1]
    j = n - 2
    
    while j >= 0 and arr[j] > key:
        arr[j + 1] = arr[j]
        j -= 1
    
    arr[j + 1] = key
    
    return arr

arr = [12, 11, 13, 5, 6]
print(f"\\nRecursive insertion sort: {insertion_sort_recursive(arr)}")

# Example 5: Insertion Sort for Linked Lists
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def insertion_sort_linked_list(head):
    """
    Insertion sort for linked lists
    More efficient than arrays (no shifting needed)
    """
    if not head or not head.next:
        return head
    
    sorted_head = None
    current = head
    
    while current:
        next_node = current.next
        sorted_head = sorted_insert(sorted_head, current)
        current = next_node
    
    return sorted_head

def sorted_insert(head, new_node):
    """Insert node into sorted linked list"""
    if not head or head.data >= new_node.data:
        new_node.next = head
        return new_node
    
    current = head
    while current.next and current.next.data < new_node.data:
        current = current.next
    
    new_node.next = current.next
    current.next = new_node
    
    return head

def print_list(head):
    """Print linked list"""
    result = []
    current = head
    while current:
        result.append(current.data)
        current = current.next
    return result

# Create linked list: 5 -> 2 -> 4 -> 6 -> 1
head = Node(5)
head.next = Node(2)
head.next.next = Node(4)
head.next.next.next = Node(6)
head.next.next.next.next = Node(1)

print(f"\\nLinked list before: {print_list(head)}")
sorted_head = insertion_sort_linked_list(head)
print(f"Linked list after: {print_list(sorted_head)}")

# Example 6: Insertion Sort with Gap (Shell Sort Preparation)
def insertion_sort_gap(arr, start, gap):
    """
    Insertion sort with gap
    Used as building block for Shell sort
    """
    for i in range(start + gap, len(arr), gap):
        key = arr[i]
        j = i - gap
        
        while j >= start and arr[j] > key:
            arr[j + gap] = arr[j]
            j -= gap
        
        arr[j + gap] = key
    
    return arr

# Example 7: Count Comparisons and Shifts
def insertion_sort_stats(arr):
    """
    Count comparisons and shifts during sorting
    Useful for analyzing algorithm performance
    """
    comparisons = 0
    shifts = 0
    
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        while j >= 0:
            comparisons += 1
            if arr[j] > key:
                arr[j + 1] = arr[j]
                shifts += 1
                j -= 1
            else:
                break
        
        arr[j + 1] = key
    
    return arr, comparisons, shifts

arr = [5, 2, 4, 6, 1, 3]
sorted_arr, comps, shifts = insertion_sort_stats(arr)
print(f"\\nArray: {[5, 2, 4, 6, 1, 3]}")
print(f"Sorted: {sorted_arr}")
print(f"Comparisons: {comps}, Shifts: {shifts}")

# Example 8: Insertion Sort with Custom Comparison
def insertion_sort_custom(arr, key=None, reverse=False):
    """
    Insertion sort with custom comparison
    
    Args:
        arr: Array to sort
        key: Function to extract comparison key
        reverse: Sort in descending order
    """
    if key is None:
        key = lambda x: x
    
    for i in range(1, len(arr)):
        current = arr[i]
        current_key = key(current)
        j = i - 1
        
        while j >= 0:
            if reverse:
                should_move = key(arr[j]) < current_key
            else:
                should_move = key(arr[j]) > current_key
            
            if should_move:
                arr[j + 1] = arr[j]
                j -= 1
            else:
                break
        
        arr[j + 1] = current
    
    return arr

# Sort by absolute value
arr = [-5, 3, -2, 8, -9, 1]
insertion_sort_custom(arr, key=abs)
print(f"\\nSorted by absolute value: {arr}")

# Sort strings by length
words = ["apple", "pie", "banana", "cat"]
insertion_sort_custom(words, key=len)
print(f"Sorted by length: {words}")

# Sort tuples by second element
pairs = [(1, 3), (2, 1), (3, 2)]
insertion_sort_custom(pairs, key=lambda x: x[1])
print(f"Sorted pairs: {pairs}")`,
    pros: [
      "Simple and easy to implement",
      "Efficient for small datasets",
      "Adaptive - O(n) for nearly sorted data",
      "Stable - preserves relative order",
      "In-place - O(1) space complexity",
      "Online - can sort data as it arrives"
    ],
    cons: [
      "Inefficient for large datasets - O(n²)",
      "More writes than selection sort",
      "Not suitable for large arrays",
      "Poor performance on reverse-sorted data"
    ],
    useCases: [
      "Small datasets (< 50 elements)",
      "Nearly sorted data",
      "Online algorithms (data arriving in real-time)",
      "Hybrid sorting (used in TimSort for small subarrays)",
      "Sorting linked lists",
      "When stability is required with minimal space"
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{algorithm.name}</h1>
          <Badge variant="secondary">{algorithm.difficulty.charAt(0).toUpperCase() + algorithm.difficulty.slice(1)}</Badge>
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
          <CardTitle>How Insertion Sort Works</CardTitle>
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
          <CardDescription>Complete insertion sort with variations</CardDescription>
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
