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
  const [openItems, setOpenItems] = useState(() => new Set([0]))

  const toggleItem = (index) => {
    setOpenItems((current) => {
      const next = new Set(current)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <main className="w-full">
      <PageHero title="FAQs" />

      <div data-header-surface="solid" data-header-bg="#ffffff" className="w-full">
        <div className="mt-8 px-8 text-left md:mt-16 md:text-center">
          <h2 className="font-google-sans-flex text-[23px] font-bold leading-[1.15] text-text-primary md:mx-auto md:text-[28px] md:leading-normal">
            Have questions about Dater?
          </h2>
          <p className="mt-1 max-w-lg font-google-sans-flex text-[15px] text-text-muted md:mx-auto md:mt-2">
            You can find all the answers you need right here!
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-8 pb-12 pt-5 md:pb-24 md:pt-12">
        <div>
          {FAQS.map((item, i) => (
            <div key={i} className="border-b border-gray-200">
              <button
                type="button"
                onClick={() => toggleItem(i)}
                className={`flex w-full items-center justify-between text-left ${
                  openItems.has(i) ? 'py-3 pb-2 md:py-5' : 'py-3 md:py-4'
                }`}
              >
                <span className="font-google-sans-flex text-[16px] font-medium text-text-primary">
                  {item.q}
                </span>
                <span className="ml-4 shrink-0 font-google-sans-flex text-[32px] font-light leading-none text-text-muted">
                  {openItems.has(i) ? '−' : '+'}
                </span>
              </button>
              {openItems.has(i) && (
                <p className="pb-3 font-google-sans-flex text-[15px] text-text-muted md:pb-5">{item.a}</p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 font-google-sans-flex text-[16px] text-text-muted md:mt-12">
          Need more help?{' '}
          <a href="/contact" className="text-[15px] font-semibold text-accent-blue underline md:text-[16px]">
            Contact us
          </a>
        </p>
        </div>
      </div>
    </main>
  )
}
