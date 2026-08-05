import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const DEFAULT_THEME = {
  mode: 'solid',
  bg: '#ffffff',
}

function resolveHeaderTheme(headerHeight) {
  const sections = document.querySelectorAll('[data-header-surface]')
  if (!sections.length) return DEFAULT_THEME

  const probeY = Math.max(headerHeight - 1, 1)
  let matched = null

  for (const section of sections) {
    const rect = section.getBoundingClientRect()
    if (rect.top <= probeY && rect.bottom > probeY) {
      matched = section
      break
    }
  }

  if (!matched) {
    matched = window.scrollY < 80 ? sections[0] : sections[sections.length - 1]
  }

  const mode = matched.dataset.headerSurface || 'solid'
  return {
    mode,
    bg: matched.dataset.headerBg || '#ffffff',
  }
}

export function useHeaderTheme(headerRef) {
  const location = useLocation()
  const [theme, setTheme] = useState(DEFAULT_THEME)

  const updateTheme = useCallback(() => {
    const headerHeight = headerRef.current?.offsetHeight ?? 64
    setTheme(resolveHeaderTheme(headerHeight))
  }, [headerRef])

  useEffect(() => {
    updateTheme()

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateTheme)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location.pathname, updateTheme])

  return theme
}
