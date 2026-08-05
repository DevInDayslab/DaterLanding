import { Link } from 'react-router-dom'
import headerLogo from '../assets/logo/header-logo.png'

const NAV_LINKS = [
  { label: 'The app', to: '/#the-app' },
  { label: 'The buzz', href: 'https://dater-buzz.com', external: true },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQs', to: '/faqs' },
]

const navClass =
  'font-google-sans-flex text-[16px] font-medium text-[#322745] transition-opacity hover:opacity-80'

export default function Header() {
  return (
    <header className="w-full bg-white py-2.5 pl-6 pr-12 md:pl-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="inline-flex items-center">
          <img src={headerLogo} alt="DATER" className="h-11 w-auto md:h-12" />
        </Link>

        <nav className="flex items-center gap-8">
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
              <Link key={item.label} to={item.to} className={navClass}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  )
}
