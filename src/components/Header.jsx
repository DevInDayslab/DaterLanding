import { Link } from 'react-router-dom'
import headerLogo from '../assets/logo/header-logo.png'

const NAV_LINKS = [
  { label: 'The app', to: '/#the-app' },
  { label: 'The buzz', to: '/#the-buzz' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQs', to: '/faqs' },
]

export default function Header() {
  return (
    <header className="w-full bg-white py-4 pl-6 pr-12 md:pl-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="inline-flex items-center">
          <img src={headerLogo} alt="DATER" className="h-8 w-auto md:h-9" />
        </Link>

        <nav className="flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="font-poppins text-[18px] font-medium text-[#322745] transition-opacity hover:opacity-80"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
