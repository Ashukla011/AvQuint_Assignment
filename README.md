# MERN Stack Assignment Submission 

A responsive React + Tailwind CSS todo app inspired by the Deribble design. Built with functional components, hooks, form validation, API integration, search/filter, and pagination.

## Deploy Link 
 1. backend
    ```
         https://avquint-assignment.onrender.com/api
    ```
 4. fronend
    ```
       https://avquint-theta.vercel.app/login
    ```
## Features

- **3 Pages**: Login, Register, Dashboard
- **Task CRUD**: Add, Edit, Delete, Toggle status (pending → in progress → completed)
- **Form Validation**: react-hook-form with email, password strength, and task field rules
- **API Integration**: REST API at 
- **Search & Filter**: By title/description, status, priority, and category
- **Pagination**: Configurable page size (5, 10, 20) with page navigation
- **Responsive UI**: Mobile-first design with glassmorphism and purple gradient theme

## Tech Stack

- MERN Stack
- Tailwind CSS
  

## Getting Started

```bash
# Running backend server
cd backend
npm install
node server.js
```
```bash
# Running fronend
cd frondend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

Register a new account or sign in with your existing credentials.

## Screenshoot
### Signup
<img width="943" height="407" alt="signup" src="https://github.com/user-attachments/assets/423529d2-1875-42de-abf2-25ea5c20df64" />

### Login
<img width="948" height="403" alt="login" src="https://github.com/user-attachments/assets/eb836aff-8830-4ad6-90e5-7edd4aa8b8cd" />

### Dashboard for task management
<img width="950" height="379" alt="taskDashboard" src="https://github.com/user-attachments/assets/a035dc68-7ad5-424f-8bed-5d12613ed349" />

### Environment Variables

| Variable | Localhost | 
|----------|---------|
| `process.env.VITE_API_URL` | `http://localhost:5000/api` 

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and receive JWT |
| GET | `/tasks` | List tasks (with pagination & filters) |
| POST | `/tasks` | Create task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |
| PATCH | `/tasks/:id/status` | Toggle/update task status |

All task endpoints require `Authorization: Bearer <token>` header.
