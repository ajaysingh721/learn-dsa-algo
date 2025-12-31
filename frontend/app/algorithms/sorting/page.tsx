'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, Code2, Lightbulb } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function QuickSortPage() {
  const algorithm = {
    name: "Quick Sort",
    description: "Efficient divide-and-conquer sorting algorithm using pivot partitioning",
    difficulty: "intermediate",
    explanation: `Quick Sort is one of the most efficient sorting algorithms and is widely used in practice. It uses the divide-and-conquer strategy to sort arrays.

**Algorithm Steps:**
1. **Choose a Pivot**: Select an element from the array as the pivot (commonly the last element)
2. **Partition**: Rearrange the array so that:
   - Elements smaller than pivot are on the left
   - Elements greater than pivot are on the right
   - Pivot is in its final sorted position
3. **Recursively Sort**: Apply the same process to the left and right subarrays

**Why It's Fast:**
- In-place sorting (doesn't require extra space)
- Cache-efficient due to localized access patterns
- Average case is very good with proper pivot selection`,
    timeBest: "O(n log n)",
    timeAverage: "O(n log n)",
    timeWorst: "O(n²)",
    spaceComplexity: "O(log n)",
    pythonCode: `def quick_sort(arr, low=0, high=None):
    """
    Sort array using Quick Sort algorithm
    
    Args:
        arr: List to be sorted
        low: Starting index (default 0)
        high: Ending index (default len(arr)-1)
    
    Returns:
        Sorted array (in-place)
    """
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition the array and get pivot index
        pivot_index = partition(arr, low, high)
        
        # Recursively sort left and right subarrays
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    """
    Partition array around pivot element
    
    Args:
        arr: Array to partition
        low: Starting index
        high: Ending index (pivot element)
    
    Returns:
        Final position of pivot element
    """
    # Choose the rightmost element as pivot
    pivot = arr[high]
    
    # Index of smaller element
    i = low - 1
    
    # Move all elements smaller than pivot to left
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example Usage
if __name__ == "__main__":
    # Test case 1: Random array
    arr1 = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original array: {arr1}")
    quick_sort(arr1)
    print(f"Sorted array:   {arr1}")
    
    # Test case 2: Already sorted
    arr2 = [1, 2, 3, 4, 5]
    quick_sort(arr2)
    print(f"Already sorted: {arr2}")
    
    # Test case 3: Reverse sorted
    arr3 = [5, 4, 3, 2, 1]
    quick_sort(arr3)
    print(f"Reverse sorted: {arr3}")
    
    # Test case 4: Duplicates
    arr4 = [3, 7, 8, 5, 2, 1, 9, 5, 4]
    quick_sort(arr4)
    print(f"With duplicates: {arr4}")`,
    javascriptCode: `/**
 * Sort array using Quick Sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number[]} Sorted array
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // Partition array and get pivot index
        const pivotIndex = partition(arr, low, high);
        
        // Recursively sort left and right subarrays
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

/**
 * Partition array around pivot element
 * @param {number[]} arr - Array to partition
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number} Final position of pivot
 */
function partition(arr, low, high) {
    // Choose rightmost element as pivot
    const pivot = arr[high];
    
    // Index of smaller element
    let i = low - 1;
    
    // Move all elements smaller than pivot to left
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Example Usage
const arr1 = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", arr1);
quickSort(arr1);
console.log("Sorted array:  ", arr1);

// Test with different cases
const arr2 = [5, 4, 3, 2, 1];
quickSort(arr2);
console.log("Reverse sorted:", arr2);`,
    useCases: [
      "General-purpose sorting in production systems",
      "Operating system task scheduling",
      "Database query optimization and indexing",
      "Numerical computations requiring sorted data",
      "Implementing language standard libraries (e.g., Java's Arrays.sort)",
      "Sorting large datasets in memory"
    ],
    optimizations: [
      "Use median-of-three for pivot selection to avoid worst case",
      "Switch to insertion sort for small subarrays (< 10 elements)",
      "Use three-way partitioning for arrays with many duplicates",
      "Implement tail recursion optimization to reduce stack space"
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{algorithm.name}</h1>
          <Badge variant={algorithm.difficulty === 'intermediate' ? 'default' : 'secondary'}>
            {algorithm.difficulty.charAt(0).toUpperCase() + algorithm.difficulty.slice(1)}
          </Badge>
        </div>
        <p className="text-xl text-muted-foreground">{algorithm.description}</p>
      </div>

      {/* Complexity Cards */}
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

      {/* Explanation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
          {algorithm.explanation.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 whitespace-pre-wrap">{paragraph}</p>
          ))}
        </CardContent>
      </Card>

      {/* Python Implementation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Python Implementation
          </CardTitle>
          <CardDescription>Complete implementation with examples</CardDescription>
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
            {algorithm.pythonCode}
          </SyntaxHighlighter>
        </CardContent>
      </Card>

      {/* JavaScript Implementation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            JavaScript Implementation
          </CardTitle>
          <CardDescription>ES6+ modern JavaScript version</CardDescription>
        </CardHeader>
        <CardContent>
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
            }}
          >
            {algorithm.javascriptCode}
          </SyntaxHighlighter>
        </CardContent>
      </Card>

      {/* Use Cases & Optimizations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Real-World Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {algorithm.useCases.map((useCase, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="text-primary mt-1">▹</span>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Optimization Techniques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {algorithm.optimizations.map((opt, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-1">★</span>
                  <span>{opt}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
