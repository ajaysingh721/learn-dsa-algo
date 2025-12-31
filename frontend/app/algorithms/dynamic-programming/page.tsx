'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, Code2, Lightbulb } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function DynamicProgrammingPage() {
  const algorithm = {
    name: "Dynamic Programming (Fibonacci & Knapsack)",
    description: "Optimization technique that stores results of subproblems to avoid redundant calculations",
    difficulty: "advanced",
    explanation: `Dynamic Programming (DP) is a method for solving complex problems by breaking them down into simpler subproblems. It stores the results of subproblems to avoid redundant calculations.

**Key Characteristics:**
1. **Optimal Substructure**: Problem can be broken into subproblems
2. **Overlapping Subproblems**: Same subproblems solved multiple times
3. **Memoization**: Store computed results (top-down approach)
4. **Tabulation**: Build solution bottom-up using table

**When to Use DP:**
- Problem asks for optimum value (max, min, longest, shortest)
- Counting problems (number of ways)
- Decision making at each step affects future decisions

**Common DP Patterns:**
- Fibonacci sequences
- Knapsack problems
- Longest Common Subsequence
- Matrix chain multiplication
- Shortest path problems`,
    timeBest: "O(n)",
    timeAverage: "O(n²) to O(n³)",
    timeWorst: "Depends on problem",
    spaceComplexity: "O(n) to O(n²)",
    pythonCode: `# Dynamic Programming Examples

# Example 1: Fibonacci - Memoization (Top-Down)
def fibonacci_memo(n, memo={}):
    """
    Calculate nth Fibonacci number using memoization
    Time: O(n), Space: O(n)
    """
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

# Fibonacci - Tabulation (Bottom-Up)
def fibonacci_tab(n):
    """
    Calculate nth Fibonacci using tabulation
    Time: O(n), Space: O(n)
    """
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

print(f"Fibonacci(10) = {fibonacci_tab(10)}")  # Output: 55

# Example 2: 0/1 Knapsack Problem
def knapsack(weights, values, capacity):
    """
    0/1 Knapsack: maximize value within weight capacity
    Time: O(n * capacity), Space: O(n * capacity)
    
    Args:
        weights: List of item weights
        values: List of item values
        capacity: Maximum weight capacity
    """
    n = len(weights)
    # dp[i][w] = max value using first i items with weight limit w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't include current item
            dp[i][w] = dp[i-1][w]
            
            # Include current item if it fits
            if weights[i-1] <= w:
                include_value = values[i-1] + dp[i-1][w - weights[i-1]]
                dp[i][w] = max(dp[i][w], include_value)
    
    return dp[n][capacity]

weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 5
max_value = knapsack(weights, values, capacity)
print(f"Max knapsack value: {max_value}")  # Output: 7

# Example 3: Longest Common Subsequence
def lcs(text1, text2):
    """
    Find length of longest common subsequence
    Time: O(m*n), Space: O(m*n)
    """
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]

text1 = "abcde"
text2 = "ace"
print(f"LCS length: {lcs(text1, text2)}")  # Output: 3

# Example 4: Coin Change (Minimum coins)
def coin_change(coins, amount):
    """
    Find minimum coins needed to make amount
    Time: O(amount * len(coins)), Space: O(amount)
    """
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

coins = [1, 2, 5]
amount = 11
print(f"Min coins for {amount}: {coin_change(coins, amount)}")  # Output: 3

# Example 5: Longest Increasing Subsequence
def longest_increasing_subsequence(arr):
    """
    Find length of longest increasing subsequence
    Time: O(n²), Space: O(n)
    """
    if not arr:
        return 0
    
    n = len(arr)
    dp = [1] * n
    
    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)

arr = [10, 9, 2, 5, 3, 7, 101, 18]
print(f"LIS length: {longest_increasing_subsequence(arr)}")  # Output: 4

# Example 6: Edit Distance (Levenshtein Distance)
def edit_distance(word1, word2):
    """
    Minimum operations to convert word1 to word2
    Operations: insert, delete, replace
    Time: O(m*n), Space: O(m*n)
    """
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # Delete
                    dp[i][j-1],    # Insert
                    dp[i-1][j-1]   # Replace
                )
    
    return dp[m][n]

word1 = "horse"
word2 = "ros"
print(f"Edit distance: {edit_distance(word1, word2)}")  # Output: 3

# Example 7: Maximum Subarray Sum (Kadane's Algorithm)
def max_subarray_sum(arr):
    """
    Find maximum sum of contiguous subarray
    Time: O(n), Space: O(1)
    """
    max_sum = current_sum = arr[0]
    
    for num in arr[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    
    return max_sum

arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(f"Max subarray sum: {max_subarray_sum(arr)}")  # Output: 6`,
    useCases: [
      "Resource allocation and scheduling",
      "Bioinformatics (DNA sequence alignment)",
      "Text comparison and diff tools",
      "Game playing and AI decision making",
      "Financial optimization problems",
      "Route planning and navigation",
      "Image and signal processing",
      "Compiler optimization"
    ],
    optimizations: [
      "Use space optimization when only previous row is needed",
      "Memoization with dictionary for top-down approach",
      "Identify if problem exhibits DP characteristics before implementing",
      "Draw recurrence relation before coding",
      "Use rolling arrays to reduce space from O(n²) to O(n)",
      "Consider greedy approach first - simpler if applicable"
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{algorithm.name}</h1>
          <Badge variant="destructive">{algorithm.difficulty.charAt(0).toUpperCase() + algorithm.difficulty.slice(1)}</Badge>
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
          <CardTitle>Understanding Dynamic Programming</CardTitle>
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
            Classic DP Problems
          </CardTitle>
          <CardDescription>Multiple DP patterns and solutions</CardDescription>
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
              DP Tips & Tricks
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
