'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Database, CheckCircle2, XCircle, Code2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function HashTablesPage() {
  const example = {
    title: "Hash Table (Hash Map)",
    difficulty: "intermediate",
    description: "A data structure that maps keys to values using a hash function for O(1) average-case access",
    explanation: `A hash table stores key-value pairs and uses a hash function to compute an index where the value should be stored. This enables extremely fast lookups, insertions, and deletions.

**How It Works:**
1. **Hash Function**: Converts key to an integer index
2. **Bucket Array**: Stores values at computed indices
3. **Collision Handling**: Resolves when two keys hash to same index

**Collision Resolution Methods:**
1. **Chaining**: Store multiple items at same index using linked lists
2. **Open Addressing**: Find next available slot (linear probing, quadratic probing)
3. **Double Hashing**: Use second hash function

**Key Operations:**
- **Insert**: O(1) average - Add key-value pair
- **Search**: O(1) average - Find value by key
- **Delete**: O(1) average - Remove key-value pair
- **Worst Case**: O(n) when many collisions occur`,
    time_complexity: "O(1) average for insert/search/delete, O(n) worst case",
    space_complexity: "O(n) where n is number of key-value pairs",
    code_example: `# Hash Table Implementation with Chaining
class HashNode:
    """Node for chaining in hash table"""
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None

class HashTable:
    """Hash Table with separate chaining for collision resolution"""
    def __init__(self, capacity=10):
        self.capacity = capacity
        self.size = 0
        self.buckets = [None] * capacity
    
    def _hash(self, key):
        """Hash function to compute index"""
        return hash(key) % self.capacity
    
    def insert(self, key, value):
        """Insert key-value pair - O(1) average"""
        index = self._hash(key)
        node = self.buckets[index]
        
        # Check if key already exists
        while node:
            if node.key == key:
                node.value = value  # Update existing
                return
            node = node.next
        
        # Insert new node at beginning
        new_node = HashNode(key, value)
        new_node.next = self.buckets[index]
        self.buckets[index] = new_node
        self.size += 1
        
        # Resize if load factor > 0.7
        if self.size / self.capacity > 0.7:
            self._resize()
    
    def get(self, key):
        """Get value by key - O(1) average"""
        index = self._hash(key)
        node = self.buckets[index]
        
        while node:
            if node.key == key:
                return node.value
            node = node.next
        
        raise KeyError(f"Key '{key}' not found")
    
    def delete(self, key):
        """Delete key-value pair - O(1) average"""
        index = self._hash(key)
        node = self.buckets[index]
        prev = None
        
        while node:
            if node.key == key:
                if prev:
                    prev.next = node.next
                else:
                    self.buckets[index] = node.next
                self.size -= 1
                return True
            prev = node
            node = node.next
        
        return False
    
    def contains(self, key):
        """Check if key exists - O(1) average"""
        try:
            self.get(key)
            return True
        except KeyError:
            return False
    
    def keys(self):
        """Get all keys"""
        all_keys = []
        for bucket in self.buckets:
            node = bucket
            while node:
                all_keys.append(node.key)
                node = node.next
        return all_keys
    
    def values(self):
        """Get all values"""
        all_values = []
        for bucket in self.buckets:
            node = bucket
            while node:
                all_values.append(node.value)
                node = node.next
        return all_values
    
    def _resize(self):
        """Resize hash table when load factor is high"""
        old_buckets = self.buckets
        self.capacity *= 2
        self.buckets = [None] * self.capacity
        self.size = 0
        
        for bucket in old_buckets:
            node = bucket
            while node:
                self.insert(node.key, node.value)
                node = node.next

# Example 1: Basic Operations
ht = HashTable()
ht.insert("name", "Alice")
ht.insert("age", 30)
ht.insert("city", "New York")

print(f"Name: {ht.get('name')}")  # Alice
print(f"Age: {ht.get('age')}")    # 30

ht.delete("age")
print(f"Contains age: {ht.contains('age')}")  # False
print(f"All keys: {ht.keys()}")

# Example 2: Word Frequency Counter
def word_frequency(text):
    """Count word frequencies using hash table"""
    ht = HashTable()
    words = text.lower().split()
    
    for word in words:
        if ht.contains(word):
            ht.insert(word, ht.get(word) + 1)
        else:
            ht.insert(word, 1)
    
    return ht

text = "hello world hello python python python"
freq = word_frequency(text)
for word in freq.keys():
    print(f"{word}: {freq.get(word)}")

# Example 3: Two Sum Problem using Hash Table
def two_sum(nums, target):
    """Find two numbers that sum to target"""
    ht = HashTable()
    
    for i, num in enumerate(nums):
        complement = target - num
        if ht.contains(complement):
            return [ht.get(complement), i]
        ht.insert(num, i)
    
    return None

nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Indices: {result}")  # [0, 1]

# Example 4: LRU Cache using Hash Table
class LRUCache:
    """Least Recently Used Cache"""
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = HashTable(capacity)
        self.order = []
    
    def get(self, key):
        """Get value and mark as recently used"""
        if self.cache.contains(key):
            self.order.remove(key)
            self.order.append(key)
            return self.cache.get(key)
        return None
    
    def put(self, key, value):
        """Put value in cache"""
        if self.cache.contains(key):
            self.order.remove(key)
        elif len(self.order) >= self.capacity:
            # Remove least recently used
            lru_key = self.order.pop(0)
            self.cache.delete(lru_key)
        
        self.cache.insert(key, value)
        self.order.append(key)

cache = LRUCache(2)
cache.put("a", 1)
cache.put("b", 2)
print(cache.get("a"))  # 1
cache.put("c", 3)  # Evicts "b"
print(cache.get("b"))  # None`,
    use_cases: [
      "Database indexing and caching",
      "Implementing dictionaries/maps in programming languages",
      "Symbol tables in compilers",
      "Counting frequencies (word count, character count)",
      "Removing duplicates from datasets",
      "Caching computed results (memoization)",
      "DNS lookup tables",
      "Session management in web applications"
    ],
    pros: [
      "Extremely fast O(1) average-case operations",
      "Flexible key types (strings, numbers, objects)",
      "Efficient for lookups and insertions",
      "Built-in to most programming languages",
      "Ideal for caching and memoization"
    ],
    cons: [
      "No ordering of elements",
      "Hash function quality affects performance",
      "Collision handling adds complexity",
      "O(n) worst case with poor hash function",
      "Extra memory for hash table structure",
      "Resizing operation can be expensive"
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
            Hash Table Implementation
          </CardTitle>
          <CardDescription>Complete implementation with collision handling and practical examples</CardDescription>
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
          <CardDescription>Where hash tables are essential</CardDescription>
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
