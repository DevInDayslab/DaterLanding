import iconApple from '../assets/apple_black.svg'
import iconAndroid from '../assets/android.svg'
import DownloadQr from './DownloadQr'
import { STORE_LINKS } from '../constants/stores'
import { usePlatform } from '../hooks/usePlatform'

const pillClass =
  'flex w-full items-center justify-center gap-3 rounded-full bg-black px-8 py-4 font-google-sans-flex text-[18px] font-semibold text-white md:w-auto'

const heroDownloadPillClass =
  'inline-flex items-center justify-center gap-1.5 rounded-full bg-white/65 px-5 py-2.5 font-google-sans-flex text-[12px] font-medium leading-none text-black backdrop-blur-sm'

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.79 15.25 3.8 10.54 5.55 7.66c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.08.87.57 0 2.36-1.07 3.98-.91.68.03 2.6.27 3.83 2.05-.09.06-2.29 1.34-2.26 3.99.03 3.15 2.76 4.2 2.79 4.21-.02.07-.44 1.5-1.44 2.97zM12.03 5.5c.73-.89 1.23-2.13 1.09-3.37-1.06.04-2.33.71-3.09 1.6-.67.78-1.26 2.04-1.1 3.24 1.16.09 2.35-.59 3.1-1.47z" />
    </svg>
  )
}

function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current" aria-hidden="true">
      <path d="M3.6 1.8c-.3.2-.6.6-.6 1.1v18.2c0 .5.3.9.6 1.1l.1.1 10.2-10.2v-.2L3.7 1.7l-.1.1zm11.4 7.8-2.5 2.5 2.5 2.5 5.2-3c.8-.5.8-1.3 0-1.8l-5.2-3.2zM12.5 12l-2.7-2.7L1.5 19.1c.3.3.7.4 1.1.2l9.9-7.3zm0 0 9.9 7.3c.4.2.8.1 1.1-.2L15.2 9.3 12.5 12zM1.5 4.9l8.3 6.2L12.5 8.4 3.6 1.7c-.4-.2-.8-.1-1.1.2z" />
    </svg>
  )
}

function DesktopQr({ className = '', labelClassName = 'mt-3 text-sm text-gray-600' }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="rounded-xl bg-white p-3">
        <DownloadQr size={168} showLabel={false} />
      </div>
      <span className={labelClassName}>Scan to download</span>
    </div>
  )
}

function StorePillButton({ platform }) {
  const isIos = platform === 'ios'
  const href = isIos ? STORE_LINKS.ios : STORE_LINKS.android
  const label = isIos ? 'Download on the App Store' : 'Get it on Google Play'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={pillClass}
      aria-label={label}
    >
      {isIos ? <AppleIcon /> : <PlayStoreIcon />}
      {label}
    </a>
  )
}

function FooterDownloadButton({ platform }) {
  const href = platform === 'ios' ? STORE_LINKS.ios : STORE_LINKS.android

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-auto items-center justify-center gap-2 rounded-lg bg-black px-5 py-2.5 font-google-sans-flex text-[15px] font-semibold text-white"
      aria-label="Download now"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Download now
    </a>
  )
}

function HeroDownloadPill({ platform }) {
  const isIos = platform === 'ios'
  const href = isIos ? STORE_LINKS.ios : STORE_LINKS.android
  const icon = isIos ? iconApple : iconAndroid
  const iconClass = isIos ? 'h-[16px] w-[16px]' : 'h-[20px] w-[20px]'
  const label = isIos ? 'Download on the App Store' : 'Get it on Google Play'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={heroDownloadPillClass}
      aria-label={label}
    >
      <span className="flex shrink-0 items-center justify-center leading-none">
        <img src={icon} alt="" className={`block ${iconClass}`} aria-hidden="true" />
      </span>
      <span className="leading-none">Download now</span>
    </a>
  )
}

/**
 * Platform-aware download CTA.
 * @param {'default' | 'hero' | 'footer'} variant
 */
export default function DownloadButton({ variant = 'default', className = '' }) {
  const platform = usePlatform()

  if (platform === 'desktop') {
    return (
      <DesktopQr
        className={className}
        labelClassName={
          variant === 'hero' ? 'mt-3 text-sm text-white' : 'mt-3 text-sm text-gray-600'
        }
      />
    )
  }

  if (variant === 'hero') {
    return (
      <div className={className}>
        <HeroDownloadPill platform={platform} />
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className={className}>
        <FooterDownloadButton platform={platform} />
      </div>
    )
  }

  return (
    <div className={className}>
      <StorePillButton platform={platform} />
    </div>
  )
}
