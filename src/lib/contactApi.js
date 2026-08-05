const EXTENSION_TO_CONTENT_TYPE = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  pdf: 'application/pdf',
}

export function inferAttachmentContentType(file) {
  const type = String(file?.type || '').trim().toLowerCase()
  if (type && type !== 'application/octet-stream') {
    return type
  }

  const extension = String(file?.name || '')
    .split('.')
    .pop()
    ?.toLowerCase()

  return EXTENSION_TO_CONTENT_TYPE[extension] || ''
}

export async function readJsonResponse(response) {
  const text = await response.text()

  if (!text) {
    if (!response.ok) {
      throw new Error(
        `Request failed (${response.status}). The contact service may be unavailable right now.`
      )
    }
    return {}
  }

  try {
    return JSON.parse(text)
  } catch {
    if (response.status === 404) {
      throw new Error(
        'Contact form service is not available yet. Please email us directly or try again later.'
      )
    }

    throw new Error(
      response.ok
        ? 'Unexpected server response. Please try again.'
        : `Request failed (${response.status}). Please try again later.`
    )
  }
}
