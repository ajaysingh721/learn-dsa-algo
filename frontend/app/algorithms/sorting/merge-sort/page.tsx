'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, Code2, CheckCircle2, XCircle } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function MergeSortPage() {
  const algorithm = {
    name: "Merge Sort",
    description: "Efficient, stable, divide-and-conquer sorting algorithm with guaranteed O(n log n) performance",
    difficulty: "intermediate",
    explanation: `Merge Sort is one of the most efficient general-purpose sorting algorithms. It uses the divide-and-conquer paradigm to recursively break down the array into smaller subarrays, sort them, and then merge them back together.

**How It Works:**

1. **Divide**: Split the array into two halves
2. **Conquer**: Recursively sort each half
3. **Combine**: Merge the two sorted halves into a single sorted array

**Key Characteristics:**
- **Stable**: Maintains relative order of equal elements
- **Not In-Place**: Requires O(n) extra space
- **Predictable**: Always O(n log n) regardless of input
- **Parallelizable**: Subproblems are independent

**Merge Process:**
The merge operation is the heart of Merge Sort. It takes two sorted arrays and combines them into one sorted array by repeatedly comparing the smallest unprocessed elements from each array.

**When to Use:**
- When you need guaranteed O(n log n) performance
- When stability is important
- For sorting linked lists (no extra space needed)
- When parallelization is beneficial
- For external sorting (sorting large files)`,
    timeBest: "O(n log n)",
    timeAverage: "O(n log n)",
    timeWorst: "O(n log n)",
    spaceComplexity: "O(n)",
    pythonCode: `# Merge Sort Implementation

def merge_sort(arr):
    """
    Sorts array using merge sort algorithm
    Time: O(n log n), Space: O(n)
    """
    if len(arr) <= 1:
        return arr
    
    # Divide: Split array into two halves
    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]
    
    # Conquer: Recursively sort both halves
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)
    
    # Combine: Merge sorted halves
    return merge(left_sorted, right_sorted)

def merge(left, right):
    """
    Merge two sorted arrays into one sorted array
    Time: O(n), Space: O(n)
    """
    result = []
    i = j = 0
    
    # Compare elements from left and right arrays
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

# Example 1: Basic Usage
arr = [38, 27, 43, 3, 9, 82, 10]
print(f"Original: {arr}")
sorted_arr = merge_sort(arr)
print(f"Sorted: {sorted_arr}")

# Example 2: In-Place Merge Sort (optimized for space)
def merge_sort_inplace(arr, left=0, right=None):
    """
    In-place merge sort using array slicing
    Still uses O(n) space for merge operation
    """
    if right is None:
        right = len(arr) - 1
    
    if left < right:
        mid = (left + right) // 2
        
        # Recursively sort both halves
        merge_sort_inplace(arr, left, mid)
        merge_sort_inplace(arr, mid + 1, right)
        
        # Merge the sorted halves
        merge_inplace(arr, left, mid, right)

def merge_inplace(arr, left, mid, right):
    """Merge two sorted subarrays in place"""
    # Create temp arrays
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    
    i = j = 0
    k = left
    
    # Merge temp arrays back
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    # Copy remaining elements
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1

# Example 3: Counting Inversions (classic application)
def merge_sort_count_inversions(arr):
    """
    Count number of inversions while sorting
    Inversion: pair (i, j) where i < j but arr[i] > arr[j]
    """
    if len(arr) <= 1:
        return arr, 0
    
    mid = len(arr) // 2
    left, left_inv = merge_sort_count_inversions(arr[:mid])
    right, right_inv = merge_sort_count_inversions(arr[mid:])
    merged, split_inv = merge_and_count(left, right)
    
    return merged, left_inv + right_inv + split_inv

def merge_and_count(left, right):
    """Merge and count split inversions"""
    result = []
    inversions = 0
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            # All remaining elements in left are inversions
            inversions += len(left) - i
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result, inversions

# Test inversion counting
arr = [5, 3, 2, 4, 1]
sorted_arr, inv_count = merge_sort_count_inversions(arr)
print(f"\\nArray: {[5, 3, 2, 4, 1]}")
print(f"Sorted: {sorted_arr}")
print(f"Inversions: {inv_count}")

# Example 4: Merge K Sorted Arrays
import heapq

def merge_k_sorted_arrays(arrays):
    """
    Merge k sorted arrays using min heap
    Time: O(n log k), Space: O(k)
    where n is total elements, k is number of arrays
    """
    heap = []
    result = []
    
    # Initialize heap with first element from each array
    for i, arr in enumerate(arrays):
        if arr:
            heapq.heappush(heap, (arr[0], i, 0))
    
    while heap:
        val, arr_idx, elem_idx = heapq.heappop(heap)
        result.append(val)
        
        # Add next element from same array
        if elem_idx + 1 < len(arrays[arr_idx]):
            next_val = arrays[arr_idx][elem_idx + 1]
            heapq.heappush(heap, (next_val, arr_idx, elem_idx + 1))
    
    return result

# Test merge k arrays
arrays = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
merged = merge_k_sorted_arrays(arrays)
print(f"\\nMerged {len(arrays)} arrays: {merged}")

# Example 5: Natural Merge Sort (adaptive)
def natural_merge_sort(arr):
    """
    Adaptive merge sort that takes advantage of existing runs
    Better performance on partially sorted data
    """
    n = len(arr)
    if n <= 1:
        return arr
    
    # Find natural runs (already sorted subsequences)
    runs = []
    i = 0
    while i < n:
        run_start = i
        if i == n - 1:
            runs.append((i, i + 1))
            break
        
        # Find end of ascending or descending run
        if arr[i] <= arr[i + 1]:
            # Ascending run
            while i < n - 1 and arr[i] <= arr[i + 1]:
                i += 1
            runs.append((run_start, i + 1))
        else:
            # Descending run - reverse it
            while i < n - 1 and arr[i] > arr[i + 1]:
                i += 1
            runs.append((run_start, i + 1))
            arr[run_start:i + 1] = reversed(arr[run_start:i + 1])
        
        i += 1
    
    # Merge runs
    while len(runs) > 1:
        new_runs = []
        for i in range(0, len(runs), 2):
            if i + 1 < len(runs):
                start1, end1 = runs[i]
                start2, end2 = runs[i + 1]
                merged = merge(arr[start1:end1], arr[start2:end2])
                arr[start1:end2] = merged
                new_runs.append((start1, end2))
            else:
                new_runs.append(runs[i])
        runs = new_runs
    
    return arr`,
    pros: [
      "Guaranteed O(n log n) time complexity - predictable performance",
      "Stable sort - maintains relative order of equal elements",
      "Works well with linked lists without extra space",
      "Parallelizable - subproblems are independent",
      "Good for external sorting of large datasets",
      "Natural variant adapts to partially sorted data"
    ],
    cons: [
      "Requires O(n) extra space for arrays",
      "Not in-place - higher memory usage than quicksort",
      "Slower in practice than quicksort for small arrays",
      "Recursive implementation may cause stack overflow",
      "More complex to implement than simpler sorts"
    ],
    useCases: [
      "External sorting (sorting large files on disk)",
      "Sorting linked lists efficiently",
      "When stable sort is required",
      "When guaranteed O(n log n) is needed",
      "Parallel processing and distributed systems",
      "Counting inversions in arrays"
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{algorithm.name}</h1>
          <Badge variant={algorithm.difficulty === 'intermediate' ? 'default' : 'secondary'}>
            {algorithm.difficulty.charAt(0).toUpperCase() + algorithm.difficulty.slice(1)}
          </Badge>
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
          <CardTitle>How Merge Sort Works</CardTitle>
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
          <CardDescription>Complete merge sort with variations</CardDescription>
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
