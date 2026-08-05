import { TEXT } from '../constants/text'

/**
 * Shared download CTA shell — wire store links / QR in a later task.
 */
export default function DownloadButton({ label = TEXT.downloadCta, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full bg-white px-6 py-3 font-google-sans-flex text-footer-link text-text-primary md:text-footer-link-md ${className}`}
    >
      {label}
    </button>
  )
}
