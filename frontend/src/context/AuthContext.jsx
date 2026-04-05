import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('sn_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) fetchMe()
    else setLoading(false)
  }, [token])

  const fetchMe = async () => {
    try {
      const { data } = await api.get('/api/auth/me')
      setUser(data.user)
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password })
    localStorage.setItem('sn_token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data
  }

  const register = async (name, email, password) => {
    const { data } = await api.post('/api/auth/register', { name, email, password })
    localStorage.setItem('sn_token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data
  }

  const logout = () => {
    localStorage.removeItem('sn_token')
    setToken(null)
    setUser(null)
  }

  const refreshUser = async () => { await fetchMe() }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
