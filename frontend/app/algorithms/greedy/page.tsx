'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, Code2, Lightbulb } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function GreedyPage() {
  const algorithm = {
    name: "Greedy Algorithms",
    description: "Optimization approach that makes the locally optimal choice at each step",
    difficulty: "intermediate",
    explanation: `Greedy algorithms make the best choice at each step with the hope of finding the global optimum. Unlike Dynamic Programming, greedy algorithms don't look ahead or reconsider past choices.

**Key Characteristics:**
1. **Greedy Choice Property**: Local optimum leads to global optimum
2. **Optimal Substructure**: Problem can be broken into subproblems
3. **No Backtracking**: Once a choice is made, it's never reconsidered
4. **Efficient**: Usually faster than DP (no need to store all solutions)

**When Greedy Works:**
- Problem has greedy choice property
- Making locally optimal choices leads to global optimum
- Examples: Minimum Spanning Tree, Huffman Coding, Activity Selection

**When NOT to Use Greedy:**
- When local optimum doesn't guarantee global optimum
- Need to explore multiple possibilities
- Use DP or backtracking instead`,
    timeBest: "O(n)",
    timeAverage: "O(n log n)",
    timeWorst: "O(n²)",
    spaceComplexity: "O(1) to O(n)",
    pythonCode: `# Greedy Algorithm Examples

# Example 1: Activity Selection Problem
def activity_selection(start, finish):
    """
    Select maximum number of non-overlapping activities
    Time: O(n log n), Space: O(n)
    
    Args:
        start: List of start times
        finish: List of finish times
    Returns:
        List of selected activity indices
    """
    # Combine and sort by finish time
    activities = list(zip(range(len(start)), start, finish))
    activities.sort(key=lambda x: x[2])
    
    selected = [activities[0][0]]
    last_finish = activities[0][2]
    
    for i, s, f in activities[1:]:
        if s >= last_finish:
            selected.append(i)
            last_finish = f
    
    return selected

start = [1, 3, 0, 5, 8, 5]
finish = [2, 4, 6, 7, 9, 9]
result = activity_selection(start, finish)
print(f"Selected activities: {result}")  # Output: [0, 1, 3, 4]

# Example 2: Fractional Knapsack
def fractional_knapsack(weights, values, capacity):
    """
    Fractional knapsack using greedy approach
    Time: O(n log n), Space: O(n)
    """
    # Calculate value per weight
    items = [(v/w, w, v) for w, v in zip(weights, values)]
    items.sort(reverse=True)  # Sort by value/weight ratio
    
    total_value = 0
    remaining_capacity = capacity
    
    for ratio, weight, value in items:
        if remaining_capacity >= weight:
            # Take entire item
            total_value += value
            remaining_capacity -= weight
        else:
            # Take fraction of item
            total_value += ratio * remaining_capacity
            break
    
    return total_value

weights = [10, 20, 30]
values = [60, 100, 120]
capacity = 50
print(f"Max value: {fractional_knapsack(weights, values, capacity)}")  # 240.0

# Example 3: Coin Change (Greedy - works for standard denominations)
def coin_change_greedy(coins, amount):
    """
    Make change using minimum coins (greedy)
    Works for standard denominations like [1, 5, 10, 25]
    Time: O(n), Space: O(1)
    """
    coins.sort(reverse=True)
    count = 0
    result = []
    
    for coin in coins:
        while amount >= coin:
            amount -= coin
            count += 1
            result.append(coin)
    
    if amount == 0:
        return count, result
    return -1, []

coins = [1, 5, 10, 25]
amount = 63
count, used = coin_change_greedy(coins, amount)
print(f"Coins needed: {count}, Used: {used}")  # 6 coins

# Example 4: Huffman Coding
import heapq
from collections import defaultdict

class HuffmanNode:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None
    
    def __lt__(self, other):
        return self.freq < other.freq

def huffman_encoding(text):
    """
    Generate Huffman codes for characters
    Time: O(n log n), Space: O(n)
    """
    # Calculate frequencies
    freq = defaultdict(int)
    for char in text:
        freq[char] += 1
    
    # Build heap
    heap = [HuffmanNode(char, f) for char, f in freq.items()]
    heapq.heapify(heap)
    
    # Build Huffman tree
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        
        parent = HuffmanNode(None, left.freq + right.freq)
        parent.left = left
        parent.right = right
        
        heapq.heappush(heap, parent)
    
    # Generate codes
    root = heap[0]
    codes = {}
    
    def generate_codes(node, code=""):
        if node.char is not None:
            codes[node.char] = code
            return
        if node.left:
            generate_codes(node.left, code + "0")
        if node.right:
            generate_codes(node.right, code + "1")
    
    generate_codes(root)
    return codes

text = "hello world"
codes = huffman_encoding(text)
print("Huffman codes:")
for char, code in sorted(codes.items()):
    print(f"  '{char}': {code}")

# Example 5: Job Sequencing Problem
def job_sequencing(jobs, max_deadline):
    """
    Schedule jobs to maximize profit
    Each job: (id, deadline, profit)
    Time: O(n²), Space: O(n)
    """
    # Sort by profit (descending)
    jobs.sort(key=lambda x: x[2], reverse=True)
    
    # Track time slots
    slots = [-1] * max_deadline
    total_profit = 0
    scheduled = []
    
    for job_id, deadline, profit in jobs:
        # Find latest available slot before deadline
        for slot in range(min(deadline - 1, max_deadline - 1), -1, -1):
            if slots[slot] == -1:
                slots[slot] = job_id
                total_profit += profit
                scheduled.append((job_id, slot + 1))
                break
    
    return total_profit, scheduled

jobs = [
    ('J1', 2, 100),
    ('J2', 1, 19),
    ('J3', 2, 27),
    ('J4', 1, 25),
    ('J5', 3, 15)
]
profit, schedule = job_sequencing(jobs, 3)
print(f"Max profit: {profit}, Schedule: {schedule}")

# Example 6: Minimum Platforms Required
def min_platforms(arrivals, departures):
    """
    Find minimum platforms needed at railway station
    Time: O(n log n), Space: O(1)
    """
    arrivals.sort()
    departures.sort()
    
    platforms_needed = 1
    max_platforms = 1
    i, j = 1, 0
    
    while i < len(arrivals) and j < len(departures):
        if arrivals[i] <= departures[j]:
            platforms_needed += 1
            i += 1
            max_platforms = max(max_platforms, platforms_needed)
        else:
            platforms_needed -= 1
            j += 1
    
    return max_platforms

arrivals = [900, 940, 950, 1100, 1500, 1800]
departures = [910, 1200, 1120, 1130, 1900, 2000]
print(f"Min platforms: {min_platforms(arrivals, departures)}")  # 3`,
    useCases: [
      "Network routing (shortest path)",
      "Data compression (Huffman coding)",
      "Task scheduling and resource allocation",
      "Minimum spanning tree problems",
      "Making change with coins",
      "Load balancing in distributed systems",
      "File merging and sorting",
      "Cache replacement algorithms"
    ],
    optimizations: [
      "Sort input first when order matters for greedy choice",
      "Use priority queue/heap for efficient selection",
      "Verify greedy choice property before implementing",
      "Consider counterexamples to validate approach",
      "Combine with other techniques when pure greedy fails",
      "Use greedy for approximation when exact solution is too expensive"
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{algorithm.name}</h1>
          <Badge>{algorithm.difficulty.charAt(0).toUpperCase() + algorithm.difficulty.slice(1)}</Badge>
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
          <CardTitle>Understanding Greedy Algorithms</CardTitle>
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
            Classic Greedy Problems
          </CardTitle>
          <CardDescription>Multiple greedy algorithm implementations</CardDescription>
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
              Greedy Strategy Tips
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
