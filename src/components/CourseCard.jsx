import { Link } from 'react-router-dom'
import CourseCover from './CourseCover.jsx'
import Icon from './Icon.jsx'
import { duration, lessonsLabel, price } from '../lib/format.js'

export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.id}`} className="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-primary">
      <CourseCover course={course} className="h-36" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-[13px] font-medium text-muted">
          <span className="rounded-md bg-soft px-2 py-0.5 text-primary">{course.category}</span>
          <span>{course.level}</span>
        </div>
        <h3 className="text-[19px] group-hover:text-primary">{course.title}</h3>
        <p className="text-sm text-muted">{course.instructor}</p>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5"><Icon name="clock" className="size-4" />{duration(course.totalMin)}</span>
          <span className="inline-flex items-center gap-1.5"><Icon name="book" className="size-4" />{lessonsLabel(course.lessons.length)}</span>
          <b className={`font-display text-base ${course.price === 0 ? 'text-ok' : 'text-fg'}`}>{price(course.price)}</b>
        </div>
      </div>
    </Link>
  )
}
