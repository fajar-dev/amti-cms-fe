import { apiService } from './api-service'
import { handleServiceError } from '../composables/error-helper'
import type { Faq, FaqPayload, ApiResponse } from '../types/faq'
import type { SortOrder } from '../composables/useTableQuery'

export class FaqService {
  private get authHeaders() {
    return { headers: { Authorization: `Bearer ${useAuth().state.token}` } }
  }

  async getAll(
    page = 1,
    perPage = 10,
    q = '',
    sortBy = '',
    order: SortOrder = 'ASC',
    isActive?: boolean
  ): Promise<ApiResponse<Faq[]>> {
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(perPage), q })
      if (sortBy) {
        params.set('sortBy', sortBy)
        params.set('order', order)
      }
      if (isActive !== undefined) {
        params.set('isActive', String(isActive))
      }
      const response = await apiService.client.get<ApiResponse<Faq[]>>(
        `/faq?${params.toString()}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getById(id: number): Promise<ApiResponse<Faq>> {
    try {
      const response = await apiService.client.get<ApiResponse<Faq>>(
        `/faq/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async create(payload: FaqPayload): Promise<ApiResponse<Faq>> {
    try {
      const response = await apiService.client.post<ApiResponse<Faq>>(
        `/faq`,
        payload,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async update(id: number, payload: Partial<FaqPayload>): Promise<ApiResponse<Faq>> {
    try {
      const response = await apiService.client.put<ApiResponse<Faq>>(
        `/faq/${id}`,
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
        `/faq/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }
}

export const faqService = new FaqService()
