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
  authorId?: number | null
  author?: {
    id: number
    name: string
    email: string
    photo?: string | null
  } | null
  categoryId: number | null
  category: Category | null
  title: string
  slug: string
  description?: string
  cover: string | null
  coverUrl: string | null
  content: string
  tags: string[]
  status: ArticleStatus
  viewsCount: number
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface ArticlePayload {
  title: string
  slug?: string
  authorId?: number | null
  categoryId?: number | null
  description?: string
  cover?: string | null
  content: string
  tags?: string[]
  status?: ArticleStatus
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
