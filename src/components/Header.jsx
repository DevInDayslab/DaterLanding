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

export default function Header() {
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(56)
  const [menuMounted, setMenuMounted] = useState(false)
  const [menuActive, setMenuActive] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const theme = useHeaderTheme(headerRef)

  const isCompact = isScrolled && !menuMounted
  const isTransparentHeader =
    (theme.mode === 'overlay' || theme.mode === 'overlay-dark') && !menuMounted && !isCompact
  const isLightOnTransparent = theme.mode === 'overlay' && !menuMounted && !isCompact
  const logoSrc = isLightOnTransparent ? headerLogoWhite : headerLogo
  const navClass = isLightOnTransparent
    ? 'font-google-sans-flex text-[16px] font-medium text-white transition-opacity hover:opacity-80'
    : 'font-google-sans-flex text-[16px] font-medium text-[#322745] transition-opacity hover:opacity-80'

  const openMenu = () => {
    setMenuMounted(true)
    requestAnimationFrame(() => {
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
  }, [isCompact, menuMounted])

  useEffect(() => {
    if (!menuMounted) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuMounted])

  const isSolidGlass = !isTransparentHeader && !menuMounted && !isCompact
  const headerPositionClass = menuMounted
    ? 'top-0 px-0'
    : isCompact
      ? 'top-3 px-4 md:top-4 md:px-8'
      : 'top-0 px-0'

  const expandedNavBackground = menuMounted
    ? '#ffffff'
    : isTransparentHeader
      ? 'transparent'
      : resolveHeaderBackground(theme, { isTransparent: false, menuMounted: false })

  return (
    <header
      ref={headerRef}
      className={`fixed z-[101] w-full transition-[top,padding] duration-300 ease-in-out ${headerPositionClass}`}
    >
      <nav
        aria-label="Main navigation"
        className={`relative w-full ${
          menuMounted || isSolidGlass
            ? 'border-b border-gray-200/80 backdrop-blur-xl backdrop-saturate-150'
            : ''
        }`}
        style={{
          backgroundColor: isCompact ? 'transparent' : expandedNavBackground,
          boxShadow: 'none',
          WebkitBackdropFilter:
            menuMounted || isSolidGlass ? 'blur(24px) saturate(150%)' : 'none',
        }}
      >
        <div
          className={
            isCompact
              ? 'mx-auto max-w-5xl rounded-2xl border border-gray-200/80 bg-white/55 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md backdrop-saturate-150'
              : 'w-full'
          }
        >
          <div
            className={`mx-auto flex max-w-7xl items-center justify-between pl-3 pr-6 md:pl-8 md:pr-12 ${
              isCompact ? 'h-14' : 'h-16'
            }`}
          >
          <Link
            to="/"
            className="inline-flex items-center"
            onClick={() => handleNavClick('/')}
          >
            <img
              src={logoSrc}
              alt="DATER"
              className={`w-auto transition-all duration-300 ease-in-out ${
                isCompact ? 'h-8 md:h-9' : 'h-9 md:h-12'
              }`}
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navClass}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className={navClass}
                  onClick={() => handleNavClick(item.to)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <button
            type="button"
            className={`block md:hidden ${isLightOnTransparent ? 'text-white' : 'text-text-primary'}`}
            aria-label={menuMounted ? 'Close menu' : 'Open menu'}
            aria-expanded={menuMounted}
            onClick={menuMounted ? closeMenu : openMenu}
          >
            {menuMounted ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        </div>

        {menuMounted && (
          <div
            className="absolute left-0 right-0 top-full overflow-hidden bg-white transition-[max-height] duration-300 ease-out md:hidden"
            style={{
              maxHeight: menuActive ? `calc(100dvh - ${headerHeight}px)` : '0px',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div
              className="flex flex-col"
              style={{ minHeight: `calc(100dvh - ${headerHeight}px)` }}
            >
              <nav className="flex flex-col items-center gap-8 px-6 pt-8">
                {NAV_LINKS.map((item) =>
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-google-sans-flex text-[20px] font-semibold text-[#322745] transition-opacity hover:opacity-80"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="font-google-sans-flex text-[20px] font-semibold text-[#322745] transition-opacity hover:opacity-80"
                      onClick={() => handleNavClick(item.to)}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
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

                <div className="mt-6 flex flex-row items-center justify-center gap-4 border-t border-gray-200 pt-6">
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
      </nav>
    </header>
  )
}
