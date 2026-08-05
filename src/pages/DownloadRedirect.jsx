import { useEffect } from 'react'
import { getStoreRedirectUrl } from '../utils/getStoreRedirectUrl'

export default function DownloadRedirect() {
  useEffect(() => {
    const target = getStoreRedirectUrl(navigator.userAgent)
    window.location.replace(target)
  }, [])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-white px-6">
      <div
        className="mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black"
        aria-hidden="true"
      />
      <p className="text-center font-google-sans-flex text-[16px] text-text-muted">
        Redirecting you to the app store...
      </p>
    </div>
  )
}
