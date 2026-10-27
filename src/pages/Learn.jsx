import { Link, Navigate, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { getCourse } from '../data/courses.js'
import { useApp } from '../lib/store.jsx'
import { num } from '../lib/format.js'
import usePageTitle from '../lib/usePageTitle.js'
import NotFound from './NotFound.jsx'

export default function Learn() {
  const { id, lessonId } = useParams()
  const course = getCourse(id)
  const { progress, isEnrolled, toggleLesson } = useApp()
  usePageTitle(course?.title)
  if (!course) return <NotFound />
  if (!isEnrolled(course.id)) return <Navigate to={`/courses/${course.id}`} replace />

  const done = progress[course.id] ?? []
  const firstOpen = course.lessons.find((l) => !done.includes(l.id)) ?? course.lessons[0]
  const idx = Math.max(0, course.lessons.findIndex((l) => l.id === (lessonId ?? firstOpen.id)))
  const lesson = course.lessons[idx]
  const prev = course.lessons[idx - 1], next = course.lessons[idx + 1]
  const isDone = done.includes(lesson.id)
  const pct = (done.length / course.lessons.length) * 100

  return (
    <div className="wrap grid items-start gap-6 py-8 lg:grid-cols-[1fr_360px]">
      <div className="min-w-0 space-y-5">
        <Link to={`/courses/${course.id}`} className="text-sm font-medium text-primary">← {course.title}</Link>

        <div className="relative grid aspect-video place-items-center overflow-hidden rounded-2xl bg-[#0b1220] text-white">
          <div className="text-center">
            <span className="mx-auto mb-3 grid size-16 place-items-center rounded-full bg-white/15"><Icon name="play" className="size-8" /></span>
            <div className="text-sm opacity-80">هنا بيظهر فيديو الدرس</div>
          </div>
        </div>

        <div>
          <div className="text-sm text-muted">الدرس {num(idx + 1)} من {num(course.lessons.length)}</div>
          <h1 className="text-2xl md:text-3xl">{lesson.title}</h1>
          <p className="mt-2 max-w-[60ch] text-muted">مدة الدرس {num(lesson.min)} دقيقة. اتفرّج للآخر، وبعدها علّم الدرس إنه اكتمل عشان يتحسب في تقدمك.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className={`btn ${isDone ? 'btn-outline' : 'btn-primary'}`} onClick={() => toggleLesson(course.id, lesson.id)} aria-pressed={isDone}>
            <Icon name="check" className="size-5" />{isDone ? 'اكتمل (اضغط للتراجع)' : 'علّم الدرس إنه اكتمل'}
          </button>
          {prev && <Link to={`/learn/${course.id}/${prev.id}`} className="btn btn-outline">الدرس السابق</Link>}
          {next && <Link to={`/learn/${course.id}/${next.id}`} className="btn btn-accent">الدرس التالي</Link>}
        </div>

        {pct === 100 && (
          <div className="card border-ok p-5" role="status">
            <h2 className="text-xl text-ok">مبروك! خلّصت الكورس</h2>
            <p className="text-muted">تقدر ترجع لـ <Link to="/courses" className="font-semibold text-primary">الكورسات</Link> وتختار كورس جديد.</p>
          </div>
        )}
      </div>

      <aside className="card overflow-hidden lg:sticky lg:top-20">
        <div className="space-y-2 border-b border-line p-4">
          <div className="font-display font-semibold">تقدمك</div>
          <ProgressBar value={pct} label="تقدمك" />
          <div className="text-sm text-muted">{num(done.length)} من {num(course.lessons.length)} درس</div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {course.sections.map((s) => (
            <div key={s.title}>
              <div className="bg-soft px-4 py-2 font-display text-sm font-semibold">{s.title}</div>
              <ul>
                {s.lessons.map((l) => {
                  const ok = done.includes(l.id), cur = l.id === lesson.id
                  return (
                    <li key={l.id}>
                      <Link to={`/learn/${course.id}/${l.id}`} aria-current={cur ? 'true' : undefined} className={`flex items-center gap-3 border-b border-line px-4 py-3 text-[15px] ${cur ? 'bg-soft font-semibold text-primary' : 'hover:bg-soft'}`}>
                        <span className={`grid size-6 shrink-0 place-items-center rounded-full ${ok ? 'bg-ok text-bg' : 'border border-line'}`}>{ok && <Icon name="check" className="size-3.5" />}</span>
                        <span className="flex-1">{l.title}</span>
                        <span className="text-xs text-muted">{num(l.min)} د</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
