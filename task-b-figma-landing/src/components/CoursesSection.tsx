import { ALL_COURSES, COURSE_STATS } from '@/data/content'
import type { CourseStat } from '@/data/content'
import { CommunityBadge, DesignBadge, ReactBadge, VueBadge } from './CourseIcons'
import { Reveal } from './Reveal'
import { StatCounter } from './StatCounter'

export function CoursesSection() {
  return (
    <section aria-labelledby="courses-heading" className="bg-white px-gutter py-14 sm:py-20 lg:py-24">
      <Reveal>
        <p className="m-0 font-display text-sm text-neutral-700 sm:text-base lg:text-lg">
          Explore our classes and master trending skills!
        </p>
        <h2
          id="courses-heading"
          className="m-0 mt-2 font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.01em] sm:text-[2rem] lg:text-[clamp(2rem,2.6vw,2.6rem)]"
        >
          Dive Into <span className="text-mint">What’s Hot Right Now!</span> <span aria-hidden="true">🔥</span>
        </h2>
      </Reveal>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:mt-10 lg:grid-cols-[2.1fr_1fr_1fr] lg:gap-5">
        <Reveal delay={80} className="col-span-2 lg:col-span-1">
          <AllCoursesCard />
        </Reveal>
        {COURSE_STATS.map((stat, index) => (
          <Reveal key={stat.id} delay={180 + index * 100}>
            <VerticalStatCard stat={stat} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function AllCoursesCard() {
  return (
    <article className="group relative flex h-full min-h-[17rem] flex-col justify-between overflow-hidden rounded-[1.4rem] bg-crimson p-6 text-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(193,50,63,0.6)] sm:min-h-[19rem] sm:rounded-3xl sm:p-8 lg:aspect-[1.3/1] lg:min-h-0 lg:p-10">
      <a
        href="#courses-heading"
        className="ml-auto inline-flex items-center gap-1.5 text-[0.7rem] font-medium tracking-wide text-white sm:text-xs"
      >
        View all Courses
        <svg viewBox="0 0 12 12" className="size-3 transition group-hover:translate-x-0.5" fill="none" aria-hidden="true">
          <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <ul className="m-0 mt-4 flex list-none items-center justify-center gap-4 p-0 sm:gap-8 lg:gap-12" aria-label="Course topics">
        {[ReactBadge, CommunityBadge, VueBadge, DesignBadge].map((Badge, index) => (
          <li
            key={index}
            className="size-12 transition duration-300 hover:-translate-y-1 hover:rotate-3 sm:size-16 lg:size-[4.5rem]"
            style={{ animation: `float 4s ease-in-out ${index * 0.5}s infinite` }}
          >
            <Badge />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-end gap-3 sm:gap-5">
        <StatCounter
          value={ALL_COURSES.value}
          className="text-[4.75rem] sm:text-[6.5rem] lg:text-[clamp(6rem,9vw,9.5rem)]"
          plusClassName="text-white"
        />
        <div className="pb-2 sm:pb-4">
          <p className="m-0 font-display text-xl font-semibold sm:text-2xl">{ALL_COURSES.title}</p>
          <p className="m-0 mt-1 max-w-[12rem] font-display text-[0.7rem] leading-snug text-white/85 sm:text-xs">
            {ALL_COURSES.description}
          </p>
        </div>
      </div>
    </article>
  )
}

function VerticalStatCard({ stat }: { stat: CourseStat }) {
  return (
    <article className="flex h-full min-h-[17rem] flex-col justify-between rounded-[1.4rem] bg-blush p-4 text-crimson transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(193,50,63,0.45)] sm:min-h-[19rem] sm:rounded-3xl sm:p-6 lg:min-h-0">
      <div className="flex items-end gap-2 [writing-mode:vertical-rl] [transform:rotate(180deg)] sm:gap-3">
        <h3 className="m-0 font-display text-lg font-bold leading-tight sm:text-xl lg:text-[1.65rem]">{stat.title}</h3>
        <p className="m-0 max-h-[6.5rem] sm:max-h-[8rem] font-display text-[0.6rem] leading-snug text-crimson/80 sm:text-[0.7rem]">
          {stat.description}
        </p>
      </div>
      <StatCounter value={stat.value} className="text-[3.75rem] sm:text-[5.25rem] lg:text-[clamp(4.5rem,7vw,7.5rem)]" plusClassName="text-crimson" />
    </article>
  )
}
