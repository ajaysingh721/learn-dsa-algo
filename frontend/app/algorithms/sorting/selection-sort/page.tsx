'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, Code2, CheckCircle2, XCircle } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function SelectionSortPage() {
  const algorithm = {
    name: "Selection Sort",
    description: "Simple sorting algorithm that repeatedly finds minimum element and places it at beginning",
    difficulty: "beginner",
    explanation: `Selection Sort divides the array into sorted and unsorted regions. It repeatedly selects the smallest (or largest) element from the unsorted region and moves it to the end of the sorted region.

**How It Works:**

1. **Find Minimum**: Find the minimum element in unsorted portion
2. **Swap**: Swap it with the first unsorted element
3. **Expand Sorted**: Move boundary between sorted and unsorted
4. **Repeat**: Until entire array is sorted

**Key Characteristics:**
- **Not Stable**: May change relative order of equal elements
- **In-Place**: Sorts within original array (O(1) space)
- **Not Adaptive**: Always O(n²) regardless of input
- **Minimal Swaps**: Makes at most n-1 swaps

**Visual Example:**
```
[64, 25, 12, 22, 11]
 ↓ min=11
[11 | 25, 12, 22, 64]
     ↓ min=12
[11, 12 | 25, 22, 64]
         ↓ min=22
[11, 12, 22 | 25, 64]
             ↓ min=25
[11, 12, 22, 25 | 64]
```

**When to Use:**
- When minimizing number of swaps is important
- Small datasets
- When memory writes are expensive
- Simple implementation needed`,
    timeBest: "O(n²)",
    timeAverage: "O(n²)",
    timeWorst: "O(n²)",
    spaceComplexity: "O(1)",
    pythonCode: `# Selection Sort Implementations

def selection_sort(arr):
    """
    Basic selection sort
    Time: O(n²), Space: O(1)
    """
    n = len(arr)
    
    for i in range(n):
        # Find minimum in unsorted portion
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap minimum with first unsorted element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example 1: Basic Usage
arr = [64, 25, 12, 22, 11]
print(f"Original: {arr}")
selection_sort(arr)
print(f"Sorted: {arr}")

# Example 2: Selection Sort with Visualization
def selection_sort_verbose(arr):
    """Shows each step of selection sort"""
    n = len(arr)
    print(f"Initial: {arr}")
    
    for i in range(n):
        min_idx = i
        
        # Find minimum
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Show swap
        if min_idx != i:
            print(f"\\nStep {i + 1}: Swap {arr[i]} with {arr[min_idx]}")
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            print(f"  Result: {arr}")
    
    return arr

arr = [64, 25, 12, 22, 11]
print("\\nVerbose selection sort:")
selection_sort_verbose(arr)

# Example 3: Double-Ended Selection Sort
def selection_sort_double(arr):
    """
    Optimized: Find both min and max in each pass
    Reduces iterations by half
    """
    left = 0
    right = len(arr) - 1
    
    while left < right:
        min_idx = left
        max_idx = right
        
        # Find both min and max
        for i in range(left, right + 1):
            if arr[i] < arr[min_idx]:
                min_idx = i
            if arr[i] > arr[max_idx]:
                max_idx = i
        
        # Swap minimum to left
        arr[left], arr[min_idx] = arr[min_idx], arr[left]
        
        # If max was at left, it's now at min_idx
        if max_idx == left:
            max_idx = min_idx
        
        # Swap maximum to right
        arr[right], arr[max_idx] = arr[max_idx], arr[right]
        
        left += 1
        right -= 1
    
    return arr

arr = [64, 25, 12, 22, 11, 90, 33]
print(f"\\nDouble-ended sort: {selection_sort_double(arr)}")

# Example 4: Stable Selection Sort
def stable_selection_sort(arr):
    """
    Stable version using insertion instead of swap
    Maintains relative order of equal elements
    """
    n = len(arr)
    
    for i in range(n):
        min_idx = i
        
        # Find minimum
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Instead of swapping, insert at position
        min_val = arr[min_idx]
        while min_idx > i:
            arr[min_idx] = arr[min_idx - 1]
            min_idx -= 1
        arr[i] = min_val
    
    return arr

# Example 5: Recursive Selection Sort
def selection_sort_recursive(arr, start=0):
    """Recursive implementation"""
    if start >= len(arr) - 1:
        return arr
    
    # Find minimum in remaining array
    min_idx = start
    for i in range(start + 1, len(arr)):
        if arr[i] < arr[min_idx]:
            min_idx = i
    
    # Swap
    arr[start], arr[min_idx] = arr[min_idx], arr[start]
    
    # Recurse for remaining array
    return selection_sort_recursive(arr, start + 1)

arr = [64, 25, 12, 22, 11]
print(f"\\nRecursive: {selection_sort_recursive(arr)}")

# Example 6: Count Swaps
def selection_sort_count_swaps(arr):
    """Count number of swaps performed"""
    n = len(arr)
    swap_count = 0
    
    for i in range(n):
        min_idx = i
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            swap_count += 1
    
    return arr, swap_count

arr = [64, 25, 12, 22, 11]
sorted_arr, swaps = selection_sort_count_swaps(arr)
print(f"\\nSwaps needed: {swaps} (max possible: {len(arr) - 1})")

# Example 7: Find K Smallest Elements
def find_k_smallest(arr, k):
    """
    Use selection sort idea to find k smallest elements
    Time: O(n × k) instead of full O(n²) sort
    """
    n = len(arr)
    result = []
    
    for i in range(min(k, n)):
        min_idx = i
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        result.append(arr[i])
    
    return result

arr = [64, 25, 12, 22, 11, 90, 33, 5]
k = 3
print(f"\\n{k} smallest in {[64, 25, 12, 22, 11, 90, 33, 5]}: {find_k_smallest(arr, k)}")

# Example 8: Selection Sort with Custom Comparison
def selection_sort_custom(arr, key=None, reverse=False):
    """
    Selection sort with custom comparison function
    
    Args:
        arr: Array to sort
        key: Function to extract comparison key
        reverse: Sort in descending order
    """
    if key is None:
        key = lambda x: x
    
    n = len(arr)
    
    for i in range(n):
        target_idx = i
        
        for j in range(i + 1, n):
            if reverse:
                should_select = key(arr[j]) > key(arr[target_idx])
            else:
                should_select = key(arr[j]) < key(arr[target_idx])
            
            if should_select:
                target_idx = j
        
        arr[i], arr[target_idx] = arr[target_idx], arr[i]
    
    return arr

# Sort by absolute value
arr = [-5, 3, -2, 8, -9, 1]
selection_sort_custom(arr, key=abs)
print(f"\\nSorted by absolute value: {arr}")

# Sort strings by length
words = ["apple", "pie", "banana", "cat"]
selection_sort_custom(words, key=len)
print(f"Sorted by length: {words}")

# Sort in descending order
arr = [64, 25, 12, 22, 11]
selection_sort_custom(arr, reverse=True)
print(f"Descending order: {arr}")

# Example 9: Selection Sort with Early Termination
def selection_sort_optimized(arr):
    """
    Can terminate early if sorted portion grows
    Not much benefit but shows optimization attempt
    """
    n = len(arr)
    
    for i in range(n):
        min_idx = i
        is_sorted = True
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
                is_sorted = False
        
        if is_sorted and i > 0:
            # Rest is already sorted
            break
        
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example 10: Bingo Sort (optimized selection sort)
def bingo_sort(arr):
    """
    Variation that handles duplicates efficiently
    Groups equal elements together
    """
    n = len(arr)
    if n == 0:
        return arr
    
    # Find initial bingo (minimum)
    bingo = min(arr)
    next_bingo = max(arr)
    largest = max(arr)
    next_pos = 0
    
    while bingo < next_bingo:
        # Move all elements equal to bingo to beginning
        start_pos = next_pos
        
        for i in range(start_pos, n):
            if arr[i] == bingo:
                arr[i], arr[next_pos] = arr[next_pos], arr[i]
                next_pos += 1
            elif arr[i] < next_bingo:
                next_bingo = arr[i]
        
        bingo = next_bingo
        next_bingo = largest
    
    return arr

arr = [5, 2, 8, 2, 9, 1, 5, 5]
print(f"\\nBingo sort (handles duplicates): {bingo_sort(arr)}")`,
    pros: [
      "Minimal number of swaps - at most n-1",
      "Simple and easy to understand",
      "In-place - O(1) space complexity",
      "Good when write operations are expensive",
      "Performance doesn't degrade with duplicate elements",
      "Works well for small arrays"
    ],
    cons: [
      "Always O(n²) - not adaptive to input",
      "Not stable - may reorder equal elements",
      "Slower than insertion sort on nearly sorted data",
      "Poor performance on large datasets",
      "More comparisons than insertion sort in best case"
    ],
    useCases: [
      "When memory writes are expensive",
      "Small datasets where simplicity matters",
      "When minimizing number of swaps is critical",
      "Finding k smallest/largest elements",
      "Flash memory where writes are limited",
      "Educational purposes"
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
            <code className="text-lg font-mono text-red-600 dark:text-red-400">{algorithm.timeBest}</code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Case</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-lg font-mono text-red-600 dark:text-red-400">{algorithm.timeAverage}</code>
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
          <CardTitle>How Selection Sort Works</CardTitle>
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
          <CardDescription>Complete selection sort with variations</CardDescription>
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
