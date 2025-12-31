'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, Code2, CheckCircle2, XCircle } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function LinearSearchPage() {
  const algorithm = {
    name: "Linear Search",
    description: "Simple search algorithm that checks every element sequentially until target is found",
    difficulty: "beginner",
    explanation: `Linear Search (or Sequential Search) is the simplest search algorithm. It sequentially checks each element of the list until a match is found or the whole list has been searched.

**How It Works:**

1. **Start at Beginning**: Begin with the first element
2. **Compare**: Check if current element matches target
3. **Found**: If match, return index
4. **Continue**: If not, move to next element
5. **Repeat**: Until found or end of list reached

**Key Characteristics:**
- **Simplest Algorithm**: Easy to understand and implement
- **Works on Unsorted Data**: No preprocessing required
- **Linear Time**: Checks each element once
- **No Extra Space**: O(1) space complexity

**When to Use:**
- Small datasets (< 100 elements)
- Unsorted data
- When simplicity is priority
- When data changes frequently (no sorting overhead)
- Single search operations

**Optimization Tips:**
- Move-to-front heuristic for frequently accessed items
- Sentinel search to reduce comparisons
- Self-organizing lists for better average case`,
    timeBest: "O(1)",
    timeAverage: "O(n)",
    timeWorst: "O(n)",
    spaceComplexity: "O(1)",
    pythonCode: `# Linear Search Implementations

def linear_search(arr, target):
    """
    Basic linear search
    Time: O(n), Space: O(1)
    
    Returns: Index of target or -1 if not found
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example 1: Basic Usage
arr = [64, 34, 25, 12, 22, 11, 90]
target = 22
index = linear_search(arr, target)
print(f"Array: {arr}")
print(f"Target {target} found at index: {index}")

# Example 2: Find All Occurrences
def linear_search_all(arr, target):
    """
    Find all occurrences of target
    Time: O(n), Space: O(k) where k is number of matches
    """
    indices = []
    for i in range(len(arr)):
        if arr[i] == target:
            indices.append(i)
    return indices if indices else [-1]

arr = [5, 3, 8, 3, 9, 3, 2]
target = 3
indices = linear_search_all(arr, target)
print(f"\\nAll occurrences of {target}: {indices}")

# Example 3: Search with Custom Condition
def linear_search_condition(arr, condition):
    """
    Find first element satisfying condition
    Time: O(n)
    
    Args:
        arr: Array to search
        condition: Function that returns True for match
    """
    for i, element in enumerate(arr):
        if condition(element):
            return i, element
    return -1, None

# Find first even number
arr = [1, 3, 7, 8, 5]
index, value = linear_search_condition(arr, lambda x: x % 2 == 0)
print(f"\\nFirst even number: {value} at index {index}")

# Find first element > 10
arr = [5, 8, 12, 3, 15]
index, value = linear_search_condition(arr, lambda x: x > 10)
print(f"First element > 10: {value} at index {index}")

# Example 4: Sentinel Linear Search
def sentinel_linear_search(arr, target):
    """
    Optimized linear search using sentinel
    Reduces number of comparisons by eliminating bounds check
    """
    n = len(arr)
    if n == 0:
        return -1
    
    # Save last element and put target as sentinel
    last = arr[n - 1]
    arr[n - 1] = target
    
    i = 0
    while arr[i] != target:
        i += 1
    
    # Restore last element
    arr[n - 1] = last
    
    # Check if target was found or was sentinel
    if i < n - 1 or last == target:
        return i
    return -1

arr = [64, 34, 25, 12, 22, 11, 90]
target = 22
index = sentinel_linear_search(arr, target)
print(f"\\nSentinel search found {target} at index: {index}")

# Example 5: Recursive Linear Search
def linear_search_recursive(arr, target, index=0):
    """
    Recursive implementation of linear search
    Not practical, but demonstrates recursion
    """
    # Base case: reached end
    if index >= len(arr):
        return -1
    
    # Base case: found target
    if arr[index] == target:
        return index
    
    # Recursive case
    return linear_search_recursive(arr, target, index + 1)

arr = [64, 34, 25, 12, 22, 11, 90]
target = 12
index = linear_search_recursive(arr, target)
print(f"\\nRecursive search found {target} at index: {index}")

# Example 6: Search in 2D Array
def linear_search_2d(matrix, target):
    """
    Linear search in 2D array
    Time: O(m × n) where m and n are dimensions
    """
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j] == target:
                return (i, j)
    return (-1, -1)

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
target = 5
position = linear_search_2d(matrix, target)
print(f"\\n2D search found {target} at: {position}")

# Example 7: Move-to-Front Heuristic
class SelfOrganizingList:
    """
    Self-organizing list with move-to-front heuristic
    Frequently accessed items move to front
    """
    def __init__(self, arr):
        self.arr = arr.copy()
    
    def search(self, target):
        """
        Search with move-to-front optimization
        Better average case for non-uniform access patterns
        """
        for i, element in enumerate(self.arr):
            if element == target:
                # Move to front if not already there
                if i > 0:
                    self.arr.pop(i)
                    self.arr.insert(0, element)
                    print(f"  Moved {target} to front: {self.arr}")
                return 0 if i > 0 else i
        return -1

arr = [5, 3, 8, 2, 9]
sol = SelfOrganizingList(arr)
print(f"\\nSelf-organizing list: {sol.arr}")
print(f"Search 8: index {sol.search(8)}")
print(f"Search 8 again: index {sol.search(8)}")

# Example 8: Linear Search with Early Termination
def linear_search_sorted_early_exit(arr, target):
    """
    Linear search on sorted array with early termination
    Can stop when element > target
    """
    for i, element in enumerate(arr):
        if element == target:
            return i
        if element > target:
            # Since sorted, no point continuing
            return -1
    return -1

arr = [1, 3, 5, 7, 9, 11, 13]
target = 6
index = linear_search_sorted_early_exit(arr, target)
print(f"\\nSorted array search (early exit): {index}")

# Example 9: Search with Statistics
class LinearSearchStats:
    """Track search statistics"""
    def __init__(self):
        self.comparisons = 0
        self.searches = 0
    
    def search(self, arr, target):
        self.searches += 1
        self.comparisons = 0
        
        for i in range(len(arr)):
            self.comparisons += 1
            if arr[i] == target:
                return i
        return -1
    
    def get_stats(self):
        avg_comp = self.comparisons / self.searches if self.searches > 0 else 0
        return {
            'total_searches': self.searches,
            'last_comparisons': self.comparisons,
            'avg_comparisons': avg_comp
        }

stats = LinearSearchStats()
arr = [64, 34, 25, 12, 22, 11, 90]

stats.search(arr, 22)
stats.search(arr, 90)
stats.search(arr, 99)

print(f"\\nSearch statistics: {stats.get_stats()}")

# Example 10: Jump Linear Search (Hybrid)
def jump_linear_search(arr, target, jump_size=3):
    """
    Hybrid: Jump ahead, then linear search back
    Better than pure linear for larger arrays
    """
    n = len(arr)
    i = 0
    
    # Jump forward
    while i < n and arr[i] < target:
        i += jump_size
    
    # Linear search backwards
    start = max(0, i - jump_size)
    end = min(n, i + 1)
    
    for j in range(start, end):
        if arr[j] == target:
            return j
    
    return -1`,
    pros: [
      "Simple and easy to implement",
      "Works on unsorted data",
      "No preprocessing required",
      "O(1) space complexity",
      "Good for small datasets",
      "Works on any data structure with sequential access"
    ],
    cons: [
      "Slow for large datasets - O(n) time",
      "Inefficient compared to binary search on sorted data",
      "Not suitable for frequent searches",
      "No optimization possible for random data",
      "Poor performance on large arrays"
    ],
    useCases: [
      "Small datasets (< 100 elements)",
      "Unsorted or frequently changing data",
      "Single search operations",
      "Linked lists (where binary search isn't possible)",
      "When simplicity is more important than speed",
      "Searching for first occurrence with condition"
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
          <CardTitle>How Linear Search Works</CardTitle>
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
          <CardDescription>Complete linear search with variations and optimizations</CardDescription>
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
