import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { API } from '../constants/api'
import { getSeoFallback, pathToPageSlug } from '../constants/seoPages'

function upsertMeta(attr, key, content) {
  const selector =
    attr === 'name'
      ? `meta[name="${key}"]`
      : `meta[property="${key}"]`
  let el = document.head.querySelector(selector)

  if (!content) {
    if (el) el.remove()
    return
  }

  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')

  if (!href) {
    if (el) el.remove()
    return
  }

  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertRobots(isIndexed) {
  upsertMeta('name', 'robots', isIndexed ? 'index, follow' : 'noindex, nofollow')
}

function applySeoMeta(meta) {
  if (!meta?.meta_title) return

  document.title = meta.meta_title
  upsertMeta('name', 'description', meta.meta_description)
  upsertCanonical(meta.canonical_url)
  upsertRobots(meta.is_indexed)
  upsertMeta('property', 'og:title', meta.meta_title)
  upsertMeta('property', 'og:description', meta.meta_description)
  if (meta.canonical_url) {
    upsertMeta('property', 'og:url', meta.canonical_url)
  }
}

async function fetchSeoMeta(slug) {
  try {
    const response = await fetch(API.landingSeoMetaUrl(slug), {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      return getSeoFallback(slug)
    }
    const payload = await response.json()
    if (!payload?.success || !payload?.data) {
      return getSeoFallback(slug)
    }
    return payload.data
  } catch {
    return getSeoFallback(slug)
  }
}

/**
 * Sync document title and meta tags with landing_page_seo for the current route.
 */
export function usePageSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const slug = pathToPageSlug(pathname)
    let cancelled = false

    applySeoMeta(getSeoFallback(slug))

    fetchSeoMeta(slug).then((meta) => {
      if (!cancelled) {
        applySeoMeta(meta)
      }
    })

    return () => {
      cancelled = true
    }
  }, [pathname])
}
