# Learn DSA & Algorithms Platform

A comprehensive web application for learning Data Structures and Algorithms with interactive visualizations and practical examples.

## Features

- 🎯 Interactive DSA visualizations
- 📚 Rich educational content for each algorithm
- 🔍 Side navigation for easy browsing
- 🗺️ Breadcrumb navigation
- 💾 SQLite database for data persistence
- 🎨 Beautiful UI with Shadcn components

## Project Structure

```
learn-dsa-algo/
├── backend/              # Python FastAPI backend
│   ├── app/
│   │   ├── api/         # API routes
│   │   ├── models/      # Database models
│   │   ├── schemas/     # Pydantic schemas
│   │   └── database.py  # Database configuration
│   ├── requirements.txt
│   └── main.py
│
└── frontend/            # Next.js frontend
    ├── app/             # App router pages
    ├── components/      # React components
    ├── lib/             # Utilities
    └── public/          # Static assets
```

## Getting Started

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python main.py
```

The backend will run on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## Data Structures Covered

- Arrays & Strings
- Linked Lists
- Stacks & Queues
- Trees (Binary, BST, AVL, B-Trees)
- Graphs
- Hash Tables
- Heaps
- Tries

## Algorithms Covered

- Sorting (Bubble, Quick, Merge, Heap, etc.)
- Searching (Binary Search, DFS, BFS)
- Dynamic Programming
- Greedy Algorithms
- Divide and Conquer
- Graph Algorithms (Dijkstra, Kruskal, Prim, etc.)
- Backtracking

## License

MIT
