'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, Code2, Lightbulb } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function GraphAlgorithmsPage() {
  const algorithm = {
    name: "Graph Algorithms (Dijkstra & BFS/DFS)",
    description: "Essential algorithms for traversing and finding shortest paths in graphs",
    difficulty: "advanced",
    explanation: `Graph algorithms are fundamental for solving problems involving networks, relationships, and pathfinding. Different algorithms suit different scenarios.

**Common Graph Algorithms:**

**1. Breadth-First Search (BFS)**
- Level-by-level traversal using queue
- Finds shortest path in unweighted graphs
- Time: O(V + E), Space: O(V)

**2. Depth-First Search (DFS)**
- Explores as deep as possible using recursion/stack
- Useful for cycle detection, topological sort
- Time: O(V + E), Space: O(V)

**3. Dijkstra's Algorithm**
- Finds shortest path in weighted graphs (non-negative weights)
- Uses priority queue (min-heap)
- Time: O((V + E) log V), Space: O(V)

**4. Bellman-Ford Algorithm**
- Handles negative weights
- Detects negative cycles
- Time: O(V × E), Space: O(V)

**5. Floyd-Warshall**
- All-pairs shortest path
- Time: O(V³), Space: O(V²)`,
    timeBest: "O(V + E)",
    timeAverage: "O((V + E) log V)",
    timeWorst: "O(V³)",
    spaceComplexity: "O(V) to O(V²)",
    pythonCode: `# Graph Algorithms Implementation
import heapq
from collections import deque, defaultdict

class Graph:
    """Graph with adjacency list representation"""
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v, weight=1):
        """Add weighted edge"""
        self.graph[u].append((v, weight))

# Example 1: Breadth-First Search (BFS)
def bfs(graph, start):
    """
    BFS traversal from start vertex
    Time: O(V + E), Space: O(V)
    """
    visited = set()
    queue = deque([start])
    result = []
    
    while queue:
        vertex = queue.popleft()
        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)
            
            for neighbor, _ in graph.graph[vertex]:
                if neighbor not in visited:
                    queue.append(neighbor)
    
    return result

# Example 2: Depth-First Search (DFS)
def dfs(graph, start, visited=None):
    """
    DFS traversal from start vertex
    Time: O(V + E), Space: O(V)
    """
    if visited is None:
        visited = set()
    
    visited.add(start)
    result = [start]
    
    for neighbor, _ in graph.graph[start]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    
    return result

# Example 3: Dijkstra's Shortest Path
def dijkstra(graph, start):
    """
    Find shortest paths from start to all vertices
    Time: O((V + E) log V), Space: O(V)
    
    Returns:
        Dictionary mapping vertex to (distance, path)
    """
    distances = {vertex: float('inf') for vertex in graph.graph}
    distances[start] = 0
    
    # Priority queue: (distance, vertex, path)
    pq = [(0, start, [start])]
    paths = {start: [start]}
    
    while pq:
        current_dist, current, path = heapq.heappop(pq)
        
        if current_dist > distances[current]:
            continue
        
        for neighbor, weight in graph.graph[current]:
            distance = current_dist + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                paths[neighbor] = path + [neighbor]
                heapq.heappush(pq, (distance, neighbor, paths[neighbor]))
    
    return distances, paths

# Example Usage
g = Graph()
g.add_edge('A', 'B', 4)
g.add_edge('A', 'C', 2)
g.add_edge('B', 'C', 1)
g.add_edge('B', 'D', 5)
g.add_edge('C', 'D', 8)
g.add_edge('C', 'E', 10)
g.add_edge('D', 'E', 2)

print("BFS from A:", bfs(g, 'A'))
print("DFS from A:", dfs(g, 'A'))

distances, paths = dijkstra(g, 'A')
print("\\nShortest distances from A:")
for vertex, dist in distances.items():
    path = paths.get(vertex, [])
    print(f"  To {vertex}: {dist}, Path: {' -> '.join(path)}")

# Example 4: Bellman-Ford (handles negative weights)
def bellman_ford(graph, start, vertices):
    """
    Shortest path with negative weight support
    Time: O(V × E), Space: O(V)
    """
    distances = {v: float('inf') for v in vertices}
    distances[start] = 0
    
    # Relax edges V-1 times
    for _ in range(len(vertices) - 1):
        for u in graph.graph:
            for v, weight in graph.graph[u]:
                if distances[u] + weight < distances[v]:
                    distances[v] = distances[u] + weight
    
    # Check for negative cycles
    for u in graph.graph:
        for v, weight in graph.graph[u]:
            if distances[u] + weight < distances[v]:
                return None  # Negative cycle detected
    
    return distances

# Example 5: Topological Sort (DFS-based)
def topological_sort(graph):
    """
    Topological ordering of directed acyclic graph
    Time: O(V + E), Space: O(V)
    """
    visited = set()
    stack = []
    
    def dfs_topo(vertex):
        visited.add(vertex)
        for neighbor, _ in graph.graph[vertex]:
            if neighbor not in visited:
                dfs_topo(neighbor)
        stack.append(vertex)
    
    for vertex in graph.graph:
        if vertex not in visited:
            dfs_topo(vertex)
    
    return stack[::-1]

# Create DAG for topological sort
dag = Graph()
dag.add_edge('A', 'C')
dag.add_edge('B', 'C')
dag.add_edge('B', 'D')
dag.add_edge('C', 'E')
dag.add_edge('D', 'F')
dag.add_edge('E', 'F')

print("\\nTopological Sort:", topological_sort(dag))

# Example 6: Detect Cycle in Directed Graph
def has_cycle_directed(graph):
    """
    Detect cycle in directed graph using DFS
    Time: O(V + E), Space: O(V)
    """
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {vertex: WHITE for vertex in graph.graph}
    
    def dfs_cycle(vertex):
        color[vertex] = GRAY
        
        for neighbor, _ in graph.graph[vertex]:
            if color[neighbor] == GRAY:
                return True  # Back edge found - cycle!
            if color[neighbor] == WHITE and dfs_cycle(neighbor):
                return True
        
        color[vertex] = BLACK
        return False
    
    for vertex in graph.graph:
        if color[vertex] == WHITE:
            if dfs_cycle(vertex):
                return True
    
    return False

# Example 7: Minimum Spanning Tree - Prim's Algorithm
def prims_mst(graph, start):
    """
    Find minimum spanning tree using Prim's algorithm
    Time: O(E log V), Space: O(V)
    """
    visited = set([start])
    edges = [(weight, start, to) for to, weight in graph.graph[start]]
    heapq.heapify(edges)
    
    mst = []
    total_weight = 0
    
    while edges and len(visited) < len(graph.graph):
        weight, frm, to = heapq.heappop(edges)
        
        if to not in visited:
            visited.add(to)
            mst.append((frm, to, weight))
            total_weight += weight
            
            for next_to, next_weight in graph.graph[to]:
                if next_to not in visited:
                    heapq.heappush(edges, (next_weight, to, next_to))
    
    return mst, total_weight

# Example 8: Connected Components
def count_connected_components(graph):
    """
    Count connected components in undirected graph
    Time: O(V + E), Space: O(V)
    """
    visited = set()
    count = 0
    
    def dfs_component(vertex):
        visited.add(vertex)
        for neighbor, _ in graph.graph[vertex]:
            if neighbor not in visited:
                dfs_component(neighbor)
    
    for vertex in graph.graph:
        if vertex not in visited:
            dfs_component(vertex)
            count += 1
    
    return count

# Example 9: Floyd-Warshall (All-pairs shortest path)
def floyd_warshall(vertices, edges):
    """
    All-pairs shortest path
    Time: O(V³), Space: O(V²)
    """
    # Initialize distance matrix
    dist = {i: {j: float('inf') for j in vertices} for i in vertices}
    
    # Distance from vertex to itself is 0
    for v in vertices:
        dist[v][v] = 0
    
    # Add edge weights
    for u, v, weight in edges:
        dist[u][v] = weight
    
    # Floyd-Warshall algorithm
    for k in vertices:
        for i in vertices:
            for j in vertices:
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    
    return dist

vertices = ['A', 'B', 'C', 'D']
edges = [('A', 'B', 3), ('B', 'C', 1), ('A', 'C', 4), ('C', 'D', 2)]
all_pairs = floyd_warshall(vertices, edges)

print("\\nAll-pairs shortest paths:")
for i in vertices:
    for j in vertices:
        print(f"  {i} to {j}: {all_pairs[i][j]}")`,
    useCases: [
      "Social network analysis (connections, influence)",
      "GPS navigation and route planning",
      "Network routing protocols",
      "Web crawling and page ranking",
      "Dependency resolution in build systems",
      "Circuit design and analysis",
      "Game AI pathfinding",
      "Recommendation systems"
    ],
    optimizations: [
      "Use adjacency list for sparse graphs, matrix for dense",
      "Implement bidirectional BFS for faster pathfinding",
      "Use A* algorithm with heuristics for better performance",
      "Cache computed paths for frequently accessed routes",
      "Parallelize graph algorithms for large graphs",
      "Use union-find for efficient connected components"
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
          <CardTitle>Graph Algorithm Overview</CardTitle>
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
            Essential Graph Algorithms
          </CardTitle>
          <CardDescription>BFS, DFS, Dijkstra, and more</CardDescription>
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
              Optimization Strategies
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
