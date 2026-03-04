/**
 * Get filename from Content-Disposition header
 * Supports both `filename=` and `filename*=` (UTF-8 encoded) cases.
 * @param {string} contentDisposition - the header value.
 * @returns {string|null} the filename if found, else null.
 */
export function getFilenameFromContentDisposition(contentDisposition) {
  if (!contentDisposition) return null

  // Regex for encoded filename* (UTF-8)
  const filenameStarRegex = /filename\*\s*=\s*UTF-8''([^;]+)/i
  const starMatch = filenameStarRegex.exec(contentDisposition)
  if (starMatch && starMatch[1]) {
    // decode percent-encoding
    return decodeURIComponent(starMatch[1].replace(/['"]/g, ''))
  }

  // Regex for simple filename=
  const filenameRegex = /filename\s*=\s*(?:['"])?([^;'"]+)(?:['"])?/i
  const match = filenameRegex.exec(contentDisposition)
  if (match && match[1]) {
    return match[1].replace(/['"]/g, '')
  }
  return null
}
