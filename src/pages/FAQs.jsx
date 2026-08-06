import { useState } from 'react'
import PageHero from '../components/PageHero'

const FAQS = [
  {
    q: 'What is Dater?',
    a: 'Dater is a modern dating app focused on genuine connections. We help you meet real, verified people nearby through smart filters, stories, and authentic conversations.',
  },
  {
    q: 'Is Dater free to use?',
    a: 'Yes — Dater is free to download and use. We offer an optional premium subscription that unlocks advanced filters, privacy mode, and other exclusive features.',
  },
  {
    q: 'How does profile verification work?',
    a: 'Users can verify their profile by completing a short selfie-based check. Verified profiles receive a badge so others know they are interacting with a real person.',
  },
  {
    q: 'Can I control who sees my profile?',
    a: 'Yes. Privacy Mode lets you stay invisible to everyone except people you have already connected with or those you choose to reveal yourself to.',
  },
  {
    q: 'How do I report or block someone?',
    a: 'Tap the three-dot menu on any profile to report or block that person. Our moderation team reviews every report and takes action within 24 hours.',
  },
  {
    q: 'Which cities is Dater available in?',
    a: 'Dater is currently available across major cities in India and expanding internationally. Use the Switch City feature to explore profiles in other cities before you visit.',
  },
]

export default function FAQs() {
  const [open, setOpen] = useState(0)

  return (
    <main className="w-full">
      <PageHero title="FAQs" />

      <div data-header-surface="solid" data-header-bg="#ffffff" className="mx-auto max-w-4xl px-8 pb-24">
        <h2 className="mt-16 font-google-sans-flex text-[28px] font-bold text-text-primary">
          Have questions about Dater?
        </h2>
        <p className="mt-2 font-google-sans-flex text-[14px] text-text-muted">
          You can find all the answers you need right here!
        </p>

        <div className="mt-12">
          {FAQS.map((item, i) => (
            <div key={i} className="border-b border-gray-200">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left"
              >
                <span className="font-google-sans-flex text-[16px] font-medium text-text-primary">
                  {item.q}
                </span>
                <span className="ml-4 shrink-0 font-google-sans-flex text-[32px] font-light leading-none text-text-muted">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <p className="pb-6 font-google-sans-flex text-[14px] text-text-muted">{item.a}</p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-12 font-google-sans-flex text-[16px] text-text-muted">
          Need more help?{' '}
          <a href="/contact" className="font-semibold text-text-primary underline">
            Contact us
          </a>
        </p>
      </div>
    </main>
  )
}
