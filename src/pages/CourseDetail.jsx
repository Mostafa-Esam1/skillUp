import { Link, useNavigate, useParams } from 'react-router-dom'
import CourseCover from '../components/CourseCover.jsx'
import Icon from '../components/Icon.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { getCourse } from '../data/courses.js'
import { useApp } from '../lib/store.jsx'
import { duration, lessonsLabel, num, price } from '../lib/format.js'
import usePageTitle from '../lib/usePageTitle.js'
import NotFound from './NotFound.jsx'

export default function CourseDetail() {
  const { id } = useParams()
  const course = getCourse(id)
  const { user, progress, isEnrolled, enroll } = useApp()
  const nav = useNavigate()
  usePageTitle(course?.title)
  if (!course) return <NotFound />

  const enrolled = isEnrolled(course.id)
  const done = (progress[course.id] ?? []).length
  const pct = (done / course.lessons.length) * 100

  function onEnroll() {
    if (!user) { nav(`/login?next=${encodeURIComponent(`/courses/${course.id}`)}`); return }
    enroll(course.id)
    nav(`/learn/${course.id}`)
  }

  return (
    <>
      <section className="border-b border-line bg-soft">
        <div className="wrap py-10 md:py-14">
          <Link to="/courses" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-primary">← كل الكورسات</Link>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm font-medium">
            <span className="rounded-md bg-surface px-2.5 py-0.5 text-primary">{course.category}</span>
            <span className="rounded-md bg-surface px-2.5 py-0.5">{course.level}</span>
          </div>
          <h1 className="max-w-[24ch] text-3xl md:text-5xl">{course.title}</h1>
          <p className="mt-3 max-w-[56ch] text-lg text-muted">{course.desc}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2"><Icon name="user" className="size-4" />{course.instructor}</span>
            <span className="inline-flex items-center gap-2"><Icon name="clock" className="size-4" />{duration(course.totalMin)}</span>
            <span className="inline-flex items-center gap-2"><Icon name="book" className="size-4" />{lessonsLabel(course.lessons.length)}</span>
            <span className="inline-flex items-center gap-2"><Icon name="level" className="size-4" />{course.level}</span>
          </div>
        </div>
      </section>

      <div className="wrap grid items-start gap-8 py-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-10">
          <section>
            <h2 className="mb-4 text-2xl">هتتعلم إيه</h2>
            <ul className="card grid gap-3 p-6 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2.5"><Icon name="check" className="mt-1 size-5 shrink-0 text-ok" />{o}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-1 text-2xl">محتوى الكورس</h2>
            <p className="mb-4 text-sm text-muted">{num(course.sections.length)} أقسام · {lessonsLabel(course.lessons.length)} · {duration(course.totalMin)}</p>
            <div className="space-y-3">
              {course.sections.map((s, i) => (
                <details key={s.title} className="card group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-display font-semibold">
                    <span>{s.title}</span>
                    <span className="flex items-center gap-3 text-sm font-normal text-muted">{lessonsLabel(s.lessons.length)}<Icon name="chevron" className="size-4 transition group-open:rotate-180" /></span>
                  </summary>
                  <ul className="border-t border-line">
                    {s.lessons.map((l) => {
                      const ok = (progress[course.id] ?? []).includes(l.id)
                      return (
                        <li key={l.id} className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-b-0">
                          <span className={`grid size-6 place-items-center rounded-full ${ok ? 'bg-ok text-bg' : 'bg-soft text-primary'}`}><Icon name={ok ? 'check' : 'play'} className="size-3.5" /></span>
                          <span className="flex-1">{l.title}</span>
                          <span className="text-sm text-muted">{num(l.min)} د</span>
                        </li>
                      )
                    })}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl">المدرّب</h2>
            <div className="card flex items-center gap-4 p-5">
              <span className="grid size-14 place-items-center rounded-full bg-primary font-display text-xl font-semibold text-on-primary">{course.instructor.split(' ').pop()[0]}</span>
              <div><div className="font-display text-lg font-semibold">{course.instructor}</div><div className="text-sm text-muted">مدرّب في مجال {course.category}</div></div>
            </div>
          </section>
        </div>

        <aside className="card sticky top-20 overflow-hidden">
          <CourseCover course={course} className="h-40" />
          <div className="space-y-4 p-6">
            <div className={`font-display text-3xl font-bold ${course.price === 0 ? 'text-ok' : ''}`}>{price(course.price)}</div>
            {enrolled ? (
              <>
                <div className="space-y-2">
                  <ProgressBar value={pct} label="تقدمك في الكورس" />
                  <div className="text-sm text-muted">خلّصت {num(done)} من {num(course.lessons.length)} درس</div>
                </div>
                <Link to={`/learn/${course.id}`} className="btn btn-primary w-full">{done ? 'كمّل التعلم' : 'ابدأ الكورس'}</Link>
              </>
            ) : (
              <button className="btn btn-primary w-full" onClick={onEnroll}>{course.price === 0 ? 'سجّل مجانًا' : 'سجّل في الكورس'}</button>
            )}
            {!user && !enrolled && <p className="text-center text-sm text-muted">هتحتاج تسجّل دخول الأول.</p>}
            <ul className="space-y-2 border-t border-line pt-4 text-sm text-muted">
              <li className="flex justify-between"><span>المدة</span><span>{duration(course.totalMin)}</span></li>
              <li className="flex justify-between"><span>الدروس</span><span>{num(course.lessons.length)}</span></li>
              <li className="flex justify-between"><span>المستوى</span><span>{course.level}</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  )
}
