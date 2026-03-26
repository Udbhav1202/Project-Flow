# ProjectFlow – Task & Workflow Management Backend

## 📌 Overview

ProjectFlow is a backend system for managing projects and tasks with proper authentication, authorization, and workflow logic.

Users can:

- Register and login
- Create projects
- Create tasks inside projects
- Assign tasks to users
- Update task status (todo → in-progress → done)
- View tasks with pagination
- Enforce ownership and permissions

The project is built using clean architecture (controllers + services) with centralized error handling.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt (password hashing)

---

## ✨ Features

### Authentication
- User registration
- User login with JWT
- Protected routes

### Authorization
- Only project owner can create tasks
- Only assigned user can update task status

### Projects
- Create projects
- Fetch user’s projects

### Tasks
- Create tasks under projects
- Assign tasks to users
- Update task status
- Fetch tasks by project
- Pagination support

### Backend Architecture
- Controller → Service → Model pattern
- Async handler (no try/catch in controllers)
- Centralized error handling with AppError
- Input validation
- MongoDB populate for relations

---

## 📁 Folder Structure
controllers/
services/
models/
routes/
middlewares/
utils/


### Explanation:

- controllers → Handle HTTP requests and responses
- services → Business logic and rules
- models → Database schemas
- routes → API routes
- middlewares → Auth and error handling
- utils → Helpers (asyncHandler, AppError, etc.)

---

## 🚀 How to Run Locally

1. Clone the repository

2. Install dependencies
npm install

3. Create `.env` file
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

4. Start server
npm run dev

---

## 🧠 Learning Highlights

- JWT authentication & authorization
- Ownership-based access control
- One-to-many relationships (Project → Tasks)
- Pagination
- Clean backend architecture
- Centralized error handling

---

## 📌 Future Improvements

- Frontend (React)
- Activity logs
- AI features (task summarization / smart priority)
