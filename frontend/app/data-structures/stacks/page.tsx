'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, CheckCircle2, XCircle, Code2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function StacksPage() {
  const example = {
    title: "Stack (LIFO)",
    difficulty: "beginner",
    description: "A Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end",
    explanation: `A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Think of it like a stack of plates - you can only add or remove plates from the top.

**Core Operations:**
- **Push**: O(1) - Add element to the top
- **Pop**: O(1) - Remove and return top element
- **Peek/Top**: O(1) - View top element without removing
- **isEmpty**: O(1) - Check if stack is empty

**The LIFO Principle:**
The last element pushed onto the stack is the first one to be popped off. This makes stacks perfect for scenarios where you need to reverse order or track history.

**Common Implementations:**
1. Using arrays/lists (dynamic)
2. Using linked lists (more flexible)
3. Fixed-size arrays (with capacity limit)`,
    time_complexity: "O(1) for push, pop, and peek operations",
    space_complexity: "O(n) where n is number of elements",
    code_example: `# Stack Implementation using List
class Stack:
    """Stack implementation with array (list)"""
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add element to top of stack - O(1)"""
        self.items.append(item)
    
    def pop(self):
        """Remove and return top element - O(1)"""
        if self.is_empty():
            raise IndexError("Pop from empty stack")
        return self.items.pop()
    
    def peek(self):
        """Return top element without removing - O(1)"""
        if self.is_empty():
            raise IndexError("Peek from empty stack")
        return self.items[-1]
    
    def is_empty(self):
        """Check if stack is empty - O(1)"""
        return len(self.items) == 0
    
    def size(self):
        """Return number of elements - O(1)"""
        return len(self.items)
    
    def clear(self):
        """Remove all elements - O(1)"""
        self.items = []

# Example 1: Basic Stack Operations
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)

print(f"Top element: {stack.peek()}")  # Output: 30
print(f"Stack size: {stack.size()}")   # Output: 3

print(f"Popped: {stack.pop()}")  # Output: 30
print(f"Popped: {stack.pop()}")  # Output: 20

# Example 2: Balanced Parentheses Checker
def is_balanced(expression):
    """Check if parentheses are balanced"""
    stack = Stack()
    opening = "({["
    closing = ")}]"
    matches = {')': '(', '}': '{', ']': '['}
    
    for char in expression:
        if char in opening:
            stack.push(char)
        elif char in closing:
            if stack.is_empty():
                return False
            if stack.pop() != matches[char]:
                return False
    
    return stack.is_empty()

# Test balanced parentheses
print(is_balanced("(){}[]"))      # True
print(is_balanced("({[]})"))      # True
print(is_balanced("({[)]}"))      # False

# Example 3: Reverse a String
def reverse_string(text):
    """Reverse string using stack"""
    stack = Stack()
    
    # Push all characters
    for char in text:
        stack.push(char)
    
    # Pop all characters
    reversed_text = ""
    while not stack.is_empty():
        reversed_text += stack.pop()
    
    return reversed_text

print(reverse_string("Hello World"))  # Output: "dlroW olleH"

# Example 4: Undo Mechanism
class TextEditor:
    """Simple text editor with undo functionality"""
    def __init__(self):
        self.text = ""
        self.history = Stack()
    
    def write(self, text):
        """Add text and save to history"""
        self.history.push(self.text)
        self.text += text
    
    def undo(self):
        """Undo last write operation"""
        if not self.history.is_empty():
            self.text = self.history.pop()
    
    def get_text(self):
        return self.text

editor = TextEditor()
editor.write("Hello ")
editor.write("World")
print(editor.get_text())  # Output: "Hello World"
editor.undo()
print(editor.get_text())  # Output: "Hello "`,
    use_cases: [
      "Function call stack in programming languages",
      "Undo/Redo functionality in applications",
      "Browser back button navigation",
      "Expression evaluation and syntax parsing",
      "Backtracking algorithms (maze solving, DFS)",
      "Memory management in recursion",
      "Reversing data (strings, arrays)",
      "Balancing symbols in compilers"
    ],
    pros: [
      "Simple and intuitive to implement",
      "All operations are O(1) - extremely fast",
      "Memory efficient for its use cases",
      "Perfect for LIFO scenarios",
      "Easy to implement with arrays or linked lists"
    ],
    cons: [
      "Limited access - only top element accessible",
      "No random access to elements",
      "Fixed size if using array (can overflow)",
      "Not suitable when you need to access middle elements",
      "Memory overhead if using linked list implementation"
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{example.title}</h1>
          <Badge variant="secondary">{example.difficulty.charAt(0).toUpperCase() + example.difficulty.slice(1)}</Badge>
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
            Code Examples
          </CardTitle>
          <CardDescription>Stack implementation with practical examples</CardDescription>
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
          <CardDescription>Where stacks are essential</CardDescription>
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
