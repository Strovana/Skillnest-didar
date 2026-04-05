import { useState, useEffect } from 'react'
import api from '../api'
import CourseCard from '../components/CourseCard'
import { useAuth } from '../context/AuthContext'

const categories = ['All', 'Design', 'Development', 'Marketing', 'Business', 'Data Science', 'Photography', 'Music', 'Other']
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

export default function Courses() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [level, setLevel] = useState('All')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(t)
  }, [search])

  useEffect(() => {
    fetchCourses()
  }, [category, level, debouncedSearch])

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const params = {}
      if (category !== 'All') params.category = category
      if (level !== 'All') params.level = level
      if (debouncedSearch) params.search = debouncedSearch
      const { data } = await api.get('/api/courses', { params })
      setCourses(data.courses)
    } catch {
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  const enrolledIds = user?.enrolledCourses?.map(c => c._id || c) || []

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="section-tag mb-3">
            <span className="w-8 h-px bg-nest-500" />
            All Courses
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <h1 className="font-display font-bold text-4xl text-ink-100">
              Discover what to learn next
            </h1>
            <span className="text-ink-400 font-mono text-sm shrink-0">
              {courses.length} course{courses.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-11 text-base"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  category === cat
                    ? 'bg-nest-500 border-nest-500 text-white shadow-lg shadow-nest-500/20'
                    : 'bg-ink-800 border-ink-600 text-ink-300 hover:border-ink-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Levels */}
          <div className="flex gap-2">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200 ${
                  level === lvl
                    ? 'bg-ink-600 border-ink-400 text-ink-100'
                    : 'bg-transparent border-ink-700 text-ink-500 hover:border-ink-500 hover:text-ink-400'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-ink-800 border border-ink-700 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-ink-700" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-ink-700 rounded w-1/3" />
                  <div className="h-5 bg-ink-700 rounded w-3/4" />
                  <div className="h-4 bg-ink-700 rounded w-full" />
                  <div className="h-4 bg-ink-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display font-semibold text-xl text-ink-300 mb-2">No courses found</h3>
            <p className="text-ink-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                enrolled={enrolledIds.includes(course._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
