/** WordPress / CMS API */
const WP_ORIGIN = 'https://dater-buzz.com'

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

/** Dev: Vite proxy `/wp-json` → dater-buzz.com (see vite.config.js) */
export const API = {
  wpOrigin: WP_ORIGIN,
  wpBase: import.meta.env.DEV ? '/wp-json/wp/v2' : `${WP_ORIGIN}/wp-json/wp/v2`,
  postsUrl: (perPage = 3) =>
    `${import.meta.env.DEV ? '/wp-json/wp/v2' : `${WP_ORIGIN}/wp-json/wp/v2`}/posts?per_page=${perPage}`,
  mediaUrl: (id) =>
    `${import.meta.env.DEV ? '/wp-json/wp/v2' : `${WP_ORIGIN}/wp-json/wp/v2`}/media/${id}`,
  landingContactUrl: () =>
    import.meta.env.DEV && !API_BASE
      ? '/api/v1/landing/contact'
      : `${API_BASE}/api/v1/landing/contact`,
  landingContactPresignUrl: () =>
    import.meta.env.DEV && !API_BASE
      ? '/api/v1/landing/contact/presign-attachment'
      : `${API_BASE}/api/v1/landing/contact/presign-attachment`,
}
