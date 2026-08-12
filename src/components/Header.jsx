import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import badgeAppStore from '../assets/badges/app-store.png'
import badgeGooglePlay from '../assets/badges/google-play.png'
import iconFacebook from '../assets/facebook.svg'
import iconInstagram from '../assets/instagram.svg'
import iconLinkedin from '../assets/linkedin.svg'
import iconX from '../assets/twitter_x.svg'
import iconYoutube from '../assets/youtube.svg'
import headerLogo from '../assets/logo/header-logo.webp'
import headerLogoWhite from '../assets/logoWhite.webp'
import { useHeaderTheme } from '../hooks/useHeaderTheme'

const NAV_LINKS = [
  { label: 'The App', to: '/' },
  { label: 'The Buzz', href: 'https://dater-buzz.com', external: true },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: "FAQ's", to: '/faqs' },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/daterapp/', src: iconFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/dater_social', src: iconInstagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/dater/', src: iconLinkedin },
  { label: 'X', href: 'https://x.com/dater_social', src: iconX },
  { label: 'YouTube', href: 'https://www.youtube.com/@Dater_social', src: iconYoutube },
]

const SCROLL_COMPACT_THRESHOLD = 24

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M4 8h16M4 16h16" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}

function hexToRgba(hex, alpha) {
  const normalized = String(hex || '').replace('#', '')
  if (normalized.length !== 6) return hex

  const r = Number.parseInt(normalized.slice(0, 2), 16)
  const g = Number.parseInt(normalized.slice(2, 4), 16)
  const b = Number.parseInt(normalized.slice(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function resolveHeaderBackground(theme, { isTransparent, menuMounted }) {
  if (menuMounted) return '#ffffff'
  if (isTransparent) return 'transparent'
  if (theme.bg?.startsWith('#')) return hexToRgba(theme.bg, 0.5)
  return theme.bg
}

function NavLinkItems({ className, onNavigate }) {
  return NAV_LINKS.map((item) =>
    item.external ? (
      <a
        key={item.label}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={() => onNavigate()}
      >
        {item.label}
      </a>
    ) : (
      <Link key={item.label} to={item.to} className={className} onClick={() => onNavigate(item.to)}>
        {item.label}
      </Link>
    ),
  )
}

export default function Header() {
  const headerRef = useRef(null)
  const inlineMenuRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(56)
  const [inlineMenuHeight, setInlineMenuHeight] = useState(0)
  const [menuMounted, setMenuMounted] = useState(false)
  const [menuActive, setMenuActive] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, refreshTheme } = useHeaderTheme(headerRef)

  const useCompactShell = isScrolled
  const useInlineMenu = menuMounted && isScrolled
  const useFullWidthMenu = menuMounted && !isScrolled
  const isCompactBar = isScrolled && !menuMounted

  const isTransparentHeader =
    (theme.mode === 'overlay' || theme.mode === 'overlay-dark') &&
    !useCompactShell &&
    !menuMounted
  const isLightOnTransparent = theme.mode === 'overlay' && !useCompactShell && !menuMounted
  const logoSrc = isLightOnTransparent ? headerLogoWhite : headerLogo
  const desktopNavFontSize = useCompactShell ? 'text-[17px]' : 'text-[16px]'
  const navClass = isLightOnTransparent
    ? `font-google-sans-flex ${desktopNavFontSize} font-medium text-white transition-opacity hover:opacity-80`
    : `font-google-sans-flex ${desktopNavFontSize} font-medium text-[#322745] transition-opacity hover:opacity-80`

  const openMenu = () => {
    setMenuMounted(true)
    requestAnimationFrame(() => {
      if (isScrolled && inlineMenuRef.current) {
        setInlineMenuHeight(inlineMenuRef.current.scrollHeight)
      }
      requestAnimationFrame(() => setMenuActive(true))
    })
  }

  const closeMenu = () => {
    setMenuActive(false)
    window.setTimeout(() => setMenuMounted(false), 300)
  }

  const handleNavClick = (to) => {
    closeMenu()
    if (to === '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_COMPACT_THRESHOLD)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight)
      }
    }

    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    return () => window.removeEventListener('resize', updateHeaderHeight)
  }, [useCompactShell, menuMounted, menuActive])

  useEffect(() => {
    if (!menuMounted || !isScrolled) return undefined

    const measureInlineMenu = () => {
      if (inlineMenuRef.current) {
        setInlineMenuHeight(inlineMenuRef.current.scrollHeight)
      }
    }

    measureInlineMenu()
    window.addEventListener('resize', measureInlineMenu)
    return () => window.removeEventListener('resize', measureInlineMenu)
  }, [menuMounted, isScrolled, menuActive])

  useEffect(() => {
    if (!menuMounted) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuMounted])

  useEffect(() => {
    refreshTheme()
    if (!menuMounted) return undefined

    const frame = requestAnimationFrame(() => refreshTheme())
    const timer = window.setTimeout(() => refreshTheme(), 320)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [menuMounted, menuActive, isScrolled, refreshTheme])

  const isSolidGlass = !isTransparentHeader && !menuMounted && !useCompactShell
  const headerPositionClass = useFullWidthMenu
    ? 'top-0 px-0'
    : useCompactShell
      ? 'top-3 px-4 md:top-4 md:px-8'
      : 'top-0 px-0'

  const expandedNavBackground = useFullWidthMenu
    ? '#ffffff'
    : isTransparentHeader
      ? 'transparent'
      : resolveHeaderBackground(theme, { isTransparent: false, menuMounted: false })

  const headerBarClass = [
    'mx-auto flex items-center justify-between',
    useCompactShell
      ? 'max-w-7xl pl-3 pr-6 md:pl-4 md:pr-12'
      : 'w-full max-w-[100rem] pl-3 pr-6 md:pl-8 md:pr-40',
    isCompactBar || useInlineMenu ? 'h-14' : 'h-16',
  ].join(' ')

  return (
    <header
      ref={headerRef}
      className={`fixed z-[101] w-full transition-[top,padding] duration-300 ease-in-out ${headerPositionClass}`}
    >
      <nav
        aria-label="Main navigation"
        className={`relative w-full ${
          useFullWidthMenu
            ? 'bg-white'
            : isSolidGlass
              ? 'border-b border-gray-200/80 backdrop-blur-xl backdrop-saturate-150'
              : ''
        }`}
        style={{
          backgroundColor: useCompactShell ? 'transparent' : expandedNavBackground,
          boxShadow: 'none',
          WebkitBackdropFilter: isSolidGlass ? 'blur(24px) saturate(150%)' : 'none',
        }}
      >
        <div
          className={`transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-in-out ${
            useCompactShell
              ? `mx-auto max-w-5xl rounded-2xl border border-gray-200/80 bg-white/70 backdrop-blur-md backdrop-saturate-150 ${
                  useInlineMenu
                    ? 'shadow-[0_12px_40px_rgb(0,0,0,0.12)]'
                    : 'shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
                }`
              : useFullWidthMenu
                ? 'w-full bg-white'
                : 'w-full'
          }`}
          style={
            useCompactShell
              ? {
                  WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                }
              : undefined
          }
        >
          <div className={headerBarClass}>
            <Link
              to="/"
              className="inline-flex items-center"
              onClick={() => handleNavClick('/')}
            >
              <img
                src={logoSrc}
                alt="DATER"
                className={`w-auto transition-all duration-300 ease-in-out ${
                  isScrolled ? 'h-8 md:h-9' : 'h-9 md:h-12'
                }`}
              />
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <NavLinkItems className={navClass} onNavigate={handleNavClick} />
            </div>

            <button
              type="button"
              className={`block md:hidden ${isLightOnTransparent ? 'text-white' : 'text-text-primary'}`}
              aria-label={menuMounted ? 'Close menu' : 'Open menu'}
              aria-expanded={menuMounted}
              aria-controls="mobile-menu"
              onClick={menuMounted ? closeMenu : openMenu}
            >
              {menuMounted ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {useInlineMenu && (
            <div
              id="mobile-menu"
              className="overflow-hidden transition-[max-height] duration-300 ease-out md:hidden"
              style={{
                maxHeight: menuActive ? `${inlineMenuHeight}px` : '0px',
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div ref={inlineMenuRef} className="border-t border-gray-100 px-6 py-4">
                <nav className="flex flex-col space-y-1">
                  <NavLinkItems
                    className="block min-h-11 py-2 font-google-sans-flex text-[16px] font-medium text-[#322745] transition-opacity hover:opacity-80"
                    onNavigate={handleNavClick}
                  />
                </nav>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="mb-3 font-google-sans-flex text-[14px] font-normal text-[#929292]">
                    Follow us
                  </p>
                  <div className="flex items-center gap-2.5">
                    {SOCIAL_LINKS.map(({ label, href, src }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="transition-opacity hover:opacity-80"
                      >
                        <img src={src} alt="" className="h-7 w-7 object-contain" />
                      </a>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-row items-center gap-3 border-t border-gray-100 pt-4">
                    <a href="#" aria-label="Download on the App Store">
                      <img
                        src={badgeAppStore}
                        alt="Download on the App Store"
                        className="h-9 w-auto"
                      />
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.daterplat.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Get it on Google Play"
                    >
                      <img
                        src={badgeGooglePlay}
                        alt="Get it on Google Play"
                        className="h-9 w-auto"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {useFullWidthMenu && (
            <div
              id="mobile-menu"
              className="overflow-hidden bg-white transition-[max-height] duration-300 ease-out md:hidden"
              style={{
                maxHeight: menuActive ? `calc(100dvh - ${headerHeight}px)` : '0px',
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div
                className="flex flex-col bg-white"
                style={{ minHeight: `calc(100dvh - ${headerHeight}px)` }}
              >
                <nav className="flex flex-col items-center gap-8 px-6 pt-8">
                  <NavLinkItems
                    className="font-google-sans-flex text-[20px] font-semibold text-[#322745] transition-opacity hover:opacity-80"
                    onNavigate={handleNavClick}
                  />
                </nav>

                <div className="mt-28 px-6 pb-6">
                  <p className="mb-4 text-center font-google-sans-flex text-[16px] font-normal text-[#929292]">
                    Follow us
                  </p>
                  <div className="flex items-center justify-center gap-2.5">
                    {SOCIAL_LINKS.map(({ label, href, src }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="transition-opacity hover:opacity-80"
                      >
                        <img src={src} alt="" className="h-7 w-7 object-contain" />
                      </a>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-row items-center justify-center gap-4 pt-6">
                    <a href="#" aria-label="Download on the App Store">
                      <img
                        src={badgeAppStore}
                        alt="Download on the App Store"
                        className="h-10 w-auto"
                      />
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.daterplat.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Get it on Google Play"
                    >
                      <img
                        src={badgeGooglePlay}
                        alt="Get it on Google Play"
                        className="h-10 w-auto"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
