import { Link } from 'react-router-dom'

const levelColors = {
  Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Advanced: 'bg-red-500/10 text-red-400 border-red-500/20'
}

const categoryIcons = {
  Design: '🎨',
  Development: '💻',
  Marketing: '📈',
  Business: '💼',
  'Data Science': '📊',
  Photography: '📷',
  Music: '🎵',
  Other: '📚'
}

export default function CourseCard({ course, enrolled }) {
  return (
    <Link to={`/courses/${course._id}`}>
      <div className="card group cursor-pointer h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative overflow-hidden h-44">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-ink-700 to-ink-800 flex items-center justify-center text-4xl">
              {categoryIcons[course.category] || '📚'}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`badge border ${levelColors[course.level]}`}>
              {course.level}
            </span>
          </div>
          {enrolled && (
            <div className="absolute top-3 right-3">
              <span className="badge bg-nest-500/20 text-nest-400 border border-nest-500/30">
                ✓ Enrolled
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-ink-400">{categoryIcons[course.category]} {course.category}</span>
          </div>
          <h3 className="font-display font-semibold text-ink-100 text-lg leading-snug mb-2 group-hover:text-nest-400 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-ink-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
            {course.description}
          </p>

          <div className="border-t border-ink-700 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-ink-400">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {course.rating || '4.5'}
              </span>
            </div>
            <div className="font-display font-bold text-ink-100">
              {course.price === 0 ? (
                <span className="text-emerald-400">Free</span>
              ) : (
                <span>₹{course.price.toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
