import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-ink-700/60 bg-ink-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-nest-500 rounded-lg flex items-center justify-center shadow-lg shadow-nest-500/30">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" fillOpacity="0.9"/>
                <path d="M8 5L11 6.75V10.25L8 12L5 10.25V6.75L8 5Z" fill="white" fillOpacity="0.4"/>
              </svg>
            </div>
            <span className="font-display font-semibold text-lg text-ink-100">
              Skill<span className="text-nest-500">Nest</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/courses" className={`nav-link text-sm ${isActive('/courses') ? 'text-ink-100' : ''}`}>
              Courses
            </Link>
            {user && (
              <Link to="/dashboard" className={`nav-link text-sm ${isActive('/dashboard') ? 'text-ink-100' : ''}`}>
                Dashboard
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className={`nav-link text-sm ${isActive('/admin') ? 'text-ink-100' : ''}`}>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-nest-400 animate-pulse" />
                  Admin
                </span>
              </Link>
            )}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 px-3 py-1.5 bg-ink-800 rounded-xl border border-ink-600">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-nest-500 to-nest-600 flex items-center justify-center text-white text-xs font-display font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-ink-200 font-medium">{user.name.split(' ')[0]}</span>
                </div>
                <button onClick={handleLogout} className="btn-secondary text-sm py-2">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm py-2">Sign in</Link>
                <Link to="/register" className="btn-primary text-sm py-2">Get started</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-ink-400 hover:text-ink-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              {menuOpen
                ? <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                : <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-ink-700 bg-ink-900 px-4 py-4 flex flex-col gap-3">
          <Link to="/courses" onClick={() => setMenuOpen(false)} className="nav-link py-2">Courses</Link>
          {user && <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="nav-link py-2">Dashboard</Link>}
          {user?.role === 'admin' && <Link to="/admin" onClick={() => setMenuOpen(false)} className="nav-link py-2">Admin</Link>}
          <div className="border-t border-ink-700 pt-3 flex flex-col gap-2">
            {user ? (
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="btn-secondary w-full text-sm">Logout</button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-secondary text-sm text-center">Sign in</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-sm text-center">Get started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
