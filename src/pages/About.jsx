import { TYPOGRAPHY } from '../constants/typography'

export default function About() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className={`font-poppins uppercase ${TYPOGRAPHY.sectionHeading}`}>About</h1>
      <p className={`mt-4 ${TYPOGRAPHY.bodyLg}`}>About page placeholder.</p>
    </main>
  )
}
