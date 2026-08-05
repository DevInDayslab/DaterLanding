import { useRef, useState } from 'react'
import PageHero from '../components/PageHero'
import { API } from '../constants/api'
import { inferAttachmentContentType, readJsonResponse } from '../lib/contactApi'

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

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024
const EMPTY_FORM = {
  name: '',
  email: '',
  mobile: '',
  description: '',
}

export default function Contact() {
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [attachment, setAttachment] = useState(null)
  const [descLen, setDescLen] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleFieldChange(event) {
    const { name, value } = event.target
    if (name === 'description') {
      setDescLen(value.length)
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleAttachmentChange(event) {
    const file = event.target.files?.[0] ?? null
    setErrorMessage('')

    if (!file) {
      setAttachment(null)
      return
    }

    if (file.size > MAX_ATTACHMENT_BYTES) {
      setAttachment(null)
      event.target.value = ''
      setErrorMessage('Attachment must be 10 MB or smaller.')
      return
    }

    setAttachment(file)
  }

  async function uploadAttachment(file) {
    const contentType = inferAttachmentContentType(file)
    if (!contentType) {
      throw new Error('Unsupported attachment type. Please upload an image or PDF.')
    }

    const presignRes = await fetch(API.landingContactPresignUrl(), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contentType, fileName: file.name }),
    })

    if (presignRes.status === 429) {
      throw new Error('Too many requests. Please try again tomorrow.')
    }

    if ([502, 503, 504].includes(presignRes.status)) {
      throw new Error(
        'Our servers are temporarily unavailable. Please try again in a few minutes or email us directly.'
      )
    }

    const presignBody = await readJsonResponse(presignRes)
    if (!presignRes.ok || !presignBody.success) {
      throw new Error(
        presignBody.message ||
          presignBody.error ||
          `Failed to prepare attachment upload (${presignRes.status}).`
      )
    }

    const { uploadUrl, publicUrl, s3Key, contentType: signedContentType } = presignBody.data

    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': signedContentType || contentType },
      body: file,
    })

    if (!uploadRes.ok) {
      throw new Error('Failed to upload attachment.')
    }

    return { attachmentUrl: publicUrl, attachmentS3Key: s3Key }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      let attachmentPayload = {}

      if (attachment) {
        attachmentPayload = await uploadAttachment(attachment)
      }

      const res = await fetch(API.landingContactUrl(), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...attachmentPayload,
        }),
      })

      if (res.status === 429) {
        throw new Error('Too many requests. Please try again tomorrow.')
      }

      const body = await readJsonResponse(res)

      if (!res.ok || !body.success) {
        throw new Error(body.message || body.error || 'Unable to submit request.')
      }

      setFormData(EMPTY_FORM)
      setAttachment(null)
      setDescLen(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setSuccessMessage(body.message || 'Your request has been submitted.')
    } catch (err) {
      setErrorMessage(err.message || 'Unable to submit request.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="w-full">
      <PageHero title="Contact us" />

      <div data-header-surface="solid" data-header-bg="#ffffff" className="w-full">
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

          {successMessage && (
            <p className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 font-google-sans-flex text-[15px] text-green-800">
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-google-sans-flex text-[15px] text-red-800">
              {errorMessage}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <label className="mb-1 block font-google-sans-flex text-[15px] text-text-primary">
              Your name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFieldChange}
              required
              disabled={isSubmitting}
              className="mb-6 w-full border border-gray-300 px-3 py-3 font-google-sans-flex text-[15px] focus:border-black focus:outline-none disabled:opacity-60"
            />

            {/* Email */}
            <label className="mb-1 block font-google-sans-flex text-[15px] text-text-primary">
              Your email address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFieldChange}
              required
              disabled={isSubmitting}
              className="mb-6 w-full border border-gray-300 px-3 py-3 font-google-sans-flex text-[15px] focus:border-black focus:outline-none disabled:opacity-60"
            />

            {/* Mobile */}
            <label className="mb-1 block font-google-sans-flex text-[15px] text-text-primary">
              Your mobile number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleFieldChange}
              required
              disabled={isSubmitting}
              className="mb-6 w-full border border-gray-300 px-3 py-3 font-google-sans-flex text-[15px] focus:border-black focus:outline-none disabled:opacity-60"
            />

            {/* Description */}
            <label className="mb-1 block font-google-sans-flex text-[15px] text-text-primary">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFieldChange}
              required
              maxLength={2000}
              rows={6}
              disabled={isSubmitting}
              className="mb-1 w-full resize-y border border-gray-300 p-4 font-google-sans-flex text-[15px] focus:border-black focus:outline-none disabled:opacity-60"
            />
            <p className="mb-6 text-right font-google-sans-flex text-[13px] text-text-muted">
              {descLen} / 2000
            </p>

            {/* Attachment */}
            <label className="mb-1 block font-google-sans-flex text-[15px] text-text-muted">
              Attachment{' '}
              <span className="text-text-muted">(optional)</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleAttachmentChange}
              disabled={isSubmitting}
              className="hidden"
              id="contact-attachment"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              className="mb-2 w-full rounded-lg border border-gray-300 py-3 font-google-sans-flex text-[15px] text-[#5E9CFE] hover:bg-gray-50 disabled:opacity-60"
            >
              {attachment ? attachment.name : 'Add file or screenshot (Max. 10mb)'}
            </button>
            {attachment && (
              <p className="mb-6 font-google-sans-flex text-[13px] text-text-muted">
                Selected: {attachment.name}
              </p>
            )}
            {!attachment && <div className="mb-6" />}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-black py-4 font-google-sans-flex text-[18px] font-semibold text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      </div>
    </main>
  )
}
