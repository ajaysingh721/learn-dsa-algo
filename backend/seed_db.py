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
        
        # Add sorting algorithm example
        sorting_cat = db.query(Category).filter(Category.slug == "sorting").first()
        
        quicksort_algo = Algorithm(
            name="Quick Sort",
            slug="quick-sort",
            category="sorting",
            description="Efficient divide-and-conquer sorting algorithm",
            explanation="Quick Sort picks a pivot element and partitions the array around it, recursively sorting the subarrays.",
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
            python_code="""def quick_sort(arr, low, high):
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)

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
quick_sort(arr, 0, len(arr) - 1)
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
        db.add(quicksort_algo)
        
        db.commit()
        print("Database seeded successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
