export default function Loader() {
  return (
    <div className="fixed inset-0 bg-ink-900 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-2 border-ink-600 rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-nest-500 rounded-full animate-spin" />
        </div>
        <span className="font-mono text-sm text-ink-400 tracking-widest uppercase">Loading</span>
      </div>
    </div>
  )
}
