import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/AuthContext'

const levelColors = {
  Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Advanced: 'bg-red-500/10 text-red-400 border-red-500/20'
}

export default function CourseDetail() {
  const { id } = useParams()
  const { user, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const enrolledIds = user?.enrolledCourses?.map(c => c._id || c) || []
  const isEnrolled = enrolledIds.includes(id)

  useEffect(() => {
    api.get(`/api/courses/${id}`)
      .then(({ data }) => setCourse(data.course))
      .catch(() => navigate('/courses'))
      .finally(() => setLoading(false))
  }, [id])

  const handleEnroll = async () => {
    if (!user) { navigate('/login'); return }
    setEnrolling(true)
    setMessage('')
    setError('')
    try {
      await api.post(`/api/courses/${id}/enroll`)
      await refreshUser()
      setMessage('🎉 Successfully enrolled! Check your dashboard.')
    } catch (err) {
      setError(err.response?.data?.message || 'Enrollment failed.')
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ink-600 border-t-nest-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!course) return null

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero banner */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-ink-700 to-ink-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 pb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge bg-ink-800/80 text-ink-300 border border-ink-600">
              {course.category}
            </span>
            <span className={`badge border ${levelColors[course.level]}`}>
              {course.level}
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white leading-tight max-w-3xl">
            {course.title}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Instructor */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nest-500 to-nest-600 flex items-center justify-center text-white font-display font-bold">
                {course.instructor.charAt(0)}
              </div>
              <div>
                <p className="text-xs text-ink-500 font-mono uppercase tracking-wider">Instructor</p>
                <p className="text-ink-200 font-medium">{course.instructor}</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-ink-700">
              {[
                { label: 'Duration', value: course.duration },
                { label: 'Rating', value: `${course.rating || 4.5} ★` },
                { label: 'Students', value: (course.enrolledStudents?.length || 0).toString() },
                { label: 'Lessons', value: (course.lessons?.length || 0).toString() }
              ].map(s => (
                <div key={s.label}>
                  <p className="text-xs font-mono text-ink-500 uppercase tracking-wider mb-1">{s.label}</p>
                  <p className="font-display font-semibold text-ink-100">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-display font-semibold text-2xl text-ink-100 mb-4">About this course</h2>
              <p className="text-ink-300 leading-relaxed">{course.description}</p>
            </div>

            {/* Tags */}
            {course.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {course.tags.map(tag => (
                  <span key={tag} className="badge bg-ink-700 text-ink-400 border border-ink-600 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Lessons */}
            {course.lessons?.length > 0 && (
              <div>
                <h2 className="font-display font-semibold text-2xl text-ink-100 mb-4">Course Content</h2>
                <div className="space-y-2">
                  {course.lessons.map((lesson, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-ink-800 rounded-xl border border-ink-700 hover:border-ink-500 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-ink-700 flex items-center justify-center text-xs font-mono text-ink-400 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <span className="text-ink-200 text-sm">{lesson.title}</span>
                      </div>
                      <span className="text-xs font-mono text-ink-500 shrink-0 ml-4">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-ink-800 border border-ink-700 rounded-2xl p-6 space-y-5">
              <div className="text-center">
                <div className="font-display font-bold text-4xl text-ink-100 mb-1">
                  {course.price === 0 ? (
                    <span className="text-emerald-400">Free</span>
                  ) : (
                    `₹${course.price.toLocaleString()}`
                  )}
                </div>
                {course.price > 0 && <p className="text-ink-500 text-xs">One-time payment · Lifetime access</p>}
              </div>

              {message && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl px-4 py-3 text-center">
                  {message}
                </div>
              )}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 text-center">
                  {error}
                </div>
              )}

              {isEnrolled || message ? (
                <Link to="/dashboard" className="btn-secondary w-full text-center block">
                  Go to Dashboard →
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {enrolling ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enrolling...
                    </span>
                  ) : user ? 'Enroll Now' : 'Sign in to Enroll'}
                </button>
              )}

              <div className="space-y-3 pt-2 border-t border-ink-700">
                {[
                  { icon: '📅', text: `${course.duration} of content` },
                  { icon: '♾️', text: 'Lifetime access' },
                  { icon: '📱', text: 'Access on all devices' },
                  { icon: '🏆', text: 'Certificate on completion' }
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-ink-400">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
