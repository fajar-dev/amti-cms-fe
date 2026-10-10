import type { ApiResponse } from './api'

export interface Setting {
  id: number
  siteName: string
  siteDescription: string | null
  metaKeywords: string | null
  author: string | null
  copyright: string | null
  logo: string | null
  logoUrl?: string | null
  favicon: string | null
  faviconUrl?: string | null
  ogImage: string | null
  ogImageUrl?: string | null
  phone: string | null
  email: string | null
  address: string | null
  facebook: string | null
  instagram: string | null
  tiktok: string | null
  linkedin: string | null
  twitter: string | null
  youtube: string | null
  createdAt: string
  updatedAt: string
}

export interface SettingPayload {
  siteName: string
  siteDescription?: string | null
  metaKeywords?: string | null
  author?: string | null
  copyright?: string | null
  logo?: string | null
  favicon?: string | null
  ogImage?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  facebook?: string | null
  instagram?: string | null
  tiktok?: string | null
  linkedin?: string | null
  twitter?: string | null
  youtube?: string | null
}

export type { ApiResponse }
