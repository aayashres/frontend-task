import { PARTNERS, SERVICES, SLIDES } from '@/data/content'
import { Carousel } from './Carousel'
import { PartnerLogo } from './PartnerLogos'
import { Reveal } from './Reveal'

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="overflow-hidden bg-white pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-[5.5rem]"
    >
      <div className="grid gap-10 px-gutter md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] md:gap-12">
        <Reveal>
          <h1
            id="services-heading"
            className="m-0 max-w-[17em] text-[1.5rem] font-normal leading-[1.3] tracking-[-0.01em] sm:text-[1.9rem] lg:text-[clamp(1.9rem,2.5vw,2.75rem)]"
          >
            Experience our expert solutions tailored to enhance your business with top-tier design,
            development, and animation.
          </h1>
          <a
            href="#work"
            className="mt-8 inline-flex h-9 items-center rounded-full bg-brand-blue px-5 text-[0.8rem] font-medium text-white transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 lg:mt-10 lg:h-10 lg:px-6"
          >
            Services
          </a>
        </Reveal>

        <Reveal delay={120} as="ul" className="m-0 flex list-none flex-col gap-4 p-0 md:pl-[8%] lg:gap-6">
          {SERVICES.map((service) => (
            <li
              key={service}
              className="max-w-[9em] text-[2rem] font-bold leading-[1.25] tracking-[-0.02em] transition-colors hover:text-brand-blue sm:text-[2.4rem] lg:text-[clamp(2.4rem,3.9vw,3.75rem)]"
            >
              {service}
            </li>
          ))}
        </Reveal>
      </div>

      <div id="work" className="mt-14 scroll-mt-8 sm:mt-20 lg:mt-24">
        <Carousel slides={SLIDES} />
      </div>

      <Reveal className="mt-16 px-gutter sm:mt-24 lg:mt-[7.5rem]">
        <h2 className="m-0 text-center text-[0.8rem] font-semibold tracking-wide text-ink sm:text-sm">Our Partners</h2>
        <ul className="m-0 mt-8 grid list-none grid-cols-2 items-center justify-items-center gap-x-4 gap-y-8 p-0 sm:mt-11 md:grid-cols-4">
          {PARTNERS.map((partner) => (
            <li key={partner} className="grayscale transition hover:grayscale-0">
              <PartnerLogo id={partner} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
