import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import badgeAppStore from '../assets/badges/app-store.png'
import badgeGooglePlay from '../assets/badges/google-play.png'
import iconFacebook from '../assets/footer/facebook.png'
import iconInstagram from '../assets/footer/instagram.png'
import iconLinkedin from '../assets/footer/linkedin.png'
import iconX from '../assets/footer/x.png'
import iconYoutube from '../assets/footer/youtube.png'
import headerLogo from '../assets/logo/header-logo.png'
import headerLogoWhite from '../assets/logoWhite.png'
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

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
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
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}

export default function Header() {
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(56)
  const [menuMounted, setMenuMounted] = useState(false)
  const [menuActive, setMenuActive] = useState(false)
  const theme = useHeaderTheme(headerRef)

  const isOverlay = theme.mode === 'overlay' && !menuMounted
  const logoSrc = isOverlay ? headerLogoWhite : headerLogo
  const navClass = isOverlay
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
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight)
      }
    }

    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    return () => window.removeEventListener('resize', updateHeaderHeight)
  }, [])

  useEffect(() => {
    if (!menuMounted) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuMounted])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-[101] w-full transition-[background-color,box-shadow] duration-300 ease-out"
      style={{
        backgroundColor: menuMounted ? '#ffffff' : isOverlay ? 'transparent' : theme.bg,
        boxShadow: 'none',
      }}
    >
      <div className="flex items-center justify-between py-2.5 pl-6 pr-6 md:pl-8 md:pr-12">
        <Link
          to="/"
          className="inline-flex items-center"
          onClick={() => handleNavClick('/')}
        >
          <img src={logoSrc} alt="DATER" className="h-11 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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
        </nav>

        <button
          type="button"
          className={`block md:hidden ${isOverlay ? 'text-white' : 'text-text-primary'}`}
          aria-label={menuMounted ? 'Close menu' : 'Open menu'}
          aria-expanded={menuMounted}
          onClick={menuMounted ? closeMenu : openMenu}
        >
          {menuMounted ? <CloseIcon /> : <MenuIcon />}
        </button>
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
                    <img src={src} alt="" className="h-7 w-7 rounded-full object-cover" />
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
    </header>
  )
}
