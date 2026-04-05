import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = (role) => {
    if (role === 'admin') setForm({ email: 'admin@skillnest.com', password: 'admin123' })
    else setForm({ email: 'student@skillnest.com', password: 'student123' })
  }

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md fade-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-nest-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-nest-500/30">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <h1 className="font-display font-bold text-3xl text-ink-100 mb-2">Welcome back</h1>
          <p className="text-ink-400">Sign in to continue learning</p>
        </div>

        {/* Demo credentials */}
        <div className="bg-ink-800/60 border border-ink-600 rounded-xl p-4 mb-6">
          <p className="text-xs font-mono text-ink-400 mb-2 uppercase tracking-wider">Quick Demo Login</p>
          <div className="flex gap-2">
            <button onClick={() => fillDemo('student')} className="flex-1 text-xs py-1.5 px-3 bg-ink-700 hover:bg-ink-600 text-ink-300 rounded-lg transition-colors border border-ink-600">
              Student
            </button>
            <button onClick={() => fillDemo('admin')} className="flex-1 text-xs py-1.5 px-3 bg-nest-500/10 hover:bg-nest-500/20 text-nest-400 rounded-lg transition-colors border border-nest-500/20">
              Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-ink-800 border border-ink-700 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-ink-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign in →'}
            </button>
          </form>
        </div>

        <p className="text-center text-ink-400 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-nest-400 hover:text-nest-300 font-medium transition-colors">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  )
}
