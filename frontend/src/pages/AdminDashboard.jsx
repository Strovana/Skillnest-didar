import { useState, useEffect } from 'react'
import api from '../api'

const CATEGORIES = ['Design', 'Development', 'Marketing', 'Business', 'Data Science', 'Photography', 'Music', 'Other']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

const emptyForm = {
  title: '', description: '', instructor: '', category: 'Design',
  level: 'Beginner', duration: '', price: 0, thumbnail: '',
  tags: '', isPublished: true, rating: 4.5
}

export default function AdminDashboard() {
  const [courses, setCourses] = useState([])
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('courses')
  const [modal, setModal] = useState(null) // 'add' | 'edit'
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [coursesRes, usersRes, statsRes] = await Promise.all([
        api.get('/api/courses/admin/all'),
        api.get('/api/users'),
        api.get('/api/users/stats')
      ])
      setCourses(coursesRes.data.courses)
      setUsers(usersRes.data.users)
      setStats(statsRes.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const openAdd = () => {
    setForm(emptyForm)
    setEditId(null)
    setModal('form')
  }

  const openEdit = (course) => {
    setForm({
      ...course,
      tags: (course.tags || []).join(', ')
    })
    setEditId(course._id)
    setModal('form')
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this course permanently?')) return
    try {
      await api.delete(`/api/courses/${id}`)
      setCourses(courses.filter(c => c._id !== id))
      showToast('Course deleted')
    } catch {
      showToast('Delete failed')
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
      }
      if (editId) {
        const { data } = await api.put(`/api/courses/${editId}`, payload)
        setCourses(courses.map(c => c._id === editId ? data.course : c))
        showToast('Course updated ✓')
      } else {
        const { data } = await api.post('/api/courses', payload)
        setCourses([data.course, ...courses])
        showToast('Course created ✓')
      }
      setModal(null)
    } catch (err) {
      showToast(err.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const totalEnrolled = courses.reduce((sum, c) => sum + (c.enrolledStudents?.length || 0), 0)

  const adminStats = [
    { label: 'Total Courses', value: courses.length, icon: '📚', color: 'text-nest-400' },
    { label: 'Total Students', value: stats.totalUsers || 0, icon: '👥', color: 'text-blue-400' },
    { label: 'Total Enrollments', value: totalEnrolled, icon: '✅', color: 'text-emerald-400' },
    { label: 'Published', value: courses.filter(c => c.isPublished).length, icon: '🌐', color: 'text-amber-400' }
  ]

  return (
    <div className="pt-24 min-h-screen">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-ink-700 border border-ink-500 text-ink-100 px-5 py-3 rounded-xl shadow-xl font-medium animate-slide-in">
          {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="section-tag mb-2">
              <span className="w-6 h-px bg-nest-500" />
              Admin Panel
            </div>
            <h1 className="font-display font-bold text-4xl text-ink-100">Dashboard</h1>
          </div>
          <button onClick={openAdd} className="btn-primary">
            + New Course
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {adminStats.map(s => (
            <div key={s.label} className="bg-ink-800 border border-ink-700 rounded-2xl p-5">
              <div className={`text-2xl mb-2`}>{s.icon}</div>
              <div className={`font-display font-bold text-3xl mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-ink-400 text-sm font-mono">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-ink-800 border border-ink-700 rounded-xl p-1 w-fit mb-6">
          {[['courses', 'Courses'], ['users', 'Users']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === key ? 'bg-nest-500 text-white shadow-lg shadow-nest-500/20' : 'text-ink-400 hover:text-ink-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-ink-600 border-t-nest-500 rounded-full animate-spin" />
          </div>
        ) : tab === 'courses' ? (
          /* Courses Table */
          <div className="bg-ink-800 border border-ink-700 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink-700 bg-ink-800/80">
                    {['Course', 'Category', 'Level', 'Price', 'Students', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-mono text-ink-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-700">
                  {courses.map(course => (
                    <tr key={course._id} className="hover:bg-ink-700/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {course.thumbnail ? (
                            <img src={course.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-ink-700 flex items-center justify-center shrink-0 text-lg">📚</div>
                          )}
                          <span className="font-medium text-ink-200 text-sm max-w-[180px] truncate">{course.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-ink-400">{course.category}</td>
                      <td className="px-5 py-4">
                        <span className="badge bg-ink-700 text-ink-400 border border-ink-600 text-xs">{course.level}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-ink-200 font-mono">
                        {course.price === 0 ? <span className="text-emerald-400">Free</span> : `₹${course.price}`}
                      </td>
                      <td className="px-5 py-4 text-sm text-ink-300">{course.enrolledStudents?.length || 0}</td>
                      <td className="px-5 py-4">
                        <span className={`badge border text-xs ${course.isPublished ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-ink-700 text-ink-500 border-ink-600'}`}>
                          {course.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(course)}
                            className="px-3 py-1.5 text-xs font-medium text-ink-300 bg-ink-700 hover:bg-ink-600 rounded-lg border border-ink-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/20 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {courses.length === 0 && (
              <div className="text-center py-12 text-ink-500">
                <p className="font-mono text-sm">No courses yet. Create one above.</p>
              </div>
            )}
          </div>
        ) : (
          /* Users Table */
          <div className="bg-ink-800 border border-ink-700 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink-700 bg-ink-800/80">
                    {['Name', 'Email', 'Role', 'Enrolled', 'Joined'].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-mono text-ink-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-700">
                  {users.map(user => (
                    <tr key={user._id} className="hover:bg-ink-700/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nest-500 to-nest-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-ink-200 text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-ink-400 font-mono">{user.email}</td>
                      <td className="px-5 py-4">
                        <span className={`badge border text-xs ${user.role === 'admin' ? 'bg-nest-500/10 text-nest-400 border-nest-500/20' : 'bg-ink-700 text-ink-400 border-ink-600'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-ink-300">{user.enrolledCourses?.length || 0}</td>
                      <td className="px-5 py-4 text-sm text-ink-500 font-mono">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Course Form Modal */}
      {modal === 'form' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/80 backdrop-blur-sm">
          <div className="bg-ink-800 border border-ink-600 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-ink-700">
              <h2 className="font-display font-bold text-xl text-ink-100">
                {editId ? 'Edit Course' : 'New Course'}
              </h2>
              <button onClick={() => setModal(null)} className="text-ink-500 hover:text-ink-300 transition-colors text-xl">✕</button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-ink-300 mb-2">Course Title *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    className="input-field" placeholder="e.g. UI/UX Design Fundamentals" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-ink-300 mb-2">Description *</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    className="input-field resize-none" rows={3} placeholder="Course description..." required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-300 mb-2">Instructor *</label>
                  <input value={form.instructor} onChange={e => setForm({...form, instructor: e.target.value})}
                    className="input-field" placeholder="Instructor name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-300 mb-2">Duration *</label>
                  <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})}
                    className="input-field" placeholder="e.g. 6 weeks" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-300 mb-2">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="input-field">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-300 mb-2">Level</label>
                  <select value={form.level} onChange={e => setForm({...form, level: e.target.value})}
                    className="input-field">
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-300 mb-2">Price (₹)</label>
                  <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                    className="input-field" min="0" placeholder="0 for free" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-300 mb-2">Rating (0–5)</label>
                  <input type="number" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})}
                    className="input-field" min="0" max="5" step="0.1" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-ink-300 mb-2">Thumbnail URL</label>
                  <input value={form.thumbnail} onChange={e => setForm({...form, thumbnail: e.target.value})}
                    className="input-field" placeholder="https://images.unsplash.com/..." />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-ink-300 mb-2">Tags (comma-separated)</label>
                  <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})}
                    className="input-field" placeholder="react, javascript, web" />
                </div>
                <div className="sm:col-span-2 flex items-center gap-3">
                  <input type="checkbox" id="published" checked={form.isPublished}
                    onChange={e => setForm({...form, isPublished: e.target.checked})}
                    className="w-4 h-4 accent-nest-500" />
                  <label htmlFor="published" className="text-sm text-ink-300">Published (visible to students)</label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-60">
                  {saving ? 'Saving...' : editId ? 'Update Course' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
