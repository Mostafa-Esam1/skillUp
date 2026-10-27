import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// حالة التطبيق (مستخدم + تقدّم الدروس) محفوظة في المتصفح بس. لما تربط باك إند، بدّل الدوال دي بـ API.
const Ctx = createContext(null)
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d } catch { return d } }
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => load('su_user', null))
  const [progress, setProgress] = useState(() => load('su_progress', {})) // { courseId: [lessonId, ...] }

  useEffect(() => save('su_user', user), [user])
  useEffect(() => save('su_progress', progress), [progress])

  const value = useMemo(() => ({
    user,
    progress,
    login: (u) => setUser(u),
    logout: () => setUser(null),
    isEnrolled: (cid) => Array.isArray(progress[cid]),
    enroll: (cid) => setProgress((p) => (p[cid] ? p : { ...p, [cid]: [] })),
    toggleLesson: (cid, lid) => setProgress((p) => {
      const cur = p[cid] ?? []
      const next = cur.includes(lid) ? cur.filter((x) => x !== lid) : [...cur, lid]
      return { ...p, [cid]: next }
    }),
  }), [user, progress])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useApp = () => useContext(Ctx)
