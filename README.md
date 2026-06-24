# task-manager-api
Here’s a complete **README.md** for your project based on everything you’ve built so far, plus planned improvements.

You can directly copy this into a `README.md` file in your GitHub repo.

---

# Task Manager Dashboard 🚀

A full-stack Task Manager application built using **MongoDB, Express.js, React, and Node.js (MERN Stack)**.

This application helps users manage daily tasks with features like:

* Create tasks
* View tasks
* Update tasks
* Delete tasks
* Mark tasks as completed
* Analytics dashboard
* Search, filters, pagination

---

# Project Overview

This project is a productivity management system where users can create and track tasks.

It allows:

* Students to manage study tasks
* Employees to track office work
* Individuals to organize daily routines

Example tasks:

* Learn Node.js
* Complete AI Project
* Attend Team Meeting
* Submit Assignment

---

# Tech Stack

## Frontend

* React.js
* Vite
* CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Tools

* Postman
* VS Code
* Git & GitHub

---

# Project Structure

```bash
task-manager-api/
│
├── controllers/
│   ├── taskController.js
│
├── middleware/
│   ├── validateTask.js
│
├── models/
│   ├── Task.js
│
├── routes/
│   ├── taskRoutes.js
│
├── server.js
├── .env
├── package.json
```

Frontend:

```bash
task-manager-frontend/
│
├── src/
│   ├── components/
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── Analytics.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

---

# Features Implemented ✅

## Backend Features

* REST API
* MongoDB integration
* MVC architecture
* Joi validation
* CRUD operations
* Task categories
* Task priorities
* Search
* Filtering
* Pagination
* Analytics API

---

## Frontend Features

* Task Dashboard UI
* Add Task
* Delete Task
* Complete Task
* Analytics Cards
* Responsive UI

---

# Task Schema

```json
{
  "id": 1,
  "title": "Learn React",
  "description": "Frontend development",
  "status": "pending",
  "priority": "high",
  "category": "study",
  "dueDate": "2026-07-01"
}
```

---

# API Endpoints

## Create Task

```http
POST /api/tasks
```

Input:

```json
{
  "title": "Learn React",
  "status": "pending",
  "priority": "high",
  "category": "study"
}
```

Output:

```json
{
  "id": 1,
  "title": "Learn React",
  "status": "pending",
  "priority": "high",
  "category": "study"
}
```

---

## Get All Tasks

```http
GET /api/tasks
```

Output:

```json
[
  {
    "id": 1,
    "title": "Learn React"
  }
]
```

---

## Get Task by ID

```http
GET /api/tasks/1
```

---

## Update Task

```http
PUT /api/tasks/1
```

Example:

```json
{
  "status": "completed"
}
```

---

## Delete Task

```http
DELETE /api/tasks/1
```

---

## Search Task

```http
GET /api/tasks?search=react
```

---

## Filter Tasks

```http
GET /api/tasks?priority=high
```

Examples:

```http
GET /api/tasks?status=pending
GET /api/tasks?category=study
```

---

## Pagination

```http
GET /api/tasks?page=1&limit=5
```

Example output:

```json
{
  "totalTasks": 50,
  "currentPage": 1,
  "totalPages": 10,
  "tasks": []
}
```

---

## Analytics API

```http
GET /api/tasks/analytics
```

Output:

```json
{
  "totalTasks": 20,
  "completedTasks": 8,
  "pendingTasks": 12
}
```

---

# How to Run Project

---

## Backend Setup

Install dependencies:

```bash
npm install
```

Create `.env`

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskdb
```

Run backend:

```bash
node server.js
```

Backend runs on:

```bash
http://localhost:3000
```

---

## Frontend Setup

Move to frontend:

```bash
cd task-manager-frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Project Flow

## Step 1

User enters task in frontend

Example:

```text
Learn React
```

↓

## Step 2

Frontend sends request to backend

```http
POST /api/tasks
```

↓

## Step 3

Backend validates request using Joi

↓

## Step 4

Task stored in MongoDB

↓

## Step 5

Frontend fetches updated tasks

```http
GET /api/tasks
```

↓

## Step 6

Task shown in dashboard

---

# Example Workflow

### Add Task

Input:

```text
Learn React
```

Result:

```text
Task added successfully
```

---

### Complete Task

Before:

```text
Status: Pending
```

After clicking Complete:

```text
Status: Completed
```

---

### Delete Task

Task removed from UI and database.

---

# Current UI Features

* Task Cards
* Analytics Cards
* Complete Button
* Delete Button
* Priority Labels
* Status Badges

---

# Remaining Improvements 🚀

## Backend

* JWT Authentication
* User Login / Signup
* User-specific tasks
* Role-based access
* Error logging
* Unit testing

---

## Frontend

* Edit Task
* Search Bar
* Filter Dropdown
* Dark Mode
* Charts
* Toast Notifications
* Better Mobile UI

---

# Future Improvements

### AI Features

* AI task recommendation
* Task priority suggestion
* Smart deadline prediction

Example:

```text
This task is high priority based on deadline.
```

---

# Deployment Plan

Frontend:

* [Vercel](https://vercel.com?utm_source=chatgpt.com)
* [Netlify](https://www.netlify.com?utm_source=chatgpt.com)

Backend:

* [Render](https://render.com?utm_source=chatgpt.com)
* [Railway](https://railway.app?utm_source=chatgpt.com)

Database:

* [MongoDB Atlas](https://www.mongodb.com/atlas?utm_source=chatgpt.com)

---

# Learning Outcomes

Through this project I learned:

* MERN Stack development
* REST API development
* MongoDB integration
* MVC architecture
* Frontend-backend integration
* State management in React
* CRUD operations
* Analytics dashboards

---

# Author

**Monika B G**
Aspiring Gen AI Engineer | Python | SQL | Machine Learning | Data Analytics | Power BI | Generative AI

