# Task Manager App
A full-stack task management application with an **Express.js backend** and a **React frontend**.  
Features include task creation, editing, deletion, search, and an endless carousel view for tasks.

---

## Setup & Installation
clone the project

### Backend Setup
- cd backend
- npm install
- npm start
  
The backend will start on port 4000

### Frontend Setup
- cd frontend
- npm install
- npm start
  
The frontend will start on port 3000

---

### Endpoints
- GET /api/tasks → Get all tasks
- POST /api/tasks → Create a new task
- PUT /api/tasks/:id → Update task by id
- DELETE /api/tasks/:id → Toggle completion status
- PATCH /api/tasks/:id/toggle → Delete task by id

#### Example Response
```bash
{
  "success": true,
  "data": {
    "id": 1,
    "title": "My Task",
    "description": "Optional details",
    "completed": false,
    "createdAt": "2025-09-03T09:00:00.000Z",
    "priority": "medium"
  }
}
```

---

### Assumptions and Design Decisions
- Tasks are stored in memory (array) and not persisted in a database, since persistence was not required for this assignment.  
- `description` is optional.  
- `priority` defaults to `"medium"` if not provided. 
- Basic task model: Limited to essential fields as specified 
- Used `PUT` for partial updates (instead of full replacement) to simplify client-side usage.  
- Implemented an endless carousel in the frontend using React hooks and vanilla JavaScript logic (no external carousel libraries).  
- Focused on clean code, error handling, and user-friendly UI.

---

### Time Breakdown
- **Backend Development (~80 minutes)**  
  - Express.js setup and middleware  
  - API endpoints implementation 
  - Validation and error handling  

- **Frontend Core Features (~110 minutes)**  
  - React components creation (TaskList, TaskItem, TaskForm, TaskFilter)  
  - Endless carousel implementation  
  - State management and API integration  

- **Styling & Polish (~30 minutes)**  
  - CSS design and responsive layout  
  - Priority indicators and hover effects  

- **Testing & Debugging (~20 minutes)**  
  - Manual API testing (Postman / curl)  
  - Fixing edge cases and improving error messages  








