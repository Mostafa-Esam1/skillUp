const colors = { 'برمجة': '#1f4fd8', 'تصميم': '#d63f78', 'تسويق': '#d9730d', 'لغات': '#0f8f68', 'أعمال': '#5b46c8' }

// غلاف الكورس: شكل هندسي متولّد من الـ id بدل صورة
export default function CourseCover({ course, className = '' }) {
  let h = 0
  for (const ch of course.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  const r = (n) => { h = (h * 1103515245 + 12345) >>> 0; return h % n }
  const circles = Array.from({ length: 3 }, () => ({ cx: r(320), cy: r(180), r: 30 + r(60), o: (0.1 + r(10) / 100).toFixed(2) }))
  const rot = r(60) - 30
  return (
    <div className={`relative grid place-items-center overflow-hidden ${className}`} style={{ background: colors[course.category] }}>
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {circles.map((c, i) => <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="#fff" opacity={c.o} />)}
        <rect x="200" y="90" width="150" height="26" rx="13" fill="#fff" opacity=".14" transform={`rotate(${rot} 275 103)`} />
        <circle cx="46" cy="40" r="9" fill="#ffc837" />
      </svg>
      <span dir="ltr" className="relative font-display text-4xl font-bold tracking-widest text-white">{course.badge}</span>
    </div>
  )
}
