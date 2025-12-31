'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, CheckCircle2, XCircle, Code2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function GraphsPage() {
  const example = {
    title: "Graph (Adjacency List)",
    difficulty: "intermediate",
    description: "A non-linear data structure consisting of vertices (nodes) connected by edges",
    explanation: `A graph is a collection of nodes (vertices) connected by edges. Unlike trees, graphs can have cycles and multiple paths between nodes.

**Graph Types:**
1. **Directed**: Edges have direction (A → B)
2. **Undirected**: Edges have no direction (A ↔ B)
3. **Weighted**: Edges have values/costs
4. **Unweighted**: All edges are equal

**Representations:**
1. **Adjacency Matrix**: 2D array, O(V²) space
2. **Adjacency List**: Array of lists, O(V + E) space (most common)
3. **Edge List**: List of all edges

**Common Operations:**
- **Add Vertex**: O(1)
- **Add Edge**: O(1)
- **Remove Vertex**: O(V + E)
- **Remove Edge**: O(E)
- **Query Edge**: O(1) to O(V)`,
    time_complexity: "O(1) for adding vertex/edge, O(V+E) for traversal",
    space_complexity: "O(V + E) where V is vertices, E is edges",
    code_example: `# Graph Implementation using Adjacency List
class Graph:
    """Graph with adjacency list representation"""
    def __init__(self, directed=False):
        self.graph = {}
        self.directed = directed
    
    def add_vertex(self, vertex):
        """Add a vertex to the graph - O(1)"""
        if vertex not in self.graph:
            self.graph[vertex] = []
    
    def add_edge(self, v1, v2, weight=1):
        """Add an edge between vertices - O(1)"""
        if v1 not in self.graph:
            self.add_vertex(v1)
        if v2 not in self.graph:
            self.add_vertex(v2)
        
        self.graph[v1].append((v2, weight))
        
        if not self.directed:
            self.graph[v2].append((v1, weight))
    
    def remove_edge(self, v1, v2):
        """Remove edge between vertices - O(E)"""
        if v1 in self.graph:
            self.graph[v1] = [(v, w) for v, w in self.graph[v1] if v != v2]
        
        if not self.directed and v2 in self.graph:
            self.graph[v2] = [(v, w) for v, w in self.graph[v2] if v != v1]
    
    def get_neighbors(self, vertex):
        """Get all neighbors of a vertex - O(1)"""
        return self.graph.get(vertex, [])
    
    def has_edge(self, v1, v2):
        """Check if edge exists - O(E)"""
        if v1 in self.graph:
            return any(v == v2 for v, _ in self.graph[v1])
        return False
    
    def bfs(self, start):
        """Breadth-First Search - O(V + E)"""
        visited = set()
        queue = [start]
        result = []
        
        while queue:
            vertex = queue.pop(0)
            if vertex not in visited:
                visited.add(vertex)
                result.append(vertex)
                
                for neighbor, _ in self.graph.get(vertex, []):
                    if neighbor not in visited:
                        queue.append(neighbor)
        
        return result
    
    def dfs(self, start):
        """Depth-First Search - O(V + E)"""
        visited = set()
        result = []
        
        def dfs_recursive(vertex):
            visited.add(vertex)
            result.append(vertex)
            
            for neighbor, _ in self.graph.get(vertex, []):
                if neighbor not in visited:
                    dfs_recursive(neighbor)
        
        dfs_recursive(start)
        return result
    
    def find_path(self, start, end):
        """Find path between two vertices using BFS"""
        if start == end:
            return [start]
        
        visited = {start}
        queue = [(start, [start])]
        
        while queue:
            vertex, path = queue.pop(0)
            
            for neighbor, _ in self.graph.get(vertex, []):
                if neighbor not in visited:
                    if neighbor == end:
                        return path + [neighbor]
                    
                    visited.add(neighbor)
                    queue.append((neighbor, path + [neighbor]))
        
        return None
    
    def display(self):
        """Display graph structure"""
        for vertex in self.graph:
            neighbors = [f"{v}(w:{w})" for v, w in self.graph[vertex]]
            print(f"{vertex} -> {', '.join(neighbors)}")

# Example 1: Social Network
social = Graph(directed=False)
social.add_edge("Alice", "Bob")
social.add_edge("Alice", "Charlie")
social.add_edge("Bob", "David")
social.add_edge("Charlie", "David")
social.add_edge("David", "Eve")

print("Social Network:")
social.display()

print("\\nBFS from Alice:", social.bfs("Alice"))
print("DFS from Alice:", social.dfs("Alice"))

# Find path between users
path = social.find_path("Alice", "Eve")
print(f"Path from Alice to Eve: {' -> '.join(path)}")

# Example 2: City Road Network (Weighted)
roads = Graph(directed=False)
roads.add_edge("NYC", "Boston", 215)
roads.add_edge("NYC", "Philadelphia", 95)
roads.add_edge("Boston", "Portland", 103)
roads.add_edge("Philadelphia", "Pittsburgh", 305)

print("\\nRoad Network:")
roads.display()

# Example 3: Web Page Links (Directed)
web = Graph(directed=True)
web.add_edge("Home", "About")
web.add_edge("Home", "Products")
web.add_edge("Products", "Product1")
web.add_edge("Products", "Product2")
web.add_edge("Product1", "Cart")
web.add_edge("Product2", "Cart")

print("\\nWebsite Structure:")
web.display()`,
    use_cases: [
      "Social networks (friends, followers)",
      "Road networks and GPS navigation",
      "Computer networks and internet routing",
      "Recommendation systems",
      "Dependency resolution in package managers",
      "Web page link structure (PageRank)",
      "Flight route optimization",
      "Circuit design and analysis"
    ],
    pros: [
      "Can represent complex relationships",
      "Flexible - many types and variations",
      "Efficient for sparse graphs with adjacency list",
      "Natural representation of real-world networks",
      "Supports multiple algorithms (BFS, DFS, shortest path)"
    ],
    cons: [
      "Can be memory intensive for dense graphs",
      "Complex algorithms for some operations",
      "Edge lookup slower than adjacency matrix",
      "Difficult to visualize for large graphs",
      "Cycles can complicate traversal algorithms"
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{example.title}</h1>
          <Badge>{example.difficulty.charAt(0).toUpperCase() + example.difficulty.slice(1)}</Badge>
        </div>
        <p className="text-xl text-muted-foreground">{example.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Time Complexity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-lg font-mono">{example.time_complexity}</code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="w-5 h-5" />
              Space Complexity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-lg font-mono">{example.space_complexity}</code>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Explanation</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
          {example.explanation.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 whitespace-pre-wrap">{paragraph}</p>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Graph Implementation
          </CardTitle>
          <CardDescription>Complete implementation with BFS, DFS, and pathfinding</CardDescription>
        </CardHeader>
        <CardContent>
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{ margin: 0, borderRadius: '0.5rem' }}
          >
            {example.code_example}
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
              {example.pros.map((pro, idx) => (
                <li key={idx} className="flex gap-2">
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
              {example.cons.map((con, idx) => (
                <li key={idx} className="flex gap-2">
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
          <CardTitle>Real-World Use Cases</CardTitle>
          <CardDescription>Where graphs are essential</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-3">
            {example.use_cases.map((useCase, idx) => (
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
