import { Link } from 'react-router-dom'
import badgeAppStore from '../assets/badges/app-store.png'
import badgeGooglePlay from '../assets/badges/google-play.png'
import qrCode from '../assets/footer/qr-code.svg'
import phonesMockup from '../assets/footer/phones-mockup.png'
import iconFacebook from '../assets/footer/facebook.png'
import iconInstagram from '../assets/footer/instagram.png'
import iconLinkedin from '../assets/footer/linkedin.png'
import iconX from '../assets/footer/x.png'
import iconYoutube from '../assets/footer/youtube.png'

const COMPANY_LINKS = [
  { label: 'About us', to: '/about' },
  { label: 'Contact us', to: '/contact' },
]

const USERS_LINKS = [
  { label: 'FAQs', to: '/faqs' },
  { label: 'The Buzz', href: 'https://dater-buzz.com', external: true },
]

const LEGAL_LINKS = [
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Terms & conditions', to: '/terms' },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/daterapp/', src: iconFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/dater_social', src: iconInstagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/dater/', src: iconLinkedin },
  { label: 'X', href: 'https://x.com/dater_social', src: iconX },
  { label: 'YouTube', href: 'https://www.youtube.com/@Dater_social', src: iconYoutube },
]

/** Shared shell so pink card left edge matches Company column left edge */
const FOOTER_SHELL = 'mx-auto w-full max-w-[1440px] px-6 md:px-8'

function FooterColumn({ title, links }) {
  return (
    <div className="min-w-[140px]">
      <p className="mb-4 font-google-sans-flex text-[16px] font-normal text-[#929292]">{title}</p>
      {links.map((item) =>
        item.external ? (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 block font-google-sans-flex text-[17px] font-medium text-[#000000] hover:underline"
          >
            {item.label}
          </a>
        ) : (
          <Link
            key={item.label}
            to={item.to}
            className="mb-3 block font-google-sans-flex text-[17px] font-medium text-[#000000] hover:underline"
          >
            {item.label}
          </Link>
        ),
      )}
    </div>
  )
}

function GetTheAppBanner() {
  return (
    <section className="relative flex min-h-[clamp(260px,24vw,340px)] w-full items-center overflow-hidden rounded-[clamp(28px,3vw,40px)] bg-accent-pink-soft px-[clamp(28px,4vw,48px)] py-[clamp(24px,2.5vw,36px)]">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <img
          src={phonesMockup}
          alt=""
          aria-hidden="true"
          className="h-[clamp(240px,26vw,320px)] w-auto max-w-[58%] object-contain"
        />
      </div>

      <div className="relative z-10 w-[min(100%,280px)] shrink-0">
        <h2 className="font-google-sans-flex text-[clamp(30px,3vw,38px)] font-semibold leading-tight text-[#000000]">
          Get the app
        </h2>
        <p className="mt-0.5 font-google-sans-flex text-[clamp(16px,1.6vw,20px)] font-normal leading-snug text-[#000000]">
          Scan QR code to get start
        </p>
        <div className="mt-[clamp(12px,1.6vw,20px)] inline-block rounded-xl bg-white p-2.5 shadow-sm">
          <img
            src={qrCode}
            alt="Scan to download DATER"
            className="h-[clamp(100px,10vw,128px)] w-[clamp(100px,10vw,128px)]"
          />
        </div>
      </div>

      <span className="sr-only">DATER app on mobile phones</span>
    </section>
  )
}

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className={`${FOOTER_SHELL} pb-14 pt-6`}>
        <GetTheAppBanner />
      </div>

      <div className="border-t border-gray-200">
        <div className={`${FOOTER_SHELL} pb-10 pt-14`}>
          <div className="flex items-start justify-between gap-12">
            <div>
              <div className="flex gap-20">
                <FooterColumn title="Company" links={COMPANY_LINKS} />
                <FooterColumn title="Users" links={USERS_LINKS} />
                <FooterColumn title="Legal" links={LEGAL_LINKS} />
              </div>

              <div className="mt-8 flex items-center gap-4">
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

            {/* Social block: “Follow us” centered above icon row */}
            <div className="ml-auto shrink-0">
              <div className="inline-flex flex-col items-center">
                <p className="mb-4 font-google-sans-flex text-[16px] font-normal text-[#929292]">
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
                      <img
                        src={src}
                        alt=""
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-16 text-center font-google-sans-flex text-[14px] text-[#484848]">
            © 2026 Dater | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
