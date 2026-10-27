import { Link } from 'react-router-dom'
import usePageTitle from '../lib/usePageTitle.js'

export default function NotFound() {
  usePageTitle('الصفحة مش موجودة')
  return (
    <div className="wrap py-24 text-center">
      <div className="font-display text-7xl font-bold text-primary">٤٠٤</div>
      <h1 className="my-3 text-3xl">الصفحة مش موجودة</h1>
      <p className="mb-6 text-muted">الرابط ممكن يكون اتغيّر أو مكتوب غلط.</p>
      <Link to="/" className="btn btn-primary">الرجوع للرئيسية</Link>
    </div>
  )
}
