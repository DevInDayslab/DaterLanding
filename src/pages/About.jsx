import heroImage from '../assets/about/about_hero.webp'
import heroMobile from '../assets/about/about_hero_mobile.webp'
import heroMobileFallback from '../assets/about/about_hero_mobile.jpg'
import imgWhyWeBuilt from '../assets/about/why-we-built.webp'
import imgMission from '../assets/about/mission.webp'
import imgSafety from '../assets/about/safety.webp'

const SECTION_COPY = {
  whyWeBuilt:
    'Modern dating should feel exciting, not exhausting. We built Dater to create a safer, more genuine way for people to connect—where privacy comes first, real profiles matter, and meaningful conversations begin naturally.',
  mission:
    'To redefine online dating by creating a platform where genuine connections happen naturally, privacy is respected, and every interaction feels safe, meaningful, and authentic.',
  safety:
    "Your safety is at the heart of everything we do. From verified profiles and privacy controls to thoughtful safety features, we're committed to helping you connect with confidence.",
}

const SECTION_HEADING_CLASS =
  'mb-1.5 font-google-sans-flex text-[23px] font-bold leading-tight text-text-primary md:mb-2.5 md:text-[32px] md:font-semibold'

const SECTION_BODY_CLASS =
  'font-google-sans-flex text-[15px] font-normal leading-normal text-text-muted md:text-[17px] md:leading-snug'

function AboutHero() {
  return (
    <section
      data-header-surface="overlay"
      className="relative flex aspect-[5/6] w-full items-center justify-center overflow-hidden md:aspect-auto md:min-h-[75vh]"
    >
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={heroImage} type="image/webp" />
        <source media="(max-width: 767px)" srcSet={heroMobile} type="image/webp" />
        <img
          src={heroMobileFallback}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <h1 className="font-google-sans-flex text-[22px] font-semibold italic leading-[1.15] text-white md:text-[34px]">
          Redefining The Way People Connect
        </h1>
        <p className="mt-0.5 font-google-sans-flex text-[15px] font-normal leading-[1.25] text-white md:text-[16px]">
          We&apos;re building a safe and meaningful way to meet genuine people.
        </p>
      </div>
    </section>
  )
}

function ContentSections() {
  return (
    <div data-header-surface="solid" data-header-bg="#ffffff" className="mx-auto max-w-7xl space-y-16 px-4 pb-24 pt-8 md:space-y-32 md:px-16 md:py-24">
      {/* Section A — Why We Built This */}
      <section className="grid grid-cols-1 items-center gap-y-6 md:grid-cols-2 md:gap-x-28 md:gap-y-12">
        <div className="mr-auto w-full max-w-md text-left md:mx-auto md:text-center">
          <h2 className={SECTION_HEADING_CLASS}>
            Why We Built This
          </h2>
          <p className={SECTION_BODY_CLASS}>{SECTION_COPY.whyWeBuilt}</p>
        </div>
        <img
          src={imgWhyWeBuilt}
          alt="DATER app profile gallery on phone"
          loading="lazy"
          decoding="async"
          className="mx-auto h-auto w-full max-w-[300px] object-contain md:max-w-[340px]"
        />
      </section>

      {/* Section B — Our Mission */}
      <section className="grid grid-cols-1 items-center gap-y-6 md:grid-cols-2 md:gap-x-28 md:gap-y-12">
        <img
          src={imgMission}
          alt="Couple sharing a joyful moment"
          loading="lazy"
          decoding="async"
          className="order-2 mx-auto h-auto w-full max-w-[480px] rounded-[24px] object-cover md:order-1"
        />
        <div className="order-1 mx-auto mt-0 w-full max-w-md text-left md:order-2 md:text-center">
          <h2 className={SECTION_HEADING_CLASS}>
            Our Mission
          </h2>
          <p className={SECTION_BODY_CLASS}>{SECTION_COPY.mission}</p>
        </div>
      </section>

      {/* Section C — Your Safety Matters */}
      <section className="grid grid-cols-1 items-center gap-y-6 md:grid-cols-2 md:gap-x-28 md:gap-y-12">
        <div className="mx-auto w-full max-w-md text-left md:text-center">
          <h2 className={SECTION_HEADING_CLASS}>
            Your Safety Matters
          </h2>
          <p className={SECTION_BODY_CLASS}>{SECTION_COPY.safety}</p>
        </div>
        <img
          src={imgSafety}
          alt="Verified profiles and discovery on DATER"
          loading="lazy"
          decoding="async"
          className="mx-auto h-auto w-full max-w-[420px] object-contain md:max-w-[480px]"
        />
      </section>
    </div>
  )
}

export default function About() {
  return (
    <main className="w-full">
      <AboutHero />
      <ContentSections />
    </main>
  )
}
