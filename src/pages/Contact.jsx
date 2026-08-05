import { useState } from 'react'
import PageHero from '../components/PageHero'

const CONTACT_ITEMS = [
  {
    heading: 'Partnership',
    body: 'Interested in partnership with Dater?',
    email: 'partnership@dater.social',
  },
  {
    heading: 'Media',
    body: 'Interested in including Dater in your next article or blog?',
    email: 'media@dater.social',
  },
  {
    heading: 'Success Stories',
    body: 'Did you meet the most important person in your life on Dater? Tell us about it and we will post your story in our Success Stories section.',
    email: 'success-stories@dater.social',
  },
  {
    heading: 'Feedback',
    body: "We'd love to hear your feedback! Please share your thoughts or suggestions to help us improve.",
    email: 'feedback@dater.social',
  },
  {
    heading: 'Law Enforcement',
    body: (
      <>
        Datify Network Pvt. Ltd.
        <br />
        G-26, NEAR SAINI SHOP, VILL. WAZIARABAD,
        <br />
        Gurgaon, Basai Road, Gurgaon- 122001, Haryana
      </>
    ),
    email: 'law-enforcement@dater.social',
    note: 'NOTE:- We will not respond to emails sent to this address by non-law enforcement officials.',
  },
]

export default function Contact() {
  const [descLen, setDescLen] = useState(0)

  return (
    <main className="w-full">
      <PageHero title="Contact us" />

      {/* Intro */}
      <div className="mt-16 px-8 text-center">
        <h2 className="mx-auto font-google-sans-flex text-[32px] font-bold text-text-primary">
          Got something you want to talk about?
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-google-sans-flex text-[18px] text-text-muted">
          Send enquiry or email us and we promise to get back to you as soon as we can
        </p>
      </div>

      {/* Two-column grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-8 py-16 md:grid-cols-2">
        {/* Left: contact methods */}
        <div>
          {CONTACT_ITEMS.map((item) => (
            <div key={item.heading} className="mb-8">
              <h3 className="mb-2 font-google-sans-flex text-[20px] font-semibold text-text-primary">
                {item.heading}
              </h3>
              <p className="font-google-sans-flex text-[16px] text-text-muted">{item.body}</p>
              <a
                href={`mailto:${item.email}`}
                className="mt-1 block font-google-sans-flex text-[16px] font-semibold text-text-primary underline"
              >
                {item.email}
              </a>
              {item.note && (
                <p className="mt-2 font-google-sans-flex text-[14px] text-text-muted">{item.note}</p>
              )}
            </div>
          ))}
        </div>

        {/* Right: form */}
        <div>
          <h3 className="mb-8 font-google-sans-flex text-[24px] font-bold text-text-primary">
            Submit a request
          </h3>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Name */}
            <label className="mb-1 block font-google-sans-flex text-[15px] text-text-primary">
              Your name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="mb-6 w-full border border-gray-300 px-3 py-3 font-google-sans-flex text-[15px] focus:border-black focus:outline-none"
            />

            {/* Email */}
            <label className="mb-1 block font-google-sans-flex text-[15px] text-text-primary">
              Your email address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              className="mb-6 w-full border border-gray-300 px-3 py-3 font-google-sans-flex text-[15px] focus:border-black focus:outline-none"
            />

            {/* Mobile */}
            <label className="mb-1 block font-google-sans-flex text-[15px] text-text-primary">
              Your mobile number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              className="mb-6 w-full border border-gray-300 px-3 py-3 font-google-sans-flex text-[15px] focus:border-black focus:outline-none"
            />

            {/* Description */}
            <label className="mb-1 block font-google-sans-flex text-[15px] text-text-primary">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              required
              maxLength={2000}
              rows={6}
              onChange={(e) => setDescLen(e.target.value.length)}
              className="mb-1 w-full resize-y border border-gray-300 p-4 font-google-sans-flex text-[15px] focus:border-black focus:outline-none"
            />
            <p className="mb-6 text-right font-google-sans-flex text-[13px] text-text-muted">
              {descLen} / 2000
            </p>

            {/* Attachment */}
            <label className="mb-1 block font-google-sans-flex text-[15px] text-text-muted">
              Attachment{' '}
              <span className="text-text-muted">(optional)</span>
            </label>
            <button
              type="button"
              className="mb-6 w-full rounded-lg border border-gray-300 py-3 font-google-sans-flex text-[15px] text-[#5E9CFE] hover:bg-gray-50"
            >
              Add file or screenshot &nbsp;(Max. 10mb)
            </button>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-full bg-black py-4 font-google-sans-flex text-[18px] font-semibold text-white transition-opacity hover:opacity-80"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
