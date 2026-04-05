import { useState, useEffect } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CourseCard from '../components/CourseCard'

export default function Dashboard() {
  const { user } = useAuth()
  const [dashData, setDashData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/users/dashboard')
      .then(({ data }) => setDashData(data.user))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const enrolled = dashData?.enrolledCourses || []
  const joinDate = dashData ? new Date(dashData.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : ''

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ink-600 border-t-nest-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-nest-500 to-nest-600 flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg shadow-nest-500/30">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-ink-500 font-mono text-sm mb-1">Welcome back</p>
            <h1 className="font-display font-bold text-3xl text-ink-100">{user?.name}</h1>
            <p className="text-ink-400 text-sm">{user?.email} · Member since {joinDate}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Enrolled Courses', value: enrolled.length, icon: '📚', color: 'from-nest-500/10 to-nest-500/5 border-nest-500/20' },
            { label: 'In Progress', value: enrolled.length, icon: '⚡', color: 'from-amber-500/10 to-amber-500/5 border-amber-500/20' },
            { label: 'Completed', value: 0, icon: '🏆', color: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20' }
          ].map(stat => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-5`}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="font-display font-bold text-3xl text-ink-100 mb-1">{stat.value}</div>
              <div className="text-ink-400 text-sm font-mono">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Enrolled Courses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-2xl text-ink-100">My Courses</h2>
            <Link to="/courses" className="text-nest-400 hover:text-nest-300 text-sm font-medium transition-colors">
              Browse more →
            </Link>
          </div>

          {enrolled.length === 0 ? (
            <div className="bg-ink-800 border border-ink-700 border-dashed rounded-2xl p-16 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="font-display font-semibold text-xl text-ink-300 mb-2">No courses yet</h3>
              <p className="text-ink-500 mb-6">Browse our catalog and enroll in your first course</p>
              <Link to="/courses" className="btn-primary">Browse Courses</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolled.map(course => (
                <CourseCard key={course._id} course={course} enrolled={true} />
              ))}
            </div>
          )}
        </div>

        {/* Account details */}
        <div className="mt-10 bg-ink-800 border border-ink-700 rounded-2xl p-6">
          <h3 className="font-display font-semibold text-ink-100 mb-4">Account Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Name', value: dashData?.name },
              { label: 'Email', value: dashData?.email },
              { label: 'Role', value: dashData?.role === 'admin' ? '⚡ Admin' : '👤 Student' },
              { label: 'Member Since', value: joinDate }
            ].map(item => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-xs font-mono text-ink-500 uppercase tracking-wider">{item.label}</span>
                <span className="text-ink-200 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          {user?.role === 'admin' && (
            <div className="mt-4 pt-4 border-t border-ink-700">
              <Link to="/admin" className="btn-primary text-sm py-2.5 inline-block">
                Go to Admin Dashboard →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
