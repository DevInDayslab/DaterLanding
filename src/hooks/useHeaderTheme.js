import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const DEFAULT_THEME = {
  mode: 'solid',
  bg: '#ffffff',
}

function themeFromSection(section) {
  if (!section) return DEFAULT_THEME

  return {
    mode: section.dataset.headerSurface || 'solid',
    bg: section.dataset.headerBg || '#ffffff',
  }
}

function resolveHeaderTheme(headerHeight) {
  const sections = document.querySelectorAll('[data-header-surface]')
  if (!sections.length) return DEFAULT_THEME

  const probeY = Math.max(headerHeight - 1, 1)
  const probeX = Math.min(window.innerWidth / 2, window.innerWidth - 1)
  const elementAtProbe = document.elementFromPoint(probeX, probeY)
  const closestSurface = elementAtProbe?.closest('[data-header-surface]')

  if (closestSurface) {
    return themeFromSection(closestSurface)
  }

  for (const section of sections) {
    const rect = section.getBoundingClientRect()
    if (rect.top <= probeY && rect.bottom > probeY) {
      return themeFromSection(section)
    }
  }

  const fallback = window.scrollY < 80 ? sections[0] : sections[sections.length - 1]
  return themeFromSection(fallback)
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

  return { theme, refreshTheme: updateTheme }
}
