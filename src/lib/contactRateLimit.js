const STORAGE_KEY = 'dater_contact_submissions'
const MAX_SUBMISSIONS = 3
const WINDOW_MS = 24 * 60 * 60 * 1000
const MIN_INTERVAL_MS = 60 * 1000

export const CONTACT_RATE_LIMIT_MESSAGE =
  'Too many requests. Please try again tomorrow.'

export const CONTACT_COOLDOWN_MESSAGE =
  'Please wait a minute before submitting another request.'

function readTimestamps() {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter((value) => typeof value === 'number')
  } catch {
    return []
  }
}

function writeTimestamps(timestamps) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps))
}

function getRecentTimestamps(now = Date.now()) {
  return readTimestamps().filter((timestamp) => now - timestamp < WINDOW_MS)
}

export function getContactRateLimitError(now = Date.now()) {
  const recent = getRecentTimestamps(now)

  if (recent.length >= MAX_SUBMISSIONS) {
    return CONTACT_RATE_LIMIT_MESSAGE
  }

  const lastSubmission = recent.at(-1)
  if (lastSubmission && now - lastSubmission < MIN_INTERVAL_MS) {
    return CONTACT_COOLDOWN_MESSAGE
  }

  return ''
}

export function recordContactSubmission(now = Date.now()) {
  const recent = getRecentTimestamps(now)
  writeTimestamps([...recent, now])
}
