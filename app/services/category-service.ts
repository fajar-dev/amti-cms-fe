import { apiService } from './api-service'
import { handleServiceError } from '../composables/error-helper'
import type { Category, CategoryPayload, ApiResponse } from '../types/content'
import type { SortOrder } from '../composables/useTableQuery'

export class CategoryService {
  private get authHeaders() {
    return { headers: { Authorization: `Bearer ${useAuth().state.token}` } }
  }

  async getAll(page = 1, perPage = 10, q = '', sortBy = '', order: SortOrder = 'DESC'): Promise<ApiResponse<Category[]>> {
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(perPage), q })
      if (sortBy) {
        params.set('sortBy', sortBy)
        params.set('order', order)
      }
      const response = await apiService.client.get<ApiResponse<Category[]>>(
        `/content/categories?${params.toString()}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getAllList(): Promise<ApiResponse<Category[]>> {
    try {
      const response = await apiService.client.get<ApiResponse<Category[]>>(
        `/content/categories/all`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getById(id: number): Promise<ApiResponse<Category>> {
    try {
      const response = await apiService.client.get<ApiResponse<Category>>(
        `/content/categories/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async create(payload: CategoryPayload): Promise<ApiResponse<Category>> {
    try {
      const response = await apiService.client.post<ApiResponse<Category>>(
        `/content/categories`,
        payload,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async update(id: number, payload: CategoryPayload): Promise<ApiResponse<Category>> {
    try {
      const response = await apiService.client.put<ApiResponse<Category>>(
        `/content/categories/${id}`,
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
        `/content/categories/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }
}

export const categoryService = new CategoryService()
