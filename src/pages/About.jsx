import heroImage from '../assets/about/about_hero.jpg'
import imgWhyWeBuilt from '../assets/about/why-we-built.png'
import imgMission from '../assets/about/mission.png'
import imgSafety from '../assets/about/safety.png'

const SECTION_COPY = {
  whyWeBuilt:
    'Modern dating should feel exciting, not exhausting. We built Dater to create a safer, more genuine way for people to connect—where privacy comes first, real profiles matter, and meaningful conversations begin naturally.',
  mission:
    'To redefine online dating by creating a platform where genuine connections happen naturally, privacy is respected, and every interaction feels safe, meaningful, and authentic.',
  safety:
    "Your safety is at the heart of everything we do. From verified profiles and privacy controls to thoughtful safety features, we're committed to helping you connect with confidence.",
}

const SECTION_BODY_CLASS =
  'font-google-sans-flex text-[15px] font-normal leading-normal text-text-muted'

function AboutHero() {
  return (
    <section
      data-header-surface="overlay"
      className="relative flex min-h-[75vh] w-full items-center justify-center overflow-hidden"
    >
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="relative z-10 px-8 py-20">
        <h1 className="mx-auto max-w-4xl text-center font-google-sans-flex text-[40px] font-semibold leading-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]">
          Redefining The Way People Connect
        </h1>
        <p className="mx-auto mt-0.5 max-w-[27.5rem] text-center font-google-sans-flex text-[22px] font-light leading-normal text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]">
          We&apos;re building a safe and meaningful way to meet genuine people.
        </p>
      </div>
    </section>
  )
}

function ContentSections() {
  return (
    <div data-header-surface="solid" data-header-bg="#ffffff" className="mx-auto max-w-7xl space-y-32 px-8 py-24 md:px-16">
      {/* Section A — Why We Built This */}
      <section className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-x-28">
        <div className="mx-auto w-full max-w-md text-center">
          <h2 className="mb-1.5 font-google-sans-flex text-[32px] font-semibold text-text-primary">
            Why We Built This
          </h2>
          <p className={SECTION_BODY_CLASS}>{SECTION_COPY.whyWeBuilt}</p>
        </div>
        <img
          src={imgWhyWeBuilt}
          alt="DATER app profile gallery on phone"
          className="mx-auto h-auto w-full max-w-[300px] object-contain md:max-w-[340px]"
        />
      </section>

      {/* Section B — Our Mission */}
      <section className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-x-28">
        <img
          src={imgMission}
          alt="Couple sharing a joyful moment"
          className="order-1 mx-auto h-auto w-full max-w-[480px] rounded-[32px] object-cover"
        />
        <div className="order-2 mx-auto mt-0 w-full max-w-md text-center">
          <h2 className="mb-1.5 font-google-sans-flex text-[32px] font-semibold text-text-primary">
            Our Mission
          </h2>
          <p className={SECTION_BODY_CLASS}>{SECTION_COPY.mission}</p>
        </div>
      </section>

      {/* Section C — Your Safety Matters */}
      <section className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-x-28">
        <div className="mx-auto w-full max-w-md text-center">
          <h2 className="mb-1.5 font-google-sans-flex text-[32px] font-semibold text-text-primary">
            Your Safety Matters
          </h2>
          <p className={SECTION_BODY_CLASS}>{SECTION_COPY.safety}</p>
        </div>
        <img
          src={imgSafety}
          alt="Verified profiles and discovery on DATER"
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
