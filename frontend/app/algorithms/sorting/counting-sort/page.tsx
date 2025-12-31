'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, Code2, CheckCircle2, XCircle } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CountingSortPage() {
  const algorithm = {
    name: "Counting Sort",
    description: "Non-comparison based sorting algorithm for integers within a known range",
    difficulty: "intermediate",
    explanation: `Counting Sort is a non-comparison based sorting algorithm that works by counting the number of objects that have each distinct key value. It's extremely fast for integers within a small range.

**How It Works:**

1. **Find Range**: Determine min and max values
2. **Count Occurrences**: Count frequency of each value
3. **Cumulative Count**: Build cumulative count array
4. **Place Elements**: Place elements in sorted positions

**Key Characteristics:**
- **Linear Time**: O(n + k) where k is the range
- **Stable**: Maintains relative order
- **Not In-Place**: Requires O(n + k) extra space
- **Integer Only**: Works only with integer keys

**When to Use:**
- Integers within a small, known range
- When n >> k (many elements, small range)
- When stability is required
- As subroutine for radix sort

**Limitations:**
- Doesn't work with floating-point numbers
- Impractical when range is very large
- Requires extra space proportional to range`,
    timeBest: "O(n + k)",
    timeAverage: "O(n + k)",
    timeWorst: "O(n + k)",
    spaceComplexity: "O(n + k)",
    pythonCode: `# Counting Sort Implementations

def counting_sort(arr):
    """
    Basic counting sort for non-negative integers
    Time: O(n + k), Space: O(k) where k is max value
    """
    if not arr:
        return arr
    
    # Find range
    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1
    
    # Count occurrences
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1
    
    # Build sorted array
    result = []
    for i in range(range_size):
        result.extend([i + min_val] * count[i])
    
    return result

# Example 1: Basic Usage
arr = [4, 2, 2, 8, 3, 3, 1]
print(f"Original: {arr}")
sorted_arr = counting_sort(arr)
print(f"Sorted: {sorted_arr}")

# Example 2: Stable Counting Sort (preserves order)
def counting_sort_stable(arr):
    """
    Stable version that preserves relative order
    Important for sorting objects by key
    """
    if not arr:
        return arr
    
    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1
    
    # Count occurrences
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1
    
    # Cumulative count (position in output)
    for i in range(1, range_size):
        count[i] += count[i - 1]
    
    # Build output array (iterate backwards for stability)
    output = [0] * len(arr)
    for i in range(len(arr) - 1, -1, -1):
        num = arr[i]
        index = count[num - min_val] - 1
        output[index] = num
        count[num - min_val] -= 1
    
    return output

arr = [4, 2, 2, 8, 3, 3, 1]
print(f"\\nStable counting sort: {counting_sort_stable(arr)}")

# Example 3: In-Place Counting Sort (modifies input)
def counting_sort_inplace(arr):
    """
    In-place version (though still uses O(k) space for counts)
    """
    if not arr:
        return arr
    
    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1
    
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1
    
    # Write back to original array
    index = 0
    for i in range(range_size):
        while count[i] > 0:
            arr[index] = i + min_val
            index += 1
            count[i] -= 1
    
    return arr

# Example 4: Counting Sort for Objects
def counting_sort_objects(arr, key_func):
    """
    Sort objects by integer key
    
    Args:
        arr: List of objects
        key_func: Function to extract sort key
    """
    if not arr:
        return arr
    
    # Extract keys
    keys = [key_func(obj) for obj in arr]
    max_key = max(keys)
    min_key = min(keys)
    range_size = max_key - min_key + 1
    
    # Count occurrences
    count = [0] * range_size
    for key in keys:
        count[key - min_key] += 1
    
    # Cumulative count
    for i in range(1, range_size):
        count[i] += count[i - 1]
    
    # Build output (backwards for stability)
    output = [None] * len(arr)
    for i in range(len(arr) - 1, -1, -1):
        key = key_func(arr[i])
        index = count[key - min_key] - 1
        output[index] = arr[i]
        count[key - min_key] -= 1
    
    return output

# Sort people by age
people = [
    {'name': 'Alice', 'age': 25},
    {'name': 'Bob', 'age': 22},
    {'name': 'Charlie', 'age': 25},
    {'name': 'David', 'age': 22}
]
sorted_people = counting_sort_objects(people, lambda p: p['age'])
print(f"\\nSorted by age:")
for p in sorted_people:
    print(f"  {p}")

# Example 5: Negative Numbers Handling
def counting_sort_negative(arr):
    """Handle arrays with negative numbers"""
    if not arr:
        return arr
    
    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1
    
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1
    
    result = []
    for i in range(range_size):
        result.extend([i + min_val] * count[i])
    
    return result

arr = [3, -1, 4, -5, 2, -3, 0]
print(f"\\nWith negatives {[3, -1, 4, -5, 2, -3, 0]}: {counting_sort_negative(arr)}")

# Example 6: Count Sort with Statistics
def counting_sort_with_stats(arr):
    """Return sorted array and statistics"""
    if not arr:
        return arr, {}
    
    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1
    
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1
    
    result = []
    for i in range(range_size):
        result.extend([i + min_val] * count[i])
    
    stats = {
        'min': min_val,
        'max': max_val,
        'range': range_size,
        'unique_values': sum(1 for c in count if c > 0),
        'mode': min_val + count.index(max(count)),
        'mode_count': max(count)
    }
    
    return result, stats

arr = [4, 2, 2, 8, 3, 3, 1, 3]
sorted_arr, stats = counting_sort_with_stats(arr)
print(f"\\nStatistics: {stats}")

# Example 7: Counting Sort Visualization
def counting_sort_verbose(arr):
    """Show each step of counting sort"""
    print(f"Input: {arr}")
    
    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1
    
    print(f"Range: [{min_val}, {max_val}]")
    
    # Count
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1
    
    print(f"Counts: {count}")
    
    # Cumulative
    cumulative = count.copy()
    for i in range(1, range_size):
        cumulative[i] += cumulative[i - 1]
    
    print(f"Cumulative: {cumulative}")
    
    # Build result
    result = []
    for i in range(range_size):
        result.extend([i + min_val] * count[i])
    
    print(f"Output: {result}")
    return result

print("\\nVerbose counting sort:")
counting_sort_verbose([4, 2, 2, 8, 3, 3, 1])

# Example 8: Optimized for Small Range
def counting_sort_optimized(arr, max_range=1000):
    """
    Only use counting sort if range is reasonable
    Fall back to other algorithm if range is too large
    """
    if not arr:
        return arr
    
    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1
    
    if range_size > max_range:
        print(f"Range {range_size} too large, using quicksort")
        return sorted(arr)
    
    return counting_sort(arr)

# Example 9: Counting Sort for Digit (Radix Sort Helper)
def counting_sort_digit(arr, exp):
    """
    Sort by specific digit position
    Used as subroutine in radix sort
    
    Args:
        arr: Array to sort
        exp: Digit position (1 for units, 10 for tens, etc.)
    """
    n = len(arr)
    output = [0] * n
    count = [0] * 10  # 0-9 digits
    
    # Count occurrences of digit
    for i in range(n):
        digit = (arr[i] // exp) % 10
        count[digit] += 1
    
    # Cumulative count
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build output (backwards for stability)
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1
    
    # Copy back
    for i in range(n):
        arr[i] = output[i]
    
    return arr

# Example 10: Parallel Counting Sort Concept
def counting_sort_parallel_prep(arr, num_threads=4):
    """
    Prepare data for parallel counting sort
    Divide array into chunks for parallel processing
    """
    if not arr:
        return arr
    
    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1
    
    chunk_size = len(arr) // num_threads
    chunks = [arr[i:i + chunk_size] for i in range(0, len(arr), chunk_size)]
    
    # Each thread would count its chunk
    partial_counts = []
    for chunk in chunks:
        count = [0] * range_size
        for num in chunk:
            count[num - min_val] += 1
        partial_counts.append(count)
    
    # Merge counts
    total_count = [0] * range_size
    for count in partial_counts:
        for i in range(range_size):
            total_count[i] += count[i]
    
    # Build result
    result = []
    for i in range(range_size):
        result.extend([i + min_val] * total_count[i])
    
    return result`,
    pros: [
      "Linear time complexity O(n + k)",
      "Stable - maintains relative order",
      "Simple to implement and understand",
      "Very fast for small ranges",
      "Naturally counts duplicates",
      "Good for histogram generation"
    ],
    cons: [
      "Only works with integer keys",
      "Requires O(k) extra space for range",
      "Impractical for large ranges",
      "Not suitable for floating-point numbers",
      "Space wasteful for sparse data"
    ],
    useCases: [
      "Sorting integers in small range",
      "Grade/score sorting (0-100)",
      "Age sorting in demographics",
      "Histogram generation",
      "As subroutine in radix sort",
      "When stability is required"
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
            <code className="text-lg font-mono text-green-600 dark:text-green-400">{algorithm.timeWorst}</code>
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
          <CardTitle>How Counting Sort Works</CardTitle>
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
          <CardDescription>Complete counting sort with variations</CardDescription>
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
