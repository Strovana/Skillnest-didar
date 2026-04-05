# SkillNest — Deployment Guide

## Architecture Overview

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│   WordPress Site    │     │   React Frontend    │     │  Express Backend    │
│   (Hostinger)       │────▶│   (Vercel)          │────▶│  (Render)           │
│   Marketing pages   │     │   /api proxy →      │     │   REST API          │
│   Free plan OK      │     │   Vercel free plan  │     │   Free plan OK      │
└─────────────────────┘     └─────────────────────┘     └──────────┬──────────┘
                                                                    │
                                                         ┌──────────▼──────────┐
                                                         │   MongoDB Atlas     │
                                                         │   (Free M0 cluster) │
                                                         └─────────────────────┘
```

---

## Part 1 — MongoDB Atlas (Database)

1. Go to **https://cloud.mongodb.com** and create a free account
2. Click **"Build a Database"** → choose **M0 Free** tier
3. Select any cloud region (e.g. AWS Mumbai for India)
4. Create a **database user**:
   - Username: `skillnest_admin`
   - Password: generate a strong one, save it
5. Under **Network Access** → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`)
6. Click **Connect** → **Drivers** → copy the connection string:
   ```
   mongodb+srv://skillnest_admin:<password>@cluster0.xxxxx.mongodb.net/skillnest
   ```
7. Replace `<password>` with your actual password — this is your `MONGO_URI`

---

## Part 2 — Backend on Render

### Setup
1. Push your code to **GitHub** (create a new repo, push the `skillnest/` folder)
2. Go to **https://render.com** → Sign up (free)
3. Click **"New +"** → **Web Service**
4. Connect your GitHub repo
5. Configure the service:

| Setting | Value |
|---------|-------|
| **Name** | skillnest-api |
| **Root Directory** | `backend` |
| **Environment** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

6. Click **"Advanced"** → Add Environment Variables:

| Key | Value |
|-----|-------|
| `MONGO_URI` | your MongoDB Atlas connection string |
| `JWT_SECRET` | any long random string (e.g. `sk_nest_2024_super_secret_xyz`) |
| `CLIENT_URL` | `https://skillnest.vercel.app` (your Vercel URL — fill after step 3) |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |

7. Click **Deploy**. First deploy takes ~3 minutes.
8. Copy your Render URL: `https://skillnest-api.onrender.com`

### Seed the database
After deploy, go to Render **Shell** tab and run:
```bash
node seed.js
```
This creates admin + student accounts and 6 sample courses.

> **Note:** Free Render instances sleep after 15 mins of inactivity. First request after sleep takes ~30s. Upgrade to Starter ($7/mo) to avoid this.

---

## Part 3 — Frontend on Vercel

### Update vite.config.js for production
Replace the proxy in `frontend/vite.config.js`:
```js
export default defineConfig({
  plugins: [react()],
  // Remove the proxy block — Vercel uses env var instead
})
```

### Update API calls
Create `frontend/.env.production`:
```
VITE_API_URL=https://skillnest-api.onrender.com
```

Create `frontend/src/api.js`:
```js
import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || ''
})
export default api
```

Then replace all `axios.get('/api/...')` calls with `api.get('/api/...')` across your pages.

### Deploy to Vercel
1. Go to **https://vercel.com** → Sign up with GitHub
2. Click **"New Project"** → Import your repo
3. Configure:

| Setting | Value |
|---------|-------|
| **Root Directory** | `frontend` |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

4. Add **Environment Variable**:
   - `VITE_API_URL` = `https://skillnest-api.onrender.com`

5. Click **Deploy**. Takes ~1 minute.
6. Your frontend URL: `https://skillnest-[hash].vercel.app`

### Fix Vercel routing (SPA fix)
Create `frontend/public/vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
This ensures React Router works on page refresh.

---

## Part 4 — WordPress on Hostinger

### Steps
1. Log into **hPanel** at https://hpanel.hostinger.com
2. Go to **Websites** → your site → **Auto Installer**
3. Select **WordPress** → Install
4. Set:
   - Site Title: `SkillNest`
   - Admin Email: your email
   - Admin Username: `skillnest_admin`
   - Password: strong password
5. Wait ~1 minute for installation
6. Access admin at: `https://yourdomain.com/wp-admin`

### Configure (follow WORDPRESS_GUIDE.md)
- Install **Astra** theme
- Install **Elementor**, **WPForms**, **Yoast SEO**
- Create: Home, About, Courses, Contact pages
- Set static homepage: Settings → Reading → Static Page
- Add nav menu: Appearance → Menus

---

## Part 5 — Final Checklist

### Backend (Render)
- [ ] Server returns 200 at `https://skillnest-api.onrender.com/api/health`
- [ ] `/api/auth/login` works with seeded credentials
- [ ] CORS allows your Vercel frontend URL
- [ ] Seed script ran successfully

### Frontend (Vercel)
- [ ] Landing page loads at your Vercel URL
- [ ] Login/Register works
- [ ] Course listing fetches from backend
- [ ] Enroll button works and shows in dashboard
- [ ] Admin dashboard CRUD works
- [ ] `vercel.json` in place (no 404 on refresh)

### WordPress (Hostinger)
- [ ] All 4 pages created (Home, About, Courses, Contact)
- [ ] Nav menu configured
- [ ] Contact form works (WPForms)
- [ ] "Launch App" button links to Vercel URL
- [ ] Yoast SEO meta set for each page

---

## Submission Deliverables

Fill this in before submitting:

```
Live URLs:
  Frontend (MERN): https://skillnest-[hash].vercel.app
  Backend API:     https://skillnest-api.onrender.com
  WordPress Site:  https://yourdomain.hostinger.com

GitHub Repository: https://github.com/[username]/skillnest

Admin Credentials:
  Email:    admin@skillnest.com
  Password: admin123

Test Student Credentials:
  Email:    student@skillnest.com
  Password: student123
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Backend 502 on Render | Check logs → verify MONGO_URI is correct |
| CORS error on frontend | Add frontend URL to `CLIENT_URL` env var on Render |
| Page 404 on Vercel refresh | Add `vercel.json` with rewrite rule |
| WordPress emails not sending | Install WP Mail SMTP plugin |
| Render backend slow first load | Normal on free tier (cold start) — warn in video |
| MongoDB connection refused | Check Network Access → allow `0.0.0.0/0` in Atlas |
