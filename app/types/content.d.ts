import type { ApiResponse, PaginationMeta } from './api'

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  createdAt: string
  updatedAt: string
}

export interface CategoryPayload {
  name: string
  slug?: string
  description?: string
}

export type ArticleStatus = 'draft' | 'publish'

export interface Article {
  id: number
  categoryId: number | null
  category: Category | null
  title: string
  slug: string
  cover: string | null
  coverUrl: string | null
  content: string
  tags: string[]
  status: ArticleStatus
  metaTitle: string | null
  metaDescription: string | null
  metaKeywords: string | null
  canonicalUrl: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogImage: string | null
  viewsCount: number
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface ArticlePayload {
  title: string
  slug?: string
  categoryId?: number | null
  cover?: string | null
  content: string
  tags?: string[]
  status?: ArticleStatus
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}

export interface ArticleView {
  id: number
  articleId: number
  ipAddress: string | null
  userAgent: string | null
  referrer: string | null
  userId: number | null
  viewedAt: string
}

export type { PaginationMeta, ApiResponse }
