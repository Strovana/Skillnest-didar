import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api'
import CourseCard from '../components/CourseCard'

const stats = [
  { value: '6+', label: 'Expert Courses' },
  { value: '500+', label: 'Active Students' },
  { value: '4.8★', label: 'Avg. Rating' },
  { value: '100%', label: 'Self-paced' }
]

const features = [
  {
    icon: '⚡',
    title: 'Learn at Your Pace',
    desc: 'Short, focused workshops designed to fit into your schedule — no fluff, just skills.'
  },
  {
    icon: '🎯',
    title: 'Expert Instructors',
    desc: 'Every course is taught by practitioners with real-world experience in their field.'
  },
  {
    icon: '🏆',
    title: 'Certificate of Completion',
    desc: 'Earn verified certificates to showcase your new skills to employers.'
  },
  {
    icon: '🔄',
    title: 'Lifetime Access',
    desc: 'Once enrolled, access your course materials anytime — even after completion.'
  }
]

export default function Landing() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    api.get('/api/courses').then(({ data }) => {
      setCourses(data.courses.slice(0, 3))
    }).catch(() => {})
  }, [])

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-grid">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nest-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-ink-600/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-ink-800 border border-ink-600 rounded-full px-4 py-2 mb-8 fade-up">
              <span className="w-2 h-2 rounded-full bg-nest-500 animate-pulse" />
              <span className="font-mono text-sm text-ink-300">Now with 6+ expert-led courses</span>
            </div>

            {/* Heading */}
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight mb-6 fade-up animate-delay-100">
              Learn skills that
              <br />
              <span className="text-gradient">actually matter</span>
            </h1>

            <p className="text-ink-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10 fade-up animate-delay-200">
              SkillNest connects ambitious students with short, intensive workshops led by
              practitioners. No filler, no fluff — just the skills you need.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up animate-delay-300">
              <Link to="/courses" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
                Browse Courses →
              </Link>
              <Link to="/register" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto">
                Start for Free
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 fade-up animate-delay-400">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-bold text-3xl text-ink-100 mb-1">{s.value}</div>
                  <div className="text-sm text-ink-400 font-mono">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-500">
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-ink-500 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-ink-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="section-tag mb-3">
                <span className="w-8 h-px bg-nest-500" />
                Featured
              </div>
              <h2 className="font-display font-bold text-4xl text-ink-100">Popular Courses</h2>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-2 text-nest-400 hover:text-nest-300 font-medium text-sm transition-colors">
              View all <span>→</span>
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-ink-500">
              <p className="font-mono text-sm">Connect backend to see courses</p>
            </div>
          )}

          <div className="text-center mt-10 sm:hidden">
            <Link to="/courses" className="btn-secondary">View all courses →</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-tag justify-center mb-3">
              <span className="w-8 h-px bg-nest-500" />
              Why SkillNest
              <span className="w-8 h-px bg-nest-500" />
            </div>
            <h2 className="font-display font-bold text-4xl text-ink-100">Built for real learning</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="group p-6 bg-ink-800 rounded-2xl border border-ink-700 hover:border-nest-500/40 transition-all duration-300">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-display font-semibold text-ink-100 mb-2">{f.title}</h3>
                <p className="text-ink-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-ink-800/50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-ink-800 border border-ink-600 rounded-3xl p-12 relative overflow-hidden glow-orange">
            <div className="absolute inset-0 bg-gradient-radial from-nest-500/5 via-transparent to-transparent" />
            <h2 className="font-display font-bold text-4xl text-ink-100 mb-4 relative z-10">
              Ready to level up?
            </h2>
            <p className="text-ink-300 mb-8 relative z-10">
              Join hundreds of students already building real-world skills on SkillNest.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
              <Link to="/register" className="btn-primary px-8 py-4">Create Free Account</Link>
              <Link to="/courses" className="btn-secondary px-8 py-4">Browse Courses</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-700 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-display font-semibold text-ink-300">
            Skill<span className="text-nest-500">Nest</span>
          </div>
          <p className="text-ink-500 text-sm font-mono">© 2024 SkillNest. Built for learners.</p>
        </div>
      </footer>
    </div>
  )
}
