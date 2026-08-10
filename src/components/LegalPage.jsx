import PageHero from './PageHero'
import LegalDocContent from './LegalDocContent'

export default function LegalPage({ heroTitle, pageTitle, html }) {
  return (
    <main className="w-full">
      <PageHero title={heroTitle} />

      <div
        data-header-surface="solid"
        data-header-bg="#ffffff"
        className="mx-auto max-w-6xl px-2 py-16"
      >
        <h2 className="mb-6 font-google-sans-flex text-[26px] font-bold text-text-primary">
          {pageTitle}
        </h2>

        <LegalDocContent html={html} />
      </div>
    </main>
  )
}
