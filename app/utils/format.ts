const INTL_LOCALES: Record<string, string> = {
  en: 'en-US',
  id: 'id-ID'
}

export function toIntlLocale(locale: string): string {
  return INTL_LOCALES[locale] ?? 'en-US'
}

export function formatDate(value: string | Date | null | undefined, locale: string, fallback = '-'): string {
  if (!value) return fallback
  return new Date(value).toLocaleDateString(toIntlLocale(locale), {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export function formatDateTime(value: string | Date | null | undefined, locale: string, fallback = '-'): string {
  if (!value) return fallback
  return new Date(value).toLocaleString(toIntlLocale(locale), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

export function formatNumber(value: number | null | undefined, locale: string): string {
  return (value ?? 0).toLocaleString(toIntlLocale(locale))
}

type TranslateFn = (key: string, named?: Record<string, unknown>) => string

export function formatTimeAgo(value: string | Date | null | undefined, t: TranslateFn, fallback = '-'): string {
  if (!value) return fallback

  const diffSec = Math.floor((Date.now() - new Date(value).getTime()) / 1000)

  if (diffSec < 60) return t('common.timeAgo.justNow')
  if (diffSec < 3600) return t('common.timeAgo.minutes', { count: Math.floor(diffSec / 60) })
  if (diffSec < 86400) return t('common.timeAgo.hours', { count: Math.floor(diffSec / 3600) })
  return t('common.timeAgo.days', { count: Math.floor(diffSec / 86400) })
}

export function formatTime(value: string | Date | null | undefined, locale: string, fallback = '-'): string {
  if (!value) return fallback
  return new Date(value).toLocaleTimeString(toIntlLocale(locale), {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatFileSize(bytes: number, locale: string): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  return `${formatNumber(Math.round(bytes / 1024 ** index * 10) / 10, locale)} ${units[index]}`
}
