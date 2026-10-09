import type { ApiResponse, PaginationMeta } from './api'

export interface Faq {
  id: number
  question: string
  answer: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface FaqPayload {
  question: string
  answer: string
  order?: number
  isActive: boolean
}

export type { PaginationMeta, ApiResponse }
