'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, Code2, CheckCircle2, XCircle } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function BubbleSortPage() {
  const algorithm = {
    name: "Bubble Sort",
    description: "Simple sorting algorithm that repeatedly swaps adjacent elements if they're in wrong order",
    difficulty: "beginner",
    explanation: `Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they're in the wrong order.

**How It Works:**

1. **Compare Adjacent**: Compare each pair of adjacent elements
2. **Swap if Needed**: Swap them if they're in wrong order
3. **Repeat**: Continue until no more swaps are needed
4. **Bubble Up**: Largest elements "bubble" to the end

**Key Characteristics:**
- **Stable**: Maintains relative order of equal elements
- **In-Place**: Sorts within the original array (O(1) space)
- **Simple**: Easy to understand and implement
- **Adaptive**: Can be optimized for nearly sorted data

**Why "Bubble"?**
The algorithm gets its name because smaller elements gradually "bubble" to the beginning of the list (or larger elements bubble to the end), similar to air bubbles rising in water.

**Optimization:**
The algorithm can be optimized by:
- Stopping early if no swaps occur (already sorted)
- Reducing the comparison range after each pass
- Cocktail sort variant (bidirectional)

**When to Use:**
- Small datasets (< 100 elements)
- Nearly sorted data
- Educational purposes
- When simplicity is more important than efficiency`,
    timeBest: "O(n)",
    timeAverage: "O(n²)",
    timeWorst: "O(n²)",
    spaceComplexity: "O(1)",
    pythonCode: `# Bubble Sort Implementations

def bubble_sort(arr):
    """
    Basic bubble sort implementation
    Time: O(n²), Space: O(1)
    """
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            # Swap if element is greater than next
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    
    return arr

# Example 1: Basic Usage
arr = [64, 34, 25, 12, 22, 11, 90]
print(f"Original: {arr}")
bubble_sort(arr)
print(f"Sorted: {arr}")

# Example 2: Optimized Bubble Sort (with early exit)
def bubble_sort_optimized(arr):
    """
    Optimized bubble sort with early exit
    Best case: O(n) when array is already sorted
    """
    n = len(arr)
    
    for i in range(n):
        swapped = False
        
        # Last i elements are already sorted
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swaps occurred, array is sorted
        if not swapped:
            print(f"Early exit at pass {i + 1}")
            break
    
    return arr

arr = [1, 2, 3, 5, 4]  # Nearly sorted
print(f"\\nOptimized sort of {[1, 2, 3, 5, 4]}:")
bubble_sort_optimized(arr)
print(f"Result: {arr}")

# Example 3: Bubble Sort with Pass Visualization
def bubble_sort_verbose(arr):
    """
    Bubble sort with detailed pass information
    Shows how elements bubble to their positions
    """
    n = len(arr)
    print(f"Initial array: {arr}")
    
    for i in range(n):
        swapped = False
        print(f"\\nPass {i + 1}:")
        
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                print(f"  Swapped {arr[j + 1]} and {arr[j]}: {arr}")
        
        if not swapped:
            print(f"  No swaps - array is sorted!")
            break
        else:
            print(f"  After pass {i + 1}: {arr}")
    
    return arr

arr = [5, 1, 4, 2, 8]
print("\\nVerbose bubble sort:")
bubble_sort_verbose(arr)

# Example 4: Cocktail Shaker Sort (Bidirectional Bubble Sort)
def cocktail_sort(arr):
    """
    Cocktail shaker sort - bidirectional bubble sort
    Bubbles in both directions for better performance on certain inputs
    """
    n = len(arr)
    swapped = True
    start = 0
    end = n - 1
    
    while swapped:
        swapped = False
        
        # Forward pass (like bubble sort)
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        
        if not swapped:
            break
        
        swapped = False
        end -= 1
        
        # Backward pass
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        
        start += 1
    
    return arr

arr = [5, 1, 4, 2, 8, 0, 2]
print(f"\\nCocktail sort of {[5, 1, 4, 2, 8, 0, 2]}: {cocktail_sort(arr)}")

# Example 5: Recursive Bubble Sort
def bubble_sort_recursive(arr, n=None):
    """
    Recursive implementation of bubble sort
    Not practical, but shows algorithm structure
    """
    if n is None:
        n = len(arr)
    
    # Base case: array of size 1 is already sorted
    if n == 1:
        return arr
    
    # One pass of bubble sort
    # After this pass, largest element moves to end
    for i in range(n - 1):
        if arr[i] > arr[i + 1]:
            arr[i], arr[i + 1] = arr[i + 1], arr[i]
    
    # Recursively sort remaining array
    bubble_sort_recursive(arr, n - 1)
    
    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
print(f"\\nRecursive bubble sort: {bubble_sort_recursive(arr)}")

# Example 6: Bubble Sort with Custom Comparison
def bubble_sort_custom(arr, key=None, reverse=False):
    """
    Bubble sort with custom comparison function
    
    Args:
        arr: Array to sort
        key: Function to extract comparison key
        reverse: Sort in descending order
    """
    if key is None:
        key = lambda x: x
    
    n = len(arr)
    
    for i in range(n):
        swapped = False
        
        for j in range(0, n - i - 1):
            # Custom comparison
            if reverse:
                should_swap = key(arr[j]) < key(arr[j + 1])
            else:
                should_swap = key(arr[j]) > key(arr[j + 1])
            
            if should_swap:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        if not swapped:
            break
    
    return arr

# Sort by absolute value
arr = [-5, 3, -2, 8, -9, 1]
bubble_sort_custom(arr, key=abs)
print(f"\\nSorted by absolute value: {arr}")

# Sort strings by length
words = ["apple", "pie", "banana", "cat"]
bubble_sort_custom(words, key=len)
print(f"Sorted by length: {words}")

# Sort in descending order
arr = [64, 34, 25, 12, 22]
bubble_sort_custom(arr, reverse=True)
print(f"Descending order: {arr}")

# Example 7: Count Swaps
def bubble_sort_count_swaps(arr):
    """
    Count number of swaps needed to sort array
    Useful for measuring "sortedness"
    """
    n = len(arr)
    swap_count = 0
    
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swap_count += 1
    
    return arr, swap_count

arr = [4, 3, 2, 1]
sorted_arr, swaps = bubble_sort_count_swaps(arr)
print(f"\\nArray {[4, 3, 2, 1]} needed {swaps} swaps to sort")`,
    pros: [
      "Simple and easy to understand - great for learning",
      "In-place algorithm - O(1) space complexity",
      "Stable sort - preserves relative order",
      "Adaptive - O(n) best case for sorted data",
      "Can detect if array is already sorted",
      "No additional memory needed"
    ],
    cons: [
      "Very slow on large datasets - O(n²) complexity",
      "Not practical for production use",
      "Poor performance compared to advanced algorithms",
      "Many unnecessary comparisons even when sorted",
      "Not cache-friendly due to many swaps"
    ],
    useCases: [
      "Educational purposes and teaching algorithms",
      "Small datasets (< 100 elements)",
      "Nearly sorted data",
      "When simplicity is paramount",
      "Embedded systems with severe memory constraints",
      "First pass to partially sort before using another algorithm"
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
          <CardTitle>How Bubble Sort Works</CardTitle>
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
          <CardDescription>Complete bubble sort with optimizations</CardDescription>
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
