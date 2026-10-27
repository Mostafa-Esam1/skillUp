const nf = new Intl.NumberFormat('ar-EG')
export const num = (n) => nf.format(n)
export const price = (p) => (p === 0 ? 'مجاني' : `${num(p)} ج.م`)
export const duration = (min) => {
  const h = Math.floor(min / 60), m = min % 60
  if (!h) return `${num(m)} دقيقة`
  return m ? `${num(h)} ساعة و${num(m)} دقيقة` : `${num(h)} ساعة`
}

// جمع عربي صحيح: ١ درس واحد، ٢ درسين، ٣–١٠ دروس، أكتر من كده درس
const label = (n, one, two, few, many) =>
  n === 1 ? one : n === 2 ? two : `${num(n)} ${n >= 3 && n <= 10 ? few : many}`
export const lessonsLabel = (n) => label(n, 'درس واحد', 'درسين', 'دروس', 'درس')
export const coursesLabel = (n) => label(n, 'كورس واحد', 'كورسين', 'كورسات', 'كورس')
