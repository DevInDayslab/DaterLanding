/** WordPress / CMS API */
const WP_ORIGIN = 'https://dater-buzz.com'

const DEFAULT_PROD_API_BASE = 'https://api.dater.social'

function resolveApiBase() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim()
  if (configured) {
    return configured.replace(/\/$/, '')
  }
  if (import.meta.env.PROD) {
    return DEFAULT_PROD_API_BASE
  }
  return ''
}

const API_BASE = resolveApiBase()

function landingApiUrl(path) {
  const suffix = `/api/v1/landing${path}`
  return API_BASE ? `${API_BASE}${suffix}` : suffix
}

/** Dev: Vite proxy `/wp-json` → dater-buzz.com (see vite.config.js) */
export const API = {
  wpOrigin: WP_ORIGIN,
  wpBase: import.meta.env.DEV ? '/wp-json/wp/v2' : `${WP_ORIGIN}/wp-json/wp/v2`,
  postsUrl: (perPage = 3) =>
    `${import.meta.env.DEV ? '/wp-json/wp/v2' : `${WP_ORIGIN}/wp-json/wp/v2`}/posts?per_page=${perPage}`,
  mediaUrl: (id) =>
    `${import.meta.env.DEV ? '/wp-json/wp/v2' : `${WP_ORIGIN}/wp-json/wp/v2`}/media/${id}`,
  landingContactUrl: () => landingApiUrl('/contact'),
  landingContactPresignUrl: () => landingApiUrl('/contact/presign-attachment'),
}
