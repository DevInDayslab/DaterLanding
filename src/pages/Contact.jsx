import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { API } from '../constants/api'
import { inferAttachmentContentType, readJsonResponse } from '../lib/contactApi'
import {
  CONTACT_RATE_LIMIT_MESSAGE,
  getContactRateLimitError,
  recordContactSubmission,
} from '../lib/contactRateLimit'

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
    body: 'H. No. 1404, VPO Wazirabad, Atta Mohalla, Near Sant Shop, Sector-52, Gurgaon, Haryana, India - 122003',
    email: 'law-enforcement@dater.social',
    note: 'NOTE:- We will not respond to emails sent to this address by non-law enforcement officials.',
  },
]

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024
const MAX_ATTACHMENTS = 10
const SUCCESS_MESSAGE =
  "Thanks for contacting us. We've received your message and our team will get back to you shortly."
const MAX_NAME_LENGTH = 30
const MAX_EMAIL_LENGTH = 254
const MOBILE_DIGITS = 10
// Frontend-only email check: local@domain.tld (TLD at least 2 letters)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const EMPTY_FORM = {
  name: '',
  email: '',
  mobile: '',
  description: '',
}

const INPUT_BASE_CLASS =
  'w-full rounded-md border px-3 py-3 font-google-sans-flex text-[15px] focus:outline-none disabled:opacity-60'

function getAttachmentValidationError(files) {
  if (files.length > MAX_ATTACHMENTS) {
    return `You can attach up to ${MAX_ATTACHMENTS} files.`
  }

  for (const file of files) {
    if (!file.size) {
      return `"${file.name}" is empty and cannot be uploaded.`
    }

    if (file.size > MAX_ATTACHMENT_BYTES) {
      return `"${file.name}" exceeds the 10 MB limit.`
    }

    if (!inferAttachmentContentType(file)) {
      return `"${file.name}" is not supported. Please upload an image or PDF.`
    }
  }

  return ''
}

function mergeAttachments(existing, incoming) {
  const merged = [...existing]

  for (const file of incoming) {
    if (merged.length >= MAX_ATTACHMENTS) {
      return {
        files: merged,
        error: `You can attach up to ${MAX_ATTACHMENTS} files.`,
      }
    }

    const isDuplicate = merged.some(
      (existingFile) =>
        existingFile.name === file.name &&
        existingFile.size === file.size &&
        existingFile.lastModified === file.lastModified
    )
    if (isDuplicate) {
      continue
    }

    const nextFiles = [...merged, file]
    const error = getAttachmentValidationError(nextFiles)
    if (error) {
      return { files: merged, error }
    }

    merged.push(file)
  }

  return { files: merged, error: '' }
}

function isFieldInvalid(name, value) {
  const trimmed = value.trim()

  if (name === 'name') {
    return !trimmed || trimmed.length > MAX_NAME_LENGTH
  }

  if (name === 'email') {
    const email = trimmed.toLowerCase()
    return !email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)
  }

  if (name === 'mobile') {
    return !/^\d{10}$/.test(value)
  }

  if (name === 'description') {
    return !trimmed
  }

  return false
}

function fieldBorderClass(showErrors, name, value) {
  if (!showErrors) return 'border-gray-300 focus:border-black'
  return isFieldInvalid(name, value)
    ? 'border-red-300 focus:border-red-400'
    : 'border-gray-300 focus:border-black'
}

