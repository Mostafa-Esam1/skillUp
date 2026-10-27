import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx'
import CourseCover from '../components/CourseCover.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { courses } from '../data/courses.js'
import { useApp } from '../lib/store.jsx'
import { num } from '../lib/format.js'
import usePageTitle from '../lib/usePageTitle.js'

export default function Dashboard() {
  usePageTitle('لوحتي')
  const { user, progress } = useApp()
  const mine = courses.filter((c) => Array.isArray(progress[c.id]))
  const doneLessons = mine.reduce((a, c) => a + progress[c.id].length, 0)
  const finished = mine.filter((c) => progress[c.id].length === c.lessons.length).length
  const others = courses.filter((c) => !Array.isArray(progress[c.id])).slice(0, 3)

  const stats = [['كورسات مسجّل فيها', mine.length], ['دروس مكتملة', doneLessons], ['كورسات خلّصتها', finished]]

  return (
    <div className="wrap space-y-10 py-10">
      <div>
        <div className="eyebrow">لوحة الطالب</div>
        <h1 className="text-3xl md:text-5xl">أهلًا يا {user.name}</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(([l, v]) => (
          <div key={l} className="card p-5">
            <div className="font-display text-4xl font-bold text-primary">{num(v)}</div>
            <div className="text-sm text-muted">{l}</div>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-4 text-2xl">كورساتي</h2>
        {mine.length ? (
          <div className="grid gap-4">
            {mine.map((c) => {
              const d = progress[c.id].length, pct = (d / c.lessons.length) * 100
              return (
                <div key={c.id} className="card flex flex-col gap-4 overflow-hidden sm:flex-row sm:items-center">
                  <CourseCover course={c} className="h-28 sm:h-auto sm:w-48 sm:self-stretch" />
                  <div className="flex-1 space-y-2 p-4">
                    <h3 className="text-lg">{c.title}</h3>
                    <ProgressBar value={pct} label={`تقدمك في ${c.title}`} />
                    <div className="text-sm text-muted">{num(d)} من {num(c.lessons.length)} درس · {num(Math.round(pct))}٪</div>
                  </div>
                  <div className="p-4 sm:ps-0"><Link to={`/learn/${c.id}`} className="btn btn-primary w-full sm:w-auto">{d === c.lessons.length ? 'راجع الكورس' : d ? 'كمّل' : 'ابدأ'}</Link></div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="card p-10 text-center">
            <h3 className="mb-2 text-2xl">لسه مسجّلتش في كورس</h3>
            <p className="mb-4 text-muted">اختار كورس من القايمة وابدأ أول درس.</p>
            <Link to="/courses" className="btn btn-primary">شوف الكورسات</Link>
          </div>
        )}
      </section>

      {others.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl">ممكن يعجبك</h2>
          <div className="grid gap-5 md:grid-cols-3">{others.map((c) => <CourseCard key={c.id} course={c} />)}</div>
        </section>
      )}
    </div>
  )
}
