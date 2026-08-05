import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const HEADER_SCROLL_OFFSET = 72

function scrollToHashTarget(id) {
  const el = document.getElementById(id)
  if (!el) return false

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET
  window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: 'smooth' })
  return true
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const id = hash.replace('#', '')
    const attemptScroll = () => {
      if (!scrollToHashTarget(id)) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(attemptScroll)
    })
  }, [pathname, hash])

  return null
}
