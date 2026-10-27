import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useApp } from '../lib/store.jsx'

const links = [['/', 'الرئيسية'], ['/courses', 'الكورسات']]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-on-primary" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l6-6 4 4 6-8" /><path d="M15 7h5v5" /></svg>
      </span>
      سكيل أب
    </Link>
  )
}

export default function Layout() {
  const { user, logout } = useApp()
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const nav = useNavigate()

  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [loc.pathname])

  const linkCls = ({ isActive }) => `rounded-lg px-3 py-1.5 font-medium transition ${isActive ? 'bg-soft text-primary' : 'text-muted hover:text-fg'}`

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur">
        <div className="wrap flex items-center gap-4 py-3">
          <Logo />
          <nav aria-label="التنقل الرئيسي" className="me-auto ms-6 hidden gap-1 md:flex">
            {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={linkCls}>{label}</NavLink>)}
            {user && <NavLink to="/dashboard" className={linkCls}>لوحتي</NavLink>}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <span className="inline-flex items-center gap-2 text-sm text-muted"><Icon name="user" className="size-4" />{user.name}</span>
                <button className="btn btn-outline !py-2" onClick={() => { logout(); nav('/') }}>خروج</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline !py-2">دخول</Link>
                <Link to="/register" className="btn btn-primary !py-2">ابدأ مجانًا</Link>
              </>
            )}
          </div>
          <button className="ms-auto grid size-10 place-items-center rounded-lg border border-line md:hidden" aria-label="القايمة" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
        {open && (
          <div className="wrap flex flex-col gap-1 border-t border-line pb-4 pt-2 md:hidden">
            {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={linkCls}>{label}</NavLink>)}
            {user ? (
              <>
                <NavLink to="/dashboard" className={linkCls}>لوحتي</NavLink>
                <button className="btn btn-outline mt-2" onClick={() => { logout(); nav('/') }}>خروج ({user.name})</button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link to="/login" className="btn btn-outline">دخول</Link>
                <Link to="/register" className="btn btn-primary">ابدأ مجانًا</Link>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="border-t border-line bg-surface">
        <div className="wrap grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-[40ch] text-sm text-muted">منصة بتعلّمك مهارات الشغل بالعربي، بدروس قصيرة وتتابع تقدمك خطوة بخطوة.</p>
          </div>
          <div>
            <h3 className="mb-2 text-base">المنصة</h3>
            <ul className="space-y-1 text-sm text-muted">
              <li><Link to="/courses" className="hover:text-fg">كل الكورسات</Link></li>
              <li><Link to="/register" className="hover:text-fg">إنشاء حساب</Link></li>
              <li><Link to="/dashboard" className="hover:text-fg">لوحة الطالب</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-base">المجالات</h3>
            <ul className="space-y-1 text-sm text-muted">
              {['برمجة', 'تصميم', 'تسويق', 'لغات', 'أعمال'].map((c) => (
                <li key={c}><Link to={`/courses?cat=${encodeURIComponent(c)}`} className="hover:text-fg">{c}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="wrap border-t border-line py-4 text-sm text-muted">© سكيل أب، كل الحقوق محفوظة</div>
      </footer>
    </div>
  )
}
