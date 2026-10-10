import { apiService } from './api-service'
import { handleServiceError } from '../composables/error-helper'
import type { Message, CreateMessagePayload, UpdateMessageStatusPayload, ApiResponse } from '../types/message'
import type { SortOrder } from '../composables/useTableQuery'

export class MessageService {
  private get authHeaders() {
    return { headers: { Authorization: `Bearer ${useAuth().state.token}` } }
  }

  async getAll(
    page = 1,
    perPage = 10,
    q = '',
    sortBy = '',
    order: SortOrder = 'DESC',
    isRead?: boolean
  ): Promise<ApiResponse<Message[]>> {
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(perPage), q })
      if (sortBy) {
        params.set('sortBy', sortBy)
        params.set('order', order)
      }
      if (isRead !== undefined) {
        params.set('isRead', String(isRead))
      }
      const response = await apiService.client.get<ApiResponse<Message[]>>(
        `/messages?${params.toString()}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getById(id: number): Promise<ApiResponse<Message>> {
    try {
      const response = await apiService.client.get<ApiResponse<Message>>(
        `/messages/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async create(payload: CreateMessagePayload): Promise<ApiResponse<Message>> {
    try {
      const response = await apiService.client.post<ApiResponse<Message>>(
        '/messages',
        payload
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async updateStatus(id: number, isRead: boolean): Promise<ApiResponse<Message>> {
    try {
      const payload: UpdateMessageStatusPayload = { isRead }
      const response = await apiService.client.put<ApiResponse<Message>>(
        `/messages/${id}/read`,
        payload,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    try {
      const response = await apiService.client.delete<ApiResponse<null>>(
        `/messages/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }
}

export const messageService = new MessageService()
