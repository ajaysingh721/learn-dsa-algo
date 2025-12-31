'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, CheckCircle2, XCircle, Code2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function TreesPage() {
  const example = {
    title: "Binary Search Tree (BST)",
    difficulty: "intermediate",
    description: "A hierarchical tree structure where each node has at most two children, with left < parent < right ordering",
    explanation: `A Binary Search Tree is a node-based data structure with a hierarchical organization. Each node contains a value and pointers to left and right child nodes.

**BST Property:**
For every node:
- All values in the **left subtree** are **less** than the node's value
- All values in the **right subtree** are **greater** than the node's value
- Both left and right subtrees are also BSTs

**Key Operations:**
- **Search**: O(log n) average, O(n) worst - Find a value
- **Insert**: O(log n) average, O(n) worst - Add a new node
- **Delete**: O(log n) average, O(n) worst - Remove a node
- **Traversal**: O(n) - Visit all nodes in order

**Tree Traversals:**
1. **Inorder** (Left-Root-Right): Gives sorted order
2. **Preorder** (Root-Left-Right): Used for copying tree
3. **Postorder** (Left-Right-Root): Used for deletion
4. **Level-order**: Breadth-first traversal`,
    time_complexity: "O(log n) average for search/insert/delete, O(n) worst case",
    space_complexity: "O(n) for storing n nodes",
    code_example: `# Binary Search Tree Implementation
class TreeNode:
    """Node in a binary search tree"""
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    """Binary Search Tree implementation"""
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        """Insert a value into BST - O(log n) average"""
        if not self.root:
            self.root = TreeNode(value)
        else:
            self._insert_recursive(self.root, value)
    
    def _insert_recursive(self, node, value):
        """Helper method for recursive insertion"""
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = TreeNode(value)
            else:
                self._insert_recursive(node.right, value)
    
    def search(self, value):
        """Search for a value - O(log n) average"""
        return self._search_recursive(self.root, value)
    
    def _search_recursive(self, node, value):
        """Helper method for recursive search"""
        if node is None or node.value == value:
            return node
        
        if value < node.value:
            return self._search_recursive(node.left, value)
        return self._search_recursive(node.right, value)
    
    def delete(self, value):
        """Delete a value from BST - O(log n) average"""
        self.root = self._delete_recursive(self.root, value)
    
    def _delete_recursive(self, node, value):
        """Helper method for recursive deletion"""
        if node is None:
            return node
        
        if value < node.value:
            node.left = self._delete_recursive(node.left, value)
        elif value > node.value:
            node.right = self._delete_recursive(node.right, value)
        else:
            # Node with only one child or no child
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left
            
            # Node with two children: get inorder successor
            node.value = self._min_value(node.right)
            node.right = self._delete_recursive(node.right, node.value)
        
        return node
    
    def _min_value(self, node):
        """Find minimum value in tree"""
        current = node
        while current.left:
            current = current.left
        return current.value
    
    def inorder(self):
        """Inorder traversal - returns sorted order"""
        result = []
        self._inorder_recursive(self.root, result)
        return result
    
    def _inorder_recursive(self, node, result):
        """Helper for inorder traversal"""
        if node:
            self._inorder_recursive(node.left, result)
            result.append(node.value)
            self._inorder_recursive(node.right, result)
    
    def preorder(self):
        """Preorder traversal"""
        result = []
        self._preorder_recursive(self.root, result)
        return result
    
    def _preorder_recursive(self, node, result):
        """Helper for preorder traversal"""
        if node:
            result.append(node.value)
            self._preorder_recursive(node.left, result)
            self._preorder_recursive(node.right, result)
    
    def height(self):
        """Calculate height of tree"""
        return self._height_recursive(self.root)
    
    def _height_recursive(self, node):
        """Helper for height calculation"""
        if node is None:
            return -1
        left_height = self._height_recursive(node.left)
        right_height = self._height_recursive(node.right)
        return max(left_height, right_height) + 1

# Example Usage
bst = BinarySearchTree()

# Insert elements
values = [50, 30, 70, 20, 40, 60, 80]
for val in values:
    bst.insert(val)

print("Inorder (sorted):", bst.inorder())
# Output: [20, 30, 40, 50, 60, 70, 80]

print("Preorder:", bst.preorder())
# Output: [50, 30, 20, 40, 70, 60, 80]

# Search for value
found = bst.search(40)
print(f"Found 40: {found is not None}")  # True

# Delete a node
bst.delete(30)
print("After deleting 30:", bst.inorder())
# Output: [20, 40, 50, 60, 70, 80]

print(f"Tree height: {bst.height()}")  # Output: 2`,
    use_cases: [
      "Database indexing for fast lookups",
      "File system directory structures",
      "Expression parsing in compilers",
      "Autocomplete and spell-check systems",
      "Priority queue implementations",
      "Decision trees in machine learning",
      "Hierarchical data representation",
      "Routing tables in networks"
    ],
    pros: [
      "Fast search, insert, delete - O(log n) average",
      "Maintains sorted order automatically",
      "Efficient range queries",
      "Natural hierarchical representation",
      "Space efficient compared to hash tables"
    ],
    cons: [
      "Can become unbalanced - O(n) worst case",
      "More complex implementation than arrays",
      "Requires extra memory for pointers",
      "No O(1) random access like arrays",
      "Recursive operations may cause stack overflow"
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
            Complete BST Implementation
          </CardTitle>
          <CardDescription>Full implementation with insert, delete, search, and traversals</CardDescription>
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
          <CardDescription>Where trees are essential</CardDescription>
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
