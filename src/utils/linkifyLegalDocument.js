const CROSS_LINK_REPLACEMENTS = [
  { pattern: /Terms &amp; Conditions/g, href: '/terms' },
  { pattern: /Privacy Policy/g, href: '/privacy' },
  { pattern: /Cookie Policy/g, href: '/cookies' },
  { pattern: /Community Guidelines/g, href: '/community-guidelines' },
]

function addSectionIds(html) {
  return html.replace(
    /<h2 class="legal-h2"><strong>(\d+)\./g,
    '<h2 id="section-$1" class="legal-h2"><strong>$1.',
  )
}

function linkifyTextSegment(text) {
  let result = text

  result = result.replace(
    /Section (\d+)(?= of this Privacy Policy)/g,
    '<a href="#section-$1" class="legal-link">Section $1</a>',
  )

  result = result.replace(
    /<strong>Section (\d+)<\/strong>/g,
    '<a href="#section-$1" class="legal-link"><strong>Section $1</strong></a>',
  )

  for (const { pattern, href } of CROSS_LINK_REPLACEMENTS) {
    result = result.replace(pattern, (match) => `<a href="${href}" class="legal-link">${match}</a>`)
  }

  return result
}

function linkifyOutsideTags(html) {
  return html
    .split(/(<[^>]+>)/g)
    .map((segment) => (segment.startsWith('<') ? segment : linkifyTextSegment(segment)))
    .join('')
}

export function prepareLegalHtml(html) {
  if (!html) return ''

  const withSectionIds = addSectionIds(html)
  return linkifyOutsideTags(withSectionIds)
}
