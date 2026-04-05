import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Loader from './components/Loader'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <Loader />
  return user ? children : <Navigate to="/login" replace />
}

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <Loader />
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />
  return children
}

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <Loader />
  return user ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  const { loading } = useAuth()
  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-ink-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
