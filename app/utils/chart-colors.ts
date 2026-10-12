export const CHART_COLORS = {
  primary: '#2D4E6F', // blue-500 (primary)
  success: '#009838', // green-500
  warning: '#D97706', // yellow-500
  danger: '#CC0007', // red-500
  info: '#6B8FB5' // blue-400
} as const

/** Palet kategorikal untuk donut/legend (mis. distribusi kategori artikel). */
export const CHART_CATEGORY_PALETTE = [
  '#2D4E6F', // blue-500
  '#009838', // green-500
  '#D97706', // yellow-500
  '#6B8FB5', // blue-400
  '#00802F', // green-600
  '#B66405', // yellow-600
  '#24405C', // blue-600
  '#E09237' // yellow-400
] as const

/** Warna aman kalau index palet melampaui jumlah warna yang tersedia. */
export const CHART_FALLBACK_COLOR = CHART_COLORS.primary
