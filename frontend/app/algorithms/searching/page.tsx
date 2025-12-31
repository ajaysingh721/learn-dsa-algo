'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, Code2, Lightbulb } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function SearchingPage() {
  const algorithm = {
    name: "Binary Search",
    description: "Efficient divide-and-conquer algorithm to find an element in a sorted array",
    difficulty: "beginner",
    explanation: `Binary Search is one of the most fundamental and efficient searching algorithms. It works on sorted arrays by repeatedly dividing the search space in half.

**Algorithm Steps:**
1. Start with left = 0, right = array length - 1
2. Calculate middle index: mid = (left + right) // 2
3. Compare target with middle element:
   - If equal: Found! Return index
   - If target < middle: Search left half (right = mid - 1)
   - If target > middle: Search right half (left = mid + 1)
4. Repeat until found or search space is empty

**Why It's Efficient:**
- Eliminates half the remaining elements in each step
- Much faster than linear search for large datasets
- Requires sorted data as prerequisite`,
    timeBest: "O(1)",
    timeAverage: "O(log n)",
    timeWorst: "O(log n)",
    spaceComplexity: "O(1) iterative, O(log n) recursive",
    pythonCode: `# Binary Search - Iterative Implementation
def binary_search(arr, target):
    """
    Search for target in sorted array using binary search
    
    Args:
        arr: Sorted list of elements
        target: Element to search for
    
    Returns:
        Index of target if found, -1 otherwise
    
    Time: O(log n), Space: O(1)
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Binary Search - Recursive Implementation
def binary_search_recursive(arr, target, left=0, right=None):
    """
    Recursive binary search implementation
    
    Time: O(log n), Space: O(log n) due to recursion stack
    """
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# Example 1: Basic Usage
arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
target = 7

index = binary_search(arr, target)
print(f"Element {target} found at index: {index}")  # Output: 3

# Test with element not in array
index = binary_search(arr, 8)
print(f"Element 8 found at index: {index}")  # Output: -1

# Example 2: Find First and Last Position
def search_range(arr, target):
    """Find first and last position of target in sorted array"""
    def find_first(arr, target):
        left, right = 0, len(arr) - 1
        result = -1
        
        while left <= right:
            mid = (left + right) // 2
            if arr[mid] == target:
                result = mid
                right = mid - 1  # Continue searching left
            elif arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        
        return result
    
    def find_last(arr, target):
        left, right = 0, len(arr) - 1
        result = -1
        
        while left <= right:
            mid = (left + right) // 2
            if arr[mid] == target:
                result = mid
                left = mid + 1  # Continue searching right
            elif arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        
        return result
    
    first = find_first(arr, target)
    last = find_last(arr, target)
    return [first, last]

arr = [1, 2, 2, 2, 3, 4, 5]
print(f"Range of 2: {search_range(arr, 2)}")  # Output: [1, 3]

# Example 3: Search in Rotated Sorted Array
def search_rotated(arr, target):
    """Binary search in rotated sorted array"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        
        # Determine which side is sorted
        if arr[left] <= arr[mid]:  # Left side is sorted
            if arr[left] <= target < arr[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # Right side is sorted
            if arr[mid] < target <= arr[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1

rotated = [4, 5, 6, 7, 0, 1, 2]
print(f"Search 0 in rotated: {search_rotated(rotated, 0)}")  # Output: 4

# Example 4: Square Root using Binary Search
def sqrt_binary_search(n, precision=6):
    """Find square root using binary search"""
    if n < 0:
        return None
    if n == 0 or n == 1:
        return n
    
    left, right = 0, n
    result = 0
    
    # Find integer part
    while left <= right:
        mid = (left + right) // 2
        if mid * mid == n:
            return mid
        elif mid * mid < n:
            result = mid
            left = mid + 1
        else:
            right = mid - 1
    
    # Find decimal part
    increment = 0.1
    for _ in range(precision):
        while result * result <= n:
            result += increment
        result -= increment
        increment /= 10
    
    return round(result, precision)

print(f"Square root of 50: {sqrt_binary_search(50)}")  # Output: 7.071068

# Example 5: Search Insert Position
def search_insert(arr, target):
    """Find index where target should be inserted to maintain sort"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return left

arr = [1, 3, 5, 6]
print(f"Insert position for 5: {search_insert(arr, 5)}")  # Output: 2
print(f"Insert position for 2: {search_insert(arr, 2)}")  # Output: 1
print(f"Insert position for 7: {search_insert(arr, 7)}")  # Output: 4`,
    javascriptCode: `/**
 * Binary Search - Iterative
 * @param {number[]} arr - Sorted array
 * @param {number} target - Element to find
 * @returns {number} Index of target or -1
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Example usage
const arr = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(\`Found at index: \${binarySearch(arr, 7)}\`); // 3`,
    useCases: [
      "Searching in sorted databases and arrays",
      "Dictionary and phone book lookups",
      "Finding square roots and other mathematical computations",
      "Version control systems (bisect in Git)",
      "Finding insertion points in sorted data",
      "Range queries in databases",
      "AI decision trees and game playing",
      "Network routing table lookups"
    ],
    optimizations: [
      "Use iterative over recursive to save stack space",
      "Avoid integer overflow: use mid = left + (right - left) // 2",
      "Consider interpolation search for uniformly distributed data",
      "Pre-process data to ensure it's sorted",
      "Use jump search for very large datasets",
      "Implement exponential search for unbounded arrays"
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
            <code className="text-lg font-mono text-orange-600 dark:text-orange-400">{algorithm.timeWorst}</code>
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
          <CardTitle>How It Works</CardTitle>
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
            Python Implementation
          </CardTitle>
          <CardDescription>Multiple variations and practical examples</CardDescription>
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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            JavaScript Implementation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{ margin: 0, borderRadius: '0.5rem' }}
          >
            {algorithm.javascriptCode}
          </SyntaxHighlighter>
        </CardContent>
      </Card>

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
              Optimization Tips
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