export default function Contact() {
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [attachments, setAttachments] = useState([])
  const [honeypot, setHoneypot] = useState('')
  const [descLen, setDescLen] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFieldErrors, setShowFieldErrors] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleFieldChange(event) {
    const { name, value } = event.target
    let nextValue = value

    if (name === 'name') {
      nextValue = value.slice(0, MAX_NAME_LENGTH)
    } else if (name === 'mobile') {
      nextValue = value.replace(/\D/g, '').slice(0, MOBILE_DIGITS)
    } else if (name === 'email') {
      nextValue = value.trimStart().slice(0, MAX_EMAIL_LENGTH)
    } else if (name === 'description') {
      setDescLen(value.length)
    }

    setFormData((prev) => ({ ...prev, [name]: nextValue }))
  }

  function handleAttachmentChange(event) {
    const pickedFiles = Array.from(event.target.files ?? [])
    event.target.value = ''

    if (!pickedFiles.length) return

    setSuccessMessage('')
    const { files, error } = mergeAttachments(attachments, pickedFiles)
    setAttachments(files)
    setErrorMessage(error)
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
      const presignRateLimitBody = await readJsonResponse(presignRes).catch(() => ({}))
      throw new Error(
        presignRateLimitBody.message ||
          presignRateLimitBody.error ||
          CONTACT_RATE_LIMIT_MESSAGE
      )
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
    setShowFieldErrors(true)

    const hasInvalidField = Object.entries(formData).some(([name, value]) =>
      isFieldInvalid(name, value)
    )
    if (hasInvalidField) return

    const attachmentError = getAttachmentValidationError(attachments)
    if (attachmentError) {
      setErrorMessage(attachmentError)
      return
    }

    const clientRateLimitError = getContactRateLimitError()
    if (clientRateLimitError) {
      setErrorMessage(clientRateLimitError)
      return
    }

    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      let attachmentPayload = {}
      let description = formData.description.trim()

      if (attachments.length > 0) {
        attachmentPayload = await uploadAttachment(attachments[0])

        if (attachments.length > 1) {
          const extraUrls = []

          for (let index = 1; index < attachments.length; index += 1) {
            const uploaded = await uploadAttachment(attachments[index])
            if (uploaded.attachmentUrl) {
              extraUrls.push(uploaded.attachmentUrl)
            }
          }

          if (extraUrls.length > 0) {
            description += `\n\nAdditional attachments:\n${extraUrls.map((url) => `- ${url}`).join('\n')}`
          }
        }
      }

      if (description.length > 2000) {
        setErrorMessage(
          'Your message is too long with the selected attachments. Please shorten your description or remove some files.'
        )
        return
      }

      const res = await fetch(API.landingContactUrl(), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          description,
          website: honeypot,
          ...attachmentPayload,
        }),
      })

      if (res.status === 429) {
        const rateLimitBody = await readJsonResponse(res).catch(() => ({}))
        throw new Error(
          rateLimitBody.message || rateLimitBody.error || CONTACT_RATE_LIMIT_MESSAGE
        )
      }

      const body = await readJsonResponse(res)

      if (!res.ok || !body.success) {
        throw new Error(body.message || body.error || 'Unable to submit request.')
      }

      setFormData(EMPTY_FORM)
      setAttachments([])
      setHoneypot('')
      setDescLen(0)
      setShowFieldErrors(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      recordContactSubmission()
      setSuccessMessage(SUCCESS_MESSAGE)
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
      <div className="mt-8 px-8 text-left md:mt-16 md:text-center">
        <h2 className="font-google-sans-flex text-[23px] font-bold leading-[1.15] text-text-primary md:mx-auto md:text-[28px] md:leading-normal">
          Got something you want to talk about?
        </h2>
        <p className="mt-1 max-w-lg font-google-sans-flex text-[15px] text-text-muted md:mx-auto md:mt-2">
          Send enquiry or email us and we promise to get
          <br />
          back to you as soon as we can
        </p>
      </div>

      {/* Two-column grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-8 py-8 md:grid-cols-2 md:gap-x-56 md:gap-y-16 md:px-12 md:py-16">
        {/* Left: contact methods */}
        <div className="md:-ml-4">
          {CONTACT_ITEMS.map((item) => (
            <div key={item.heading} className="mb-6 last:mb-2 md:mb-8 md:last:mb-8">
              <h3 className="mb-2 font-google-sans-flex text-[18px] font-semibold text-text-primary">
                {item.heading}
              </h3>
              <p className="font-google-sans-flex text-[14px] text-text-muted">{item.body}</p>
              <a
                href={`mailto:${item.email}`}
                className="mt-1 block font-google-sans-flex text-[14px] font-semibold text-text-primary underline"
              >
                {item.email}
              </a>
              {item.note && (
                <p className="mt-2 font-google-sans-flex text-[13px] text-text-muted">{item.note}</p>
              )}
            </div>
          ))}
        </div>

        {/* Right: form */}
        <div className="md:ml-4">
          <h3 className="mb-8 font-google-sans-flex text-[21px] font-bold text-text-primary md:text-[22px]">
            Submit a request
          </h3>

          <form onSubmit={handleSubmit} noValidate className="pb-2">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {/* Name */}
            <label className="mb-1 block font-google-sans-flex text-[14px] text-text-primary">
              Your name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFieldChange}
              maxLength={MAX_NAME_LENGTH}
              disabled={isSubmitting}
              className={`mb-6 ${INPUT_BASE_CLASS} ${fieldBorderClass(showFieldErrors, 'name', formData.name)}`}
            />

            {/* Email */}
            <label className="mb-1 block font-google-sans-flex text-[14px] text-text-primary">
              Your email address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFieldChange}
              maxLength={MAX_EMAIL_LENGTH}
              disabled={isSubmitting}
              className={`mb-6 ${INPUT_BASE_CLASS} ${fieldBorderClass(showFieldErrors, 'email', formData.email)}`}
            />

            {/* Mobile */}
            <label className="mb-1 block font-google-sans-flex text-[14px] text-text-primary">
              Your mobile number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleFieldChange}
              inputMode="numeric"
              maxLength={MOBILE_DIGITS}
              disabled={isSubmitting}
              className={`mb-6 ${INPUT_BASE_CLASS} ${fieldBorderClass(showFieldErrors, 'mobile', formData.mobile)}`}
            />

            {/* Description */}
            <label className="mb-1 block font-google-sans-flex text-[14px] text-text-primary">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFieldChange}
              maxLength={2000}
              rows={6}
              disabled={isSubmitting}
              className={`mb-1 resize-y p-4 ${INPUT_BASE_CLASS} ${fieldBorderClass(
                showFieldErrors,
                'description',
                formData.description
              )}`}
            />
            <p className="mb-6 text-right font-google-sans-flex text-[13px] text-text-muted">
              {descLen} / 2000
            </p>

            {/* Attachment */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              multiple
              onChange={handleAttachmentChange}
              disabled={isSubmitting}
              className="hidden"
              id="contact-attachment"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting || attachments.length >= MAX_ATTACHMENTS}
              className="w-full rounded-lg bg-[#F5F5F5] py-3.5 font-google-sans-flex text-[15px] font-medium text-text-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              + Add file or screenshot
            </button>
            <p className="mt-2 text-center font-google-sans-flex text-[13px] text-text-muted">
              Max {MAX_ATTACHMENTS} files/10mb each
            </p>
            {attachments.length > 0 && (
              <ul className="mt-3 space-y-1">
                {attachments.map((file) => (
                  <li
                    key={`${file.name}-${file.size}-${file.lastModified}`}
                    className="truncate text-center font-google-sans-flex text-[13px] text-text-primary"
                  >
                    {file.name}
                  </li>
                ))}
              </ul>
            )}
            <div className="mb-6" />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-black py-3 font-google-sans-flex text-[17px] font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

            {successMessage && (
              <p className="mt-6 text-center font-google-sans-flex text-[15px] italic leading-snug text-[#087600] md:text-[16px]">
                {successMessage}
              </p>
            )}

            {errorMessage && (
              <p className="mt-6 text-center font-google-sans-flex text-[15px] leading-snug text-red-700">
                {errorMessage}
              </p>
            )}

            <p className="mt-6 text-center font-google-sans-flex text-[13px] leading-snug text-text-muted md:text-[14px]">
              By tapping &apos;Submit&apos; you Agree to Dater&apos;s{' '}
              <Link to="/terms" className="text-text-muted underline hover:opacity-80">
                Terms &amp; Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-text-muted underline hover:opacity-80">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
      </div>
    </main>
  )
}
