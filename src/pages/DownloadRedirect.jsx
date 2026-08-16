import { useEffect, useState } from 'react'
import { getStoreRedirectUrl } from '../utils/getStoreRedirectUrl'

const REDIRECT_AT_KEY = 'dater:download-redirect-at'
// Ignore pageshow/visibility events right after the initial store redirect starts.
const RETURN_GRACE_MS = 500

function goHome() {
  sessionStorage.removeItem(REDIRECT_AT_KEY)
  window.location.replace('/')
}

function shouldReturnHome() {
  const redirectAt = sessionStorage.getItem(REDIRECT_AT_KEY)
  if (!redirectAt) return false
  return Date.now() - Number(redirectAt) > RETURN_GRACE_MS
}

function scheduleGoHome() {
  if (!shouldReturnHome()) return

  goHome()
  // iOS/Android bfcache can block the first navigation attempt.
  window.setTimeout(goHome, 0)
  window.setTimeout(goHome, 300)
}

function injectHomeMetaRefresh() {
  if (document.querySelector('meta[data-download-home-refresh]')) return

  const meta = document.createElement('meta')
  meta.setAttribute('data-download-home-refresh', 'true')
  meta.httpEquiv = 'refresh'
  meta.content = '0;url=/'
  document.head.appendChild(meta)
}

export default function DownloadRedirect() {
  const [returningHome, setReturningHome] = useState(() => shouldReturnHome())

  useEffect(() => {
    const handleReturn = () => {
      if (!shouldReturnHome()) return
      setReturningHome(true)
      injectHomeMetaRefresh()
      scheduleGoHome()
    }

    window.addEventListener('pageshow', handleReturn)
    window.addEventListener('visibilitychange', handleReturn)
    window.addEventListener('focus', handleReturn)

    if (shouldReturnHome()) {
      handleReturn()
      return () => {
        window.removeEventListener('pageshow', handleReturn)
        window.removeEventListener('visibilitychange', handleReturn)
        window.removeEventListener('focus', handleReturn)
      }
    }

    const target = getStoreRedirectUrl(navigator.userAgent)
    if (target.startsWith('http')) {
      sessionStorage.setItem(REDIRECT_AT_KEY, String(Date.now()))
    }
    window.location.replace(target)

    return () => {
      window.removeEventListener('pageshow', handleReturn)
      window.removeEventListener('visibilitychange', handleReturn)
      window.removeEventListener('focus', handleReturn)
    }
  }, [])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-white px-6">
      <div
        className="mb-6 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black"
        aria-hidden="true"
      />
      <p className="text-center font-google-sans-flex text-[16px] text-text-muted">
        {returningHome
          ? 'Returning to homepage...'
          : 'Redirecting you to the app store...'}
      </p>
    </div>
  )
}
