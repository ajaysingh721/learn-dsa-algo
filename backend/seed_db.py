from sqlalchemy.orm import Session
from app.database import SessionLocal, Base, engine
from app.models import Category, Example, Algorithm, CategoryType, DifficultyLevel
import json

# Create tables
Base.metadata.create_all(bind=engine)

def seed_database():
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(Category).count() > 0:
            print("Database already seeded!")
            return
        
        # Data Structures Categories
        ds_categories = [
            {
                "name": "Arrays", "slug": "arrays", 
                "description": "Linear data structure that stores elements in contiguous memory locations",
                "type": CategoryType.DATA_STRUCTURE, "icon": "table", "order": 1
            },
            {
                "name": "Linked Lists", "slug": "linked-lists",
                "description": "Linear data structure where elements are stored in nodes with pointers",
                "type": CategoryType.DATA_STRUCTURE, "icon": "link", "order": 2
            },
            {
                "name": "Stacks", "slug": "stacks",
                "description": "LIFO (Last In First Out) data structure",
                "type": CategoryType.DATA_STRUCTURE, "icon": "layers", "order": 3
            },
            {
                "name": "Queues", "slug": "queues",
                "description": "FIFO (First In First Out) data structure",
                "type": CategoryType.DATA_STRUCTURE, "icon": "list", "order": 4
            },
            {
                "name": "Trees", "slug": "trees",
                "description": "Hierarchical data structure with root and children nodes",
                "type": CategoryType.DATA_STRUCTURE, "icon": "git-branch", "order": 5
            },
            {
                "name": "Graphs", "slug": "graphs",
                "description": "Non-linear data structure with nodes and edges",
                "type": CategoryType.DATA_STRUCTURE, "icon": "network", "order": 6
            },
            {
                "name": "Hash Tables", "slug": "hash-tables",
                "description": "Data structure that maps keys to values using hash functions",
                "type": CategoryType.DATA_STRUCTURE, "icon": "hash", "order": 7
            },
            {
                "name": "Heaps", "slug": "heaps",
                "description": "Complete binary tree satisfying heap property",
                "type": CategoryType.DATA_STRUCTURE, "icon": "triangle", "order": 8
            }
        ]
        
        # Algorithm Categories
        algo_categories = [
            {
                "name": "Sorting", "slug": "sorting",
                "description": "Algorithms to arrange elements in order",
                "type": CategoryType.ALGORITHM, "icon": "arrow-up-down", "order": 9
            },
            {
                "name": "Searching", "slug": "searching",
                "description": "Algorithms to find elements in data structures",
                "type": CategoryType.ALGORITHM, "icon": "search", "order": 10
            },
            {
                "name": "Dynamic Programming", "slug": "dynamic-programming",
                "description": "Optimization technique using memoization",
                "type": CategoryType.ALGORITHM, "icon": "zap", "order": 11
            },
            {
                "name": "Greedy", "slug": "greedy",
                "description": "Algorithms that make locally optimal choices",
                "type": CategoryType.ALGORITHM, "icon": "target", "order": 12
            },
            {
                "name": "Graph Algorithms", "slug": "graph-algorithms",
                "description": "Algorithms for traversing and analyzing graphs",
                "type": CategoryType.ALGORITHM, "icon": "share-2", "order": 13
            }
        ]
        
        # Add categories
        for cat_data in ds_categories + algo_categories:
            category = Category(**cat_data)
            db.add(category)
        
        db.commit()
        
        # Add some example data structures
        arrays_cat = db.query(Category).filter(Category.slug == "arrays").first()
        
        array_example = Example(
            title="Dynamic Array (List)",
            slug="dynamic-array",
            category_id=arrays_cat.id,
            description="A resizable array that grows automatically when elements are added",
            explanation="Dynamic arrays start with a fixed size and double their capacity when they become full. This amortizes the cost of insertions.",
            time_complexity="O(1) average for append, O(n) for insert at position",
            space_complexity="O(n)",
            difficulty=DifficultyLevel.BEGINNER,
            code_example="""# Dynamic Array Example
class DynamicArray:
    def __init__(self):
        self.array = []
    
    def append(self, item):
        self.array.append(item)
    
    def get(self, index):
        return self.array[index]
    
    def size(self):
        return len(self.array)

# Usage
arr = DynamicArray()
arr.append(1)
arr.append(2)
arr.append(3)
print(f"Size: {arr.size()}")  # Output: 3
print(f"Element at index 1: {arr.get(1)}")  # Output: 2
""",
            use_cases=json.dumps([
                "Storing collections of items",
                "Implementing other data structures",
                "Database record storage",
                "Image processing (pixel arrays)"
            ]),
            pros=json.dumps([
                "Fast random access O(1)",
                "Cache-friendly due to contiguous memory",
                "Simple to implement and use"
            ]),
            cons=json.dumps([
                "Insertions/deletions are expensive O(n)",
                "Fixed size (unless dynamic)",
                "Memory waste if not fully utilized"
            ])
        )
        db.add(array_example)
        
        # Add sorting algorithms
        sorting_cat = db.query(Category).filter(Category.slug == "sorting").first()
        
        # Bubble Sort
        bubble_sort = Algorithm(
            name="Bubble Sort",
            slug="bubble-sort",
            category="sorting",
            description="Simple comparison-based sorting algorithm",
            explanation="Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in wrong order. The pass through the list is repeated until the list is sorted.",
            pseudocode="""function bubbleSort(array):
    n = length(array)
    for i from 0 to n-1:
        for j from 0 to n-i-2:
            if array[j] > array[j+1]:
                swap array[j] with array[j+1]
""",
            python_code="""def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(arr)
print("Sorted array:", arr)
""",
            javascript_code="""function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
bubbleSort(arr);
console.log("Sorted array:", arr);
""",
            time_complexity_best="O(n)",
            time_complexity_average="O(n²)",
            time_complexity_worst="O(n²)",
            space_complexity="O(1)",
            difficulty=DifficultyLevel.BEGINNER,
            use_cases=json.dumps([
                "Educational purposes",
                "Small datasets",
                "Nearly sorted data",
                "Simple implementations"
            ])
        )
        db.add(bubble_sort)
        
        # Selection Sort
        selection_sort = Algorithm(
            name="Selection Sort",
            slug="selection-sort",
            category="sorting",
            description="Simple in-place comparison sorting algorithm",
            explanation="Selection Sort divides the array into sorted and unsorted regions. It repeatedly finds the minimum element from the unsorted region and moves it to the sorted region.",
            pseudocode="""function selectionSort(array):
    n = length(array)
    for i from 0 to n-1:
        minIndex = i
        for j from i+1 to n-1:
            if array[j] < array[minIndex]:
                minIndex = j
        swap array[i] with array[minIndex]
""",
            python_code="""def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
selection_sort(arr)
print("Sorted array:", arr)
""",
            javascript_code="""function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
selectionSort(arr);
console.log("Sorted array:", arr);
""",
            time_complexity_best="O(n²)",
            time_complexity_average="O(n²)",
            time_complexity_worst="O(n²)",
            space_complexity="O(1)",
            difficulty=DifficultyLevel.BEGINNER,
            use_cases=json.dumps([
                "Small datasets",
                "Memory-constrained systems",
                "Educational purposes",
                "When swapping is expensive"
            ])
        )
        db.add(selection_sort)
        
        # Insertion Sort
        insertion_sort = Algorithm(
            name="Insertion Sort",
            slug="insertion-sort",
            category="sorting",
            description="Simple sorting algorithm that builds final array one item at a time",
            explanation="Insertion Sort works by taking elements from the unsorted portion and inserting them at the correct position in the sorted portion.",
            pseudocode="""function insertionSort(array):
    for i from 1 to length(array)-1:
        key = array[i]
        j = i - 1
        while j >= 0 and array[j] > key:
            array[j+1] = array[j]
            j = j - 1
        array[j+1] = key
""",
            python_code="""def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
insertion_sort(arr)
print("Sorted array:", arr)
""",
            javascript_code="""function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
insertionSort(arr);
console.log("Sorted array:", arr);
""",
            time_complexity_best="O(n)",
            time_complexity_average="O(n²)",
            time_complexity_worst="O(n²)",
            space_complexity="O(1)",
            difficulty=DifficultyLevel.BEGINNER,
            use_cases=json.dumps([
                "Small datasets",
                "Nearly sorted data",
                "Online algorithms",
                "Adaptive sorting"
            ])
        )
        db.add(insertion_sort)
        
        # Merge Sort
        merge_sort = Algorithm(
            name="Merge Sort",
            slug="merge-sort",
            category="sorting",
            description="Efficient divide-and-conquer sorting algorithm",
            explanation="Merge Sort divides the array into two halves, recursively sorts them, and then merges the sorted halves. It's stable and guarantees O(n log n) performance.",
            pseudocode="""function mergeSort(array):
    if length(array) <= 1:
        return array
    
    mid = length(array) / 2
    left = mergeSort(array[0...mid])
    right = mergeSort(array[mid...end])
    
    return merge(left, right)

function merge(left, right):
    result = []
    while left and right not empty:
        if left[0] <= right[0]:
            append left[0] to result
        else:
            append right[0] to result
    append remaining elements
    return result
""",
            python_code="""def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = merge_sort(arr)
print("Sorted array:", sorted_arr)
""",
            javascript_code="""function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i), right.slice(j));
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
const sortedArr = mergeSort(arr);
console.log("Sorted array:", sortedArr);
""",
            time_complexity_best="O(n log n)",
            time_complexity_average="O(n log n)",
            time_complexity_worst="O(n log n)",
            space_complexity="O(n)",
            difficulty=DifficultyLevel.INTERMEDIATE,
            use_cases=json.dumps([
                "Large datasets",
                "External sorting",
                "Stable sorting required",
                "Linked list sorting"
            ])
        )
        db.add(merge_sort)
        
        # Heap Sort
        heap_sort = Algorithm(
            name="Heap Sort",
            slug="heap-sort",
            category="sorting",
            description="Comparison-based sorting using binary heap data structure",
            explanation="Heap Sort builds a max heap from the input data, then repeatedly extracts the maximum element and rebuilds the heap until sorted.",
            pseudocode="""function heapSort(array):
    buildMaxHeap(array)
    for i from length(array)-1 down to 1:
        swap array[0] with array[i]
        heapify(array, 0, i)

function buildMaxHeap(array):
    for i from length(array)/2 down to 0:
        heapify(array, i, length(array))

function heapify(array, i, size):
    largest = i
    left = 2*i + 1
    right = 2*i + 2
    
    if left < size and array[left] > array[largest]:
        largest = left
    if right < size and array[right] > array[largest]:
        largest = right
    
    if largest != i:
        swap array[i] with array[largest]
        heapify(array, largest, size)
""",
            python_code="""def heap_sort(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
heap_sort(arr)
print("Sorted array:", arr)
""",
            javascript_code="""function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
heapSort(arr);
console.log("Sorted array:", arr);
""",
            time_complexity_best="O(n log n)",
            time_complexity_average="O(n log n)",
            time_complexity_worst="O(n log n)",
            space_complexity="O(1)",
            difficulty=DifficultyLevel.INTERMEDIATE,
            use_cases=json.dumps([
                "Systems with limited memory",
                "Real-time systems",
                "Priority queues",
                "Graph algorithms"
            ])
        )
        db.add(heap_sort)
        
        # Counting Sort
        counting_sort = Algorithm(
            name="Counting Sort",
            slug="counting-sort",
            category="sorting",
            description="Non-comparison integer sorting algorithm",
            explanation="Counting Sort works by counting the number of objects having distinct key values, then calculating positions. It's efficient when the range of values is not significantly greater than the number of elements.",
            pseudocode="""function countingSort(array):
    max = maximum value in array
    count = array of size max+1, initialized to 0
    
    for each element in array:
        count[element]++
    
    for i from 1 to max:
        count[i] += count[i-1]
    
    output = array of same size
    for each element in array (in reverse):
        output[count[element]-1] = element
        count[element]--
    
    return output
""",
            python_code="""def counting_sort(arr):
    if not arr:
        return arr
    
    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1
    
    count = [0] * range_size
    output = [0] * len(arr)
    
    # Store count of each element
    for num in arr:
        count[num - min_val] += 1
    
    # Cumulative count
    for i in range(1, range_size):
        count[i] += count[i - 1]
    
    # Build output array
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    return output

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = counting_sort(arr)
print("Sorted array:", sorted_arr)
""",
            javascript_code="""function countingSort(arr) {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // Store count of each element
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Cumulative count
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    return output;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
const sortedArr = countingSort(arr);
console.log("Sorted array:", sortedArr);
""",
            time_complexity_best="O(n + k)",
            time_complexity_average="O(n + k)",
            time_complexity_worst="O(n + k)",
            space_complexity="O(n + k)",
            difficulty=DifficultyLevel.INTERMEDIATE,
            use_cases=json.dumps([
                "Small range of integers",
                "Suffix array construction",
                "Radix sort subroutine",
                "Histogram creation"
            ])
        )
        db.add(counting_sort)
        
        # Add searching algorithms
        searching_cat = db.query(Category).filter(Category.slug == "searching").first()
        
        # Linear Search
        linear_search = Algorithm(
            name="Linear Search",
            slug="linear-search",
            category="searching",
            description="Simple sequential search algorithm",
            explanation="Linear Search checks each element in the array sequentially until it finds the target element or reaches the end of the array.",
            pseudocode="""function linearSearch(array, target):
    for i from 0 to length(array)-1:
        if array[i] == target:
            return i
    return -1
""",
            python_code="""def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
target = 22
result = linear_search(arr, target)
if result != -1:
    print(f"Element found at index {result}")
else:
    print("Element not found")
""",
            javascript_code="""function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
const target = 22;
const result = linearSearch(arr, target);
if (result !== -1) {
    console.log(`Element found at index ${result}`);
} else {
    console.log("Element not found");
}
""",
            time_complexity_best="O(1)",
            time_complexity_average="O(n)",
            time_complexity_worst="O(n)",
            space_complexity="O(1)",
            difficulty=DifficultyLevel.BEGINNER,
            use_cases=json.dumps([
                "Small datasets",
                "Unsorted data",
                "Simple search requirements",
                "Finding first occurrence"
            ])
        )
        db.add(linear_search)
        
        # Binary Search
        binary_search = Algorithm(
            name="Binary Search",
            slug="binary-search",
            category="searching",
            description="Efficient search algorithm for sorted arrays",
            explanation="Binary Search divides the search interval in half repeatedly. It compares the target value with the middle element and eliminates half of the remaining elements each time.",
            pseudocode="""function binarySearch(array, target):
    left = 0
    right = length(array) - 1
    
    while left <= right:
        mid = (left + right) / 2
        if array[mid] == target:
            return mid
        else if array[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
""",
            python_code="""def binary_search(arr, target):
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

# Example usage
arr = [11, 12, 22, 25, 34, 64, 90]  # Must be sorted
target = 22
result = binary_search(arr, target)
if result != -1:
    print(f"Element found at index {result}")
else:
    print("Element not found")
""",
            javascript_code="""function binarySearch(arr, target) {
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
const arr = [11, 12, 22, 25, 34, 64, 90];  // Must be sorted
const target = 22;
const result = binarySearch(arr, target);
if (result !== -1) {
    console.log(`Element found at index ${result}`);
} else {
    console.log("Element not found");
}
""",
            time_complexity_best="O(1)",
            time_complexity_average="O(log n)",
            time_complexity_worst="O(log n)",
            space_complexity="O(1)",
            difficulty=DifficultyLevel.BEGINNER,
            use_cases=json.dumps([
                "Sorted arrays",
                "Database indexing",
                "Dictionary lookups",
                "Finding insertion points"
            ])
        )
        db.add(binary_search)
        
        # Quick Sort
        quick_sort = Algorithm(
            name="Quick Sort",
            slug="quick-sort",
            category="sorting",
            description="Efficient divide-and-conquer sorting algorithm",
            explanation="Quick Sort picks a pivot element and partitions the array around it, recursively sorting the subarrays. It's one of the fastest general-purpose sorting algorithms.",
            pseudocode="""function quickSort(array, low, high):
    if low < high:
        pivotIndex = partition(array, low, high)
        quickSort(array, low, pivotIndex - 1)
        quickSort(array, pivotIndex + 1, high)

function partition(array, low, high):
    pivot = array[high]
    i = low - 1
    for j = low to high - 1:
        if array[j] < pivot:
            i = i + 1
            swap array[i] with array[j]
    swap array[i + 1] with array[high]
    return i + 1
""",
            python_code="""def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
quick_sort(arr)
print("Sorted array:", arr)
""",
            javascript_code="""function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
quickSort(arr);
console.log("Sorted array:", arr);
""",
            time_complexity_best="O(n log n)",
            time_complexity_average="O(n log n)",
            time_complexity_worst="O(n²)",
            space_complexity="O(log n)",
            difficulty=DifficultyLevel.INTERMEDIATE,
            use_cases=json.dumps([
                "General-purpose sorting",
                "Operating system schedulers",
                "Database query optimization",
                "Numerical computations"
            ])
        )
        db.add(quick_sort)
        
        db.commit()
        print("Database seeded successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
