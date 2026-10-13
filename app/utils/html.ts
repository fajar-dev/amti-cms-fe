const MEDIA_TAGS = ['<img', '<video', '<iframe', '<audio']

export function isEmptyHtml(html?: string | null): boolean {
  if (!html) return true

  const lower = html.toLowerCase()
  if (MEDIA_TAGS.some(tag => lower.includes(tag))) return false

  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()

  return text.length === 0
}
