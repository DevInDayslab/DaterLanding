/**
 * Canonical SEO page catalog for DaterLanding routes.
 * Keep in sync with backend/src/modules/seo/seo.pages.js
 */
export const LANDING_SEO_PAGES = [
  { page_slug: 'home', path: '/', label: 'Home' },
  { page_slug: 'about', path: '/about', label: 'About' },
  { page_slug: 'contact-us', path: '/contact-us', label: 'Contact Us' },
  { page_slug: 'faq', path: '/faq', label: 'FAQs' },
  { page_slug: 'privacy-policy', path: '/privacy-policy', label: 'Privacy Policy' },
  { page_slug: 'terms', path: '/terms', label: 'Terms of Service' },
  { page_slug: 'community-guidelines', path: '/community-guidelines', label: 'Community Guidelines' },
  { page_slug: 'cookie-policy', path: '/cookie-policy', label: 'Cookie Policy' },
  { page_slug: 'download', path: '/download', label: 'Download' },
]

/** Alias paths that redirect in the SPA — still resolve SEO for direct hits. */
export const PATH_ALIASES = {
  '/contact': 'contact-us',
  '/faqs': 'faq',
  '/privacy': 'privacy-policy',
  '/cookies': 'cookie-policy',
}

const SLUG_SET = new Set(LANDING_SEO_PAGES.map((p) => p.page_slug))

/**
 * Normalize request path and map to page_slug.
 * @param {string} rawPath
 * @returns {string}
 */
export function pathToPageSlug(rawPath) {
  let pathname = String(rawPath || '/').split('?')[0].split('#')[0]
  if (!pathname.startsWith('/')) {
    pathname = `/${pathname}`
  }
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1)
  }

  if (pathname === '/' || pathname === '') {
    return 'home'
  }

  if (PATH_ALIASES[pathname]) {
    return PATH_ALIASES[pathname]
  }

  const withoutSlash = pathname.replace(/^\//, '')
  if (SLUG_SET.has(withoutSlash)) {
    return withoutSlash
  }

  return 'home'
}

/** Fallback SEO when the public API is unavailable (matches SQL seed defaults). */
export const SEO_FALLBACKS = {
  home: {
    meta_title: 'DATER',
    meta_description: 'Find your next date.',
    canonical_url: 'https://dater.social/',
    is_indexed: true,
  },
  about: {
    meta_title: 'About | DATER',
    meta_description: 'Learn about Dater — the dating app built for real connections.',
    canonical_url: 'https://dater.social/about',
    is_indexed: true,
  },
  'contact-us': {
    meta_title: 'Contact Us | DATER',
    meta_description: 'Get in touch with the Dater team for press, partnerships, and support.',
    canonical_url: 'https://dater.social/contact-us',
    is_indexed: true,
  },
  faq: {
    meta_title: 'FAQs | DATER',
    meta_description: 'Answers to common questions about Dater, accounts, safety, and downloads.',
    canonical_url: 'https://dater.social/faq',
    is_indexed: true,
  },
  'privacy-policy': {
    meta_title: 'Privacy Policy | DATER',
    meta_description: 'How Dater collects, uses, and protects your personal information.',
    canonical_url: 'https://dater.social/privacy-policy',
    is_indexed: true,
  },
  terms: {
    meta_title: 'Terms of Service | DATER',
    meta_description: 'The terms that govern your use of the Dater app and website.',
    canonical_url: 'https://dater.social/terms',
    is_indexed: true,
  },
  'community-guidelines': {
    meta_title: 'Community Guidelines | DATER',
    meta_description: 'Standards for respectful, safe behavior on Dater.',
    canonical_url: 'https://dater.social/community-guidelines',
    is_indexed: true,
  },
  'cookie-policy': {
    meta_title: 'Cookie Policy | DATER',
    meta_description: 'How Dater uses cookies and similar technologies on the website.',
    canonical_url: 'https://dater.social/cookie-policy',
    is_indexed: true,
  },
  download: {
    meta_title: 'Download | DATER',
    meta_description: 'Download Dater on the App Store or Google Play.',
    canonical_url: 'https://dater.social/download',
    is_indexed: true,
  },
}

export function getSeoFallback(slug) {
  return SEO_FALLBACKS[slug] ?? SEO_FALLBACKS.home
}
