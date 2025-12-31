'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, CheckCircle2, XCircle, Code2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function QueuesPage() {
  const example = {
    title: "Queue (FIFO)",
    difficulty: "beginner",
    description: "A First-In-First-Out (FIFO) data structure where elements are added at the rear and removed from the front",
    explanation: `A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Think of it like a line at a store - the first person in line is the first to be served.

**Core Operations:**
- **Enqueue**: O(1) - Add element to the rear
- **Dequeue**: O(1) - Remove and return front element
- **Front/Peek**: O(1) - View front element without removing
- **isEmpty**: O(1) - Check if queue is empty

**The FIFO Principle:**
The first element added to the queue is the first one to be removed. This makes queues perfect for managing resources in order of arrival.

**Types of Queues:**
1. **Simple Queue**: Basic FIFO queue
2. **Circular Queue**: Last position connects to first
3. **Priority Queue**: Elements dequeued by priority
4. **Double-ended Queue (Deque)**: Insert/remove from both ends`,
    time_complexity: "O(1) for enqueue and dequeue operations",
    space_complexity: "O(n) where n is number of elements",
    code_example: `# Queue Implementation using List
class Queue:
    """Queue implementation with array (list)"""
    def __init__(self):
        self.items = []
    
    def enqueue(self, item):
        """Add element to rear of queue - O(1)"""
        self.items.append(item)
    
    def dequeue(self):
        """Remove and return front element - O(n) due to list shift"""
        if self.is_empty():
            raise IndexError("Dequeue from empty queue")
        return self.items.pop(0)
    
    def front(self):
        """Return front element without removing - O(1)"""
        if self.is_empty():
            raise IndexError("Front from empty queue")
        return self.items[0]
    
    def is_empty(self):
        """Check if queue is empty - O(1)"""
        return len(self.items) == 0
    
    def size(self):
        """Return number of elements - O(1)"""
        return len(self.items)

# Optimized Queue using collections.deque
from collections import deque

class OptimizedQueue:
    """Efficient queue using deque - all operations O(1)"""
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        """Add element to rear - O(1)"""
        self.items.append(item)
    
    def dequeue(self):
        """Remove and return front element - O(1)"""
        if self.is_empty():
            raise IndexError("Dequeue from empty queue")
        return self.items.popleft()
    
    def front(self):
        """Return front element - O(1)"""
        if self.is_empty():
            raise IndexError("Front from empty queue")
        return self.items[0]
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

# Example 1: Basic Queue Operations
queue = OptimizedQueue()
queue.enqueue("Customer 1")
queue.enqueue("Customer 2")
queue.enqueue("Customer 3")

print(f"Now serving: {queue.dequeue()}")  # Customer 1
print(f"Next: {queue.front()}")           # Customer 2

# Example 2: Task Scheduler
class TaskScheduler:
    """Simple task scheduler using queue"""
    def __init__(self):
        self.tasks = OptimizedQueue()
    
    def add_task(self, task):
        """Add task to queue"""
        self.tasks.enqueue(task)
        print(f"Task added: {task}")
    
    def process_next_task(self):
        """Process the next task in queue"""
        if not self.tasks.is_empty():
            task = self.tasks.dequeue()
            print(f"Processing: {task}")
            return task
        print("No tasks to process")
        return None
    
    def pending_tasks(self):
        """Return number of pending tasks"""
        return self.tasks.size()

scheduler = TaskScheduler()
scheduler.add_task("Send emails")
scheduler.add_task("Generate report")
scheduler.add_task("Backup database")

scheduler.process_next_task()  # Processes "Send emails"
print(f"Pending: {scheduler.pending_tasks()}")  # Output: 2

# Example 3: Breadth-First Search (BFS) using Queue
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def bfs_traversal(root):
    """BFS traversal using queue"""
    if not root:
        return []
    
    result = []
    queue = OptimizedQueue()
    queue.enqueue(root)
    
    while not queue.is_empty():
        node = queue.dequeue()
        result.append(node.value)
        
        if node.left:
            queue.enqueue(node.left)
        if node.right:
            queue.enqueue(node.right)
    
    return result

# Create a binary tree
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

print("BFS Traversal:", bfs_traversal(root))
# Output: [1, 2, 3, 4, 5]

# Example 4: Circular Queue
class CircularQueue:
    """Circular queue with fixed capacity"""
    def __init__(self, capacity):
        self.capacity = capacity
        self.queue = [None] * capacity
        self.front = self.rear = -1
        self.size = 0
    
    def enqueue(self, item):
        if self.size == self.capacity:
            raise IndexError("Queue is full")
        
        if self.front == -1:
            self.front = 0
        
        self.rear = (self.rear + 1) % self.capacity
        self.queue[self.rear] = item
        self.size += 1
    
    def dequeue(self):
        if self.size == 0:
            raise IndexError("Queue is empty")
        
        item = self.queue[self.front]
        if self.front == self.rear:
            self.front = self.rear = -1
        else:
            self.front = (self.front + 1) % self.capacity
        
        self.size -= 1
        return item

cqueue = CircularQueue(3)
cqueue.enqueue(1)
cqueue.enqueue(2)
cqueue.enqueue(3)
print(cqueue.dequeue())  # 1
cqueue.enqueue(4)
print(cqueue.dequeue())  # 2`,
    use_cases: [
      "CPU task scheduling in operating systems",
      "Printer job queue management",
      "Breadth-First Search (BFS) in graphs and trees",
      "Request handling in web servers",
      "Message queues in distributed systems",
      "Call center systems (customer service)",
      "Buffering in I/O operations",
      "Playlist management in media players"
    ],
    pros: [
      "Maintains order - FIFO principle",
      "All operations are O(1) with proper implementation",
      "Fair resource allocation",
      "Simple and intuitive concept",
      "Perfect for task scheduling scenarios"
    ],
    cons: [
      "No random access to elements",
      "Limited access - only front and rear",
      "Simple list implementation has O(n) dequeue",
      "Fixed size in array-based circular queues",
      "Memory overhead in linked list implementation"
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
          <CardDescription>Multiple queue implementations with real-world examples</CardDescription>
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
          <CardDescription>Where queues are essential</CardDescription>
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
