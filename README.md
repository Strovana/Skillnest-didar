# SkillNest — Mini Product Platform

> A full-stack MERN application for discovering short courses and workshops.

![SkillNest](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80)

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
        ├── components/ # Navbar, CourseCard, Loader
        ├── context/    # AuthContext (JWT state)
        └── pages/      # Landing, Login, Register, Courses,
                        # CourseDetail, Dashboard, AdminDashboard
```

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/skillnest
JWT_SECRET=your_random_secret_string
CLIENT_URL=http://localhost:5173
```

### 3. Seed the Database

```bash
cd backend
node seed.js
```

This creates:
- **Admin:** `admin@skillnest.com` / `admin123`
- **Student:** `student@skillnest.com` / `student123`
- **6 sample courses**

### 4. Run Both Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit: **http://localhost:5173**

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### Courses
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/courses` | Public | List all courses |
| GET | `/api/courses/:id` | Public | Single course |
| POST | `/api/courses` | Admin | Create course |
| PUT | `/api/courses/:id` | Admin | Update course |
| DELETE | `/api/courses/:id` | Admin | Delete course |
| POST | `/api/courses/:id/enroll` | User | Enroll in course |
| GET | `/api/courses/admin/all` | Admin | All courses (incl. drafts) |

### Users
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users/dashboard` | User | Dashboard data |
| GET | `/api/users` | Admin | All users |
| GET | `/api/users/stats` | Admin | User statistics |

---

## Deployment

### Backend → Render
1. Push code to GitHub
2. Create new **Web Service** on [render.com](https://render.com)
3. Set **Root Directory** → `backend`
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. Add environment variables (MONGO_URI, JWT_SECRET, CLIENT_URL)

### Frontend → Vercel
1. Create new project on [vercel.com](https://vercel.com)
2. Set **Root Directory** → `frontend`
3. Add environment variable:
   ```
   VITE_API_URL=https://your-render-backend.onrender.com
   ```
4. Update `vite.config.js` proxy target to your Render URL for production

---

## Features

- **JWT Authentication** — Secure register/login with token-based sessions
- **Role-based Access** — Student and Admin roles with protected routes
- **Course Catalog** — Browse, search, and filter courses by category/level
- **Enrollment System** — One-click enroll with dashboard tracking
- **Admin CRUD** — Full create/edit/delete course management
- **Responsive Design** — Mobile-first dark-themed UI

---

## Submission Details

- **GitHub Repo:** _your link here_
- **Live Frontend:** _your Vercel URL_
- **Live Backend:** _your Render URL_
- **Admin Login:** `admin@skillnest.com` / `admin123`
- **Student Login:** `student@skillnest.com` / `student123`
