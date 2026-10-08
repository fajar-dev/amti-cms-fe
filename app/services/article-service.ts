import { apiService } from './api-service'
import { handleServiceError } from '../composables/error-helper'
import type { Article, ArticlePayload, ArticleStatus, ArticleView, ApiResponse } from '../types/content'
import type { SortOrder } from '../composables/useTableQuery'

export interface ArticleQueryFilters {
  categoryId?: number | ''
  status?: ArticleStatus | ''
}

export class ArticleService {
  private get authHeaders() {
    return { headers: { Authorization: `Bearer ${useAuth().state.token}` } }
  }

  async getAll(
    page = 1,
    perPage = 10,
    q = '',
    filters: ArticleQueryFilters = {},
    sortBy = '',
    order: SortOrder = 'DESC'
  ): Promise<ApiResponse<Article[]>> {
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(perPage), q })
      if (filters.categoryId) params.set('categoryId', String(filters.categoryId))
      if (filters.status) params.set('status', filters.status)
      if (sortBy) {
        params.set('sortBy', sortBy)
        params.set('order', order)
      }
      const response = await apiService.client.get<ApiResponse<Article[]>>(
        `/content/articles?${params.toString()}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getById(id: number): Promise<ApiResponse<Article>> {
    try {
      const response = await apiService.client.get<ApiResponse<Article>>(
        `/content/articles/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getBySlug(slug: string): Promise<ApiResponse<Article>> {
    try {
      const response = await apiService.client.get<ApiResponse<Article>>(
        `/content/articles/slug/${slug}`
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async create(payload: ArticlePayload): Promise<ApiResponse<Article>> {
    try {
      const response = await apiService.client.post<ApiResponse<Article>>(
        `/content/articles`,
        payload,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async update(id: number, payload: ArticlePayload): Promise<ApiResponse<Article>> {
    try {
      const response = await apiService.client.put<ApiResponse<Article>>(
        `/content/articles/${id}`,
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
        `/content/articles/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async uploadCover(file: File): Promise<ApiResponse<{ path: string }>> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await apiService.client.post<ApiResponse<{ path: string }>>(
        `/upload`,
        formData,
        {
          headers: {
            ...this.authHeaders.headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async recordView(id: number, referrer?: string): Promise<ApiResponse<ArticleView>> {
    try {
      const response = await apiService.client.post<ApiResponse<ArticleView>>(
        `/content/articles/${id}/view`,
        { referrer }
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getViews(id: number, limit = 50): Promise<ApiResponse<ArticleView[]>> {
    try {
      const response = await apiService.client.get<ApiResponse<ArticleView[]>>(
        `/content/articles/${id}/views?limit=${limit}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }
}

export const articleService = new ArticleService()
