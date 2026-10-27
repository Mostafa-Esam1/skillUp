import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx'
import Icon from '../components/Icon.jsx'
import { categories, courses, levels } from '../data/courses.js'
import { coursesLabel } from '../lib/format.js'
import usePageTitle from '../lib/usePageTitle.js'

const sorts = { default: 'الافتراضي', cheap: 'الأقل سعرًا', short: 'الأقصر مدة' }

export default function Courses() {
  usePageTitle('الكورسات')
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q') ?? ''
  const cat = sp.get('cat') ?? ''
  const level = sp.get('level') ?? ''
  const sort = sp.get('sort') ?? 'default'

  const set = (k, v) => setSp((old) => { const n = new URLSearchParams(old); v ? n.set(k, v) : n.delete(k); return n }, { replace: true })

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    let r = courses.filter((c) =>
      (!cat || c.category === cat) && (!level || c.level === level) &&
      (!term || `${c.title} ${c.category} ${c.instructor} ${c.badge}`.toLowerCase().includes(term)))
    if (sort === 'cheap') r = [...r].sort((a, b) => a.price - b.price)
    if (sort === 'short') r = [...r].sort((a, b) => a.totalMin - b.totalMin)
    return r
  }, [q, cat, level, sort])

  return (
    <div className="wrap py-10">
      <div className="eyebrow">الكورسات</div>
      <h1 className="mb-6 text-3xl md:text-5xl">كل الكورسات</h1>

      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <label htmlFor="q" className="sr-only">بحث</label>
          <span className="pointer-events-none absolute inset-y-0 start-3 grid place-items-center text-muted"><Icon name="search" className="size-5" /></span>
          <input id="q" className="input ps-11" placeholder="دوّر باسم الكورس أو المدرّب" value={q} onChange={(e) => set('q', e.target.value)} />
        </div>
        <div>
          <label htmlFor="level" className="sr-only">المستوى</label>
          <select id="level" className="input" value={level} onChange={(e) => set('level', e.target.value)}>
            <option value="">كل المستويات</option>
            {levels.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="sr-only">الترتيب</label>
          <select id="sort" className="input" value={sort} onChange={(e) => set('sort', e.target.value === 'default' ? '' : e.target.value)}>
            {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>ترتيب: {v}</option>)}
          </select>
        </div>
      </div>

      <div role="group" aria-label="المجال" className="mb-8 flex flex-wrap gap-2">
        <button className="chip" aria-pressed={!cat} onClick={() => set('cat', '')}>الكل</button>
        {categories.map((c) => <button key={c} className="chip" aria-pressed={cat === c} onClick={() => set('cat', c)}>{c}</button>)}
      </div>

      <p className="mb-4 text-sm text-muted" aria-live="polite">{coursesLabel(list.length)}</p>
      {list.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((c) => <CourseCard key={c.id} course={c} />)}</div>
      ) : (
        <div className="card p-10 text-center">
          <h2 className="mb-2 text-2xl">مفيش نتايج</h2>
          <p className="mb-4 text-muted">جرّب كلمة تانية أو شيل الفلاتر.</p>
          <button className="btn btn-primary" onClick={() => setSp({}, { replace: true })}>مسح الفلاتر</button>
        </div>
      )}
    </div>
  )
}
