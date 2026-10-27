import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import CourseCard from '../components/CourseCard.jsx'
import CourseCover from '../components/CourseCover.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { categories, courses } from '../data/courses.js'
import { coursesLabel, num } from '../lib/format.js'
import usePageTitle from '../lib/usePageTitle.js'

const steps = [
  ['اختار كورس', 'دوّر بالمجال أو المستوى، واقرا المنهج قبل ما تسجّل.'],
  ['اتعلم بالدرس', 'دروس قصيرة تقدر تخلّصها في استراحة الغدا.'],
  ['تابع تقدمك', 'لوحتك بتفتكر وقفت فين وتكمّل من نفس المكان.'],
]

export default function Home() {
  usePageTitle('')
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const sample = courses[0]
  const featured = courses.filter((c) => ['web-basics', 'ui-ux', 'digital-marketing'].includes(c.id))

  return (
    <>
      <section className="overflow-hidden border-b border-line">
        <div className="wrap grid items-center gap-10 py-14 md:grid-cols-[1.15fr_.85fr] md:py-20">
          <div>
            <div className="eyebrow">منصة تعلّم بالعربي</div>
            <h1 className="mb-5 text-[clamp(38px,6vw,68px)]">
              اتعلم مهارة <span className="rounded-lg bg-accent px-2 text-on-accent">جديدة</span>،<br />وابدأ شغلك بيها
            </h1>
            <p className="mb-7 max-w-[46ch] text-lg text-muted">
              {num(courses.length)} كورسات في {num(categories.length)} مجالات، بدروس قصيرة وتدريب عملي. ابدأ بكورس مجاني وشوف مستواك.
            </p>
            <form
              className="flex max-w-[520px] gap-2 rounded-2xl border-[1.5px] border-line bg-surface p-2"
              onSubmit={(e) => { e.preventDefault(); nav(q.trim() ? `/courses?q=${encodeURIComponent(q.trim())}` : '/courses') }}
            >
              <label htmlFor="heroSearch" className="sr-only">دوّر على كورس</label>
              <span className="grid place-items-center ps-2 text-muted"><Icon name="search" /></span>
              <input id="heroSearch" value={q} onChange={(e) => setQ(e.target.value)} placeholder="دوّر على كورس… مثلاً React أو إكسيل" className="min-w-0 flex-1 bg-transparent px-1 outline-none placeholder:text-muted" />
              <button className="btn btn-primary">ابحث</button>
            </form>
            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              {categories.map((c) => <Link key={c} to={`/courses?cat=${encodeURIComponent(c)}`} className="chip">{c}</Link>)}
            </div>
          </div>

          <div className="relative mx-auto mb-10 w-full max-w-[400px]" aria-hidden="true">
            <div className="card overflow-hidden shadow-xl">
              <CourseCover course={sample} className="h-40" />
              <div className="space-y-3 p-5">
                <div className="text-sm text-muted">كمّل من حيث وقفت</div>
                <div className="font-display text-lg font-semibold">{sample.title}</div>
                <ProgressBar value={62} label="تقدم تجريبي" />
                <div className="flex justify-between text-sm text-muted"><span>٦٢٪ مكتمل</span><span>باقي ٤ دروس</span></div>
              </div>
            </div>
            <div className="card absolute -bottom-10 -start-4 flex items-center gap-3 px-4 py-3 shadow-lg">
              <span className="grid size-9 place-items-center rounded-full bg-ok/15 text-ok"><Icon name="check" className="size-5" /></span>
              <span className="text-sm font-medium">خلّصت درس Flexbox</span>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div><div className="eyebrow">المجالات</div><h2 className="text-3xl md:text-4xl">اختار مجالك</h2></div>
          <Link to="/courses" className="text-sm font-semibold text-primary">كل الكورسات ←</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((c) => (
            <Link key={c} to={`/courses?cat=${encodeURIComponent(c)}`} className="card p-5 transition hover:-translate-y-1 hover:border-primary">
              <div className="font-display text-xl font-semibold">{c}</div>
              <div className="text-sm text-muted">{coursesLabel(courses.filter((x) => x.category === c).length)}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16">
        <div className="wrap">
          <div className="mb-8"><div className="eyebrow">ابدأ من هنا</div><h2 className="text-3xl md:text-4xl">كورسات مختارة</h2></div>
          <div className="grid gap-5 md:grid-cols-3">{featured.map((c) => <CourseCard key={c.id} course={c} />)}</div>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="mb-8"><div className="eyebrow">إزاي بتشتغل</div><h2 className="text-3xl md:text-4xl">تلات خطوات وتبدأ</h2></div>
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="card p-6">
              <span className="mb-3 grid size-10 place-items-center rounded-xl bg-soft font-display text-lg font-semibold text-primary">{num(i + 1)}</span>
              <h3 className="mb-1 text-xl">{t}</h3>
              <p className="text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap pb-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-primary p-8 text-on-primary md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-3xl md:text-4xl">جاهز تبدأ؟</h2>
            <p className="mt-2 max-w-[44ch] opacity-90">اعمل حساب في دقيقة وسجّل في أول كورس مجاني.</p>
          </div>
          <Link to="/register" className="btn btn-accent">ابدأ مجانًا</Link>
        </div>
      </section>
    </>
  )
}
