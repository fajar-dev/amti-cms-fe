import type { ApiResponse, PaginationMeta } from './api'

export interface Message {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateMessagePayload {
  name: string
  email: string
  phone?: string | null
  subject: string
  message: string
}

export interface UpdateMessageStatusPayload {
  isRead: boolean
}

export type { PaginationMeta, ApiResponse }
