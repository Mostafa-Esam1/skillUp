import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../lib/store.jsx'
import usePageTitle from '../lib/usePageTitle.js'

export default function Auth({ mode }) {
  const isReg = mode === 'register'
  usePageTitle(isReg ? 'إنشاء حساب' : 'تسجيل الدخول')
  const { login } = useApp()
  const nav = useNavigate()
  const [sp] = useSearchParams()
  const next = sp.get('next') && sp.get('next').startsWith('/') ? sp.get('next') : '/dashboard'
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState({})
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  function submit(e) {
    e.preventDefault()
    const er = {}
    if (isReg && f.name.trim().length < 2) er.name = 'اكتب اسمك'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'اكتب إيميل صحيح'
    if (f.password.length < 6) er.password = 'كلمة السر لازم ٦ حروف على الأقل'
    setErr(er)
    if (Object.keys(er).length) return
    login({ name: isReg ? f.name.trim() : f.email.split('@')[0], email: f.email })
    nav(next, { replace: true })
  }

  const field = (id, label, type, extra = {}) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <input id={id} type={type} value={f[id]} onChange={set(id)} className="input" aria-invalid={!!err[id]} aria-describedby={err[id] ? `${id}-e` : undefined} {...extra} />
      {err[id] && <p id={`${id}-e`} className="text-sm text-danger">{err[id]}</p>}
    </div>
  )

  return (
    <div className="wrap grid place-items-center py-14">
      <form onSubmit={submit} noValidate className="card w-full max-w-[440px] space-y-5 p-7">
        <div>
          <h1 className="text-3xl">{isReg ? 'إنشاء حساب' : 'أهلًا بيك تاني'}</h1>
          <p className="mt-1 text-muted">{isReg ? 'ابدأ أول كورس في دقيقة.' : 'سجّل دخولك وكمّل من حيث وقفت.'}</p>
        </div>
        {isReg && field('name', 'الاسم', 'text', { autoComplete: 'name' })}
        {field('email', 'الإيميل', 'email', { autoComplete: 'email', dir: 'ltr' })}
        {field('password', 'كلمة السر', 'password', { autoComplete: isReg ? 'new-password' : 'current-password', dir: 'ltr' })}
        <button className="btn btn-primary w-full">{isReg ? 'إنشاء الحساب' : 'دخول'}</button>
        <p className="text-center text-sm text-muted">
          {isReg ? 'عندك حساب؟ ' : 'معندكش حساب؟ '}
          <Link to={`${isReg ? '/login' : '/register'}${sp.get('next') ? `?next=${encodeURIComponent(sp.get('next'))}` : ''}`} className="font-semibold text-primary">{isReg ? 'سجّل دخول' : 'اعمل حساب'}</Link>
        </p>
        <p className="rounded-lg bg-soft p-3 text-xs text-muted">ده تسجيل تجريبي: البيانات بتتحفظ على جهازك بس ومفيش سيرفر لسه.</p>
      </form>
    </div>
  )
}
