/**
 * Format tanggal & waktu yang mengikuti locale i18n aktif.
 */

/** Kode locale i18n → locale Intl. */
const INTL_LOCALES: Record<string, string> = {
  en: 'en-US',
  id: 'id-ID'
}

export function toIntlLocale(locale: string): string {
  return INTL_LOCALES[locale] ?? 'en-US'
}

/** Contoh: `12 Okt 2026` */
export function formatDate(value: string | Date | null | undefined, locale: string, fallback = '-'): string {
  if (!value) return fallback
  return new Date(value).toLocaleDateString(toIntlLocale(locale), {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

/** Contoh: `12 Okt 2026, 14.30` */
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

/** Contoh: `12.345` (id) / `12,345` (en) */
export function formatNumber(value: number | null | undefined, locale: string): string {
  return (value ?? 0).toLocaleString(toIntlLocale(locale))
}

type TranslateFn = (key: string, named?: Record<string, unknown>) => string

/**
 * Contoh: `3 jam lalu`.
 * Teksnya lewat i18n (bukan hardcode Bahasa Indonesia) supaya ikut bahasa aktif.
 */
export function formatTimeAgo(value: string | Date | null | undefined, t: TranslateFn, fallback = '-'): string {
  if (!value) return fallback

  const diffSec = Math.floor((Date.now() - new Date(value).getTime()) / 1000)

  if (diffSec < 60) return t('common.timeAgo.justNow')
  if (diffSec < 3600) return t('common.timeAgo.minutes', { count: Math.floor(diffSec / 60) })
  if (diffSec < 86400) return t('common.timeAgo.hours', { count: Math.floor(diffSec / 3600) })
  return t('common.timeAgo.days', { count: Math.floor(diffSec / 86400) })
}
