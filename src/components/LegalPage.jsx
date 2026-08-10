import PageHero from './PageHero'
import LegalDocContent from './LegalDocContent'

const NARROW_HERO_CONTAINER_CLASS =
  'bg-white px-12 py-2 shadow-sm md:px-20'

export default function LegalPage({ heroTitle, pageTitle, html, narrowHero = false }) {
  return (
    <main className="w-full">
      <PageHero
        title={heroTitle}
        containerClassName={narrowHero ? NARROW_HERO_CONTAINER_CLASS : undefined}
      />

      <div
        data-header-surface="solid"
        data-header-bg="#ffffff"
        className="mx-auto max-w-6xl px-4 pt-8 pb-16 md:px-2 md:py-16"
      >
        <h2 className="mb-6 font-google-sans-flex text-[26px] font-bold text-text-primary">
          {pageTitle}
        </h2>

        <LegalDocContent html={html} />
      </div>
    </main>
  )
}
