# Quick Start Guide

## Project Status

✅ **Project is fully set up and running!**

- Backend running on: http://localhost:8000
- Frontend running on: http://localhost:3001
- API Documentation: http://localhost:8000/docs

## What's Included

### Backend (FastAPI + SQLite)

- ✅ RESTful API with full CRUD operations
- ✅ SQLite database with pre-seeded data
- ✅ Models for Categories, Examples, and Algorithms
- ✅ Database includes 8 data structures and 5 algorithm categories
- ✅ Auto-generated API docs at `/docs`

### Frontend (Next.js 14 + Shadcn UI)

- ✅ Modern Next.js 14 App Router
- ✅ Shadcn UI components with Tailwind CSS
- ✅ Collapsible side navigation for all DSA topics
- ✅ Breadcrumb navigation
- ✅ Syntax-highlighted code examples
- ✅ Detailed pages for Arrays and Quick Sort (templates for others)
- ✅ Responsive design with dark mode support

## View the Application

1. **Home Page**: http://localhost:3001

   - Overview of all data structures and algorithms
   - Quick navigation cards

2. **Arrays Example**: http://localhost:3001/data-structures/arrays

   - Complete with code examples, complexity analysis
   - Pros/cons, use cases, and detailed explanations

3. **Quick Sort Algorithm**: http://localhost:3001/algorithms/sorting
   - Python and JavaScript implementations
   - Time/space complexity breakdown
   - Real-world applications

## Stopping the Servers

To stop the servers, press `Ctrl+C` in each terminal window.

## Next Steps

To add more content:

1. **Add More Data Structure Pages**: Create pages similar to `arrays/page.tsx` for:

   - Linked Lists
   - Stacks & Queues
   - Trees
   - Graphs
   - Hash Tables
   - Heaps

2. **Add More Algorithm Pages**: Create pages similar to `sorting/page.tsx` for:

   - Searching algorithms
   - Dynamic Programming
   - Greedy algorithms
   - Graph algorithms

3. **Connect to Real API**: The current pages use mock data. Update them to fetch from the backend API using the `lib/api.ts` functions.

4. **Add Visualizations**: Integrate visualization libraries like D3.js or React Flow for interactive algorithm animations.

## Project Structure

```
learn-dsa-algo/
├── backend/
│   ├── app/
│   │   ├── api/           # API routes (categories, examples, algorithms)
│   │   ├── models.py      # SQLAlchemy models
│   │   ├── schemas.py     # Pydantic schemas
│   │   └── database.py    # Database configuration
│   ├── main.py            # FastAPI application
│   ├── seed_db.py         # Database seeding script
│   └── dsa_learning.db    # SQLite database (auto-generated)
│
└── frontend/
    ├── app/
    │   ├── data-structures/  # Data structure pages
    │   ├── algorithms/       # Algorithm pages
    │   ├── layout.tsx        # Root layout with navigation
    │   └── page.tsx          # Home page
    ├── components/
    │   ├── ui/              # Shadcn UI components
    │   ├── side-nav.tsx     # Side navigation
    │   └── header.tsx       # Breadcrumb header
    └── lib/
        ├── api.ts           # API client functions
        └── utils.ts         # Utility functions
```

## Technologies Used

- **Backend**: Python 3.12, FastAPI, SQLAlchemy, SQLite, Uvicorn
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Code Highlighting**: react-syntax-highlighter
- **Icons**: Lucide React

Enjoy learning DSA! 🚀
