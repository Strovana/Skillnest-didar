# SkillNest — Mini Product Platform

> A full-stack MERN application for discovering short courses and workshops.

![SkillNest](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80)

## Live Links

| | URL |
|--|--|
| **React App** | https://skillnest-didar.vercel.app |
| **Backend API** | https://skillnest-didar.onrender.com |
| **WordPress Site** | https://skillnestdidar.wordpress.com |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Project Structure

```
skillnest/
├── backend/
│   ├── models/         # Mongoose schemas (User, Course)
│   ├── routes/         # Express routes (auth, courses, users)
│   ├── middleware/     # JWT auth middleware
│   ├── seed.js         # Database seeder
│   └── server.js       # Entry point
└── frontend/
    └── src/
        ├── api.js      # Axios instance with auth interceptors
        ├── components/ # Navbar, CourseCard, Loader
        ├── context/    # AuthContext (JWT state)
        └── pages/      # Landing, Login, Register, Courses,
                        # CourseDetail, Dashboard, AdminDashboard
```

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier is fine)

### 1. Clone & install

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure the backend

```bash
cd backend
cp .env.example .env
# Fill in MONGO_URI, JWT_SECRET, CLIENT_URL
```

### 3. Seed the database

```bash
cd backend
node seed.js
```

Creates 6 sample courses and two demo accounts.

### 4. Start both servers

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Open **http://localhost:5173**

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Log in, returns JWT |
| GET | `/api/auth/me` | Bearer | Get current user |

### Courses
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/courses` | Public | List all courses |
| GET | `/api/courses/:id` | Public | Single course detail |
| POST | `/api/courses` | Admin | Create course |
| PUT | `/api/courses/:id` | Admin | Update course |
| DELETE | `/api/courses/:id` | Admin | Delete course |
| POST | `/api/courses/:id/enroll` | Bearer | Enroll in course |
| GET | `/api/courses/admin/all` | Admin | All courses incl. drafts |

### Users
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/users/dashboard` | Bearer | Enrolled courses + profile |
| GET | `/api/users` | Admin | All users |
| GET | `/api/users/stats` | Admin | User counts |

---

## Features

- JWT Authentication — register, login, persistent sessions
- Role-based access — Student and Admin, enforced server-side
- Course catalog — search by name, filter by category and level
- One-click enrollment — tracked in user dashboard
- Admin CRUD — create, edit, delete courses
- Responsive dark UI — mobile-first with Tailwind CSS
