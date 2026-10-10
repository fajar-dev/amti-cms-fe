import { apiService } from './api-service'
import { handleServiceError } from '../composables/error-helper'
import type {
  DashboardSummary,
  ViewsTrendItem,
  ArticlesByCategoryItem,
  MessagesTrendItem,
  DashboardRecentArticle,
  DashboardRecentMessage
} from '../types/dashboard'
import type { ApiResponse } from '../types/content'

export class DashboardService {
  private get authHeaders() {
    return { headers: { Authorization: `Bearer ${useAuth().state.token}` } }
  }

  async getSummary(): Promise<ApiResponse<DashboardSummary>> {
    try {
      const response = await apiService.client.get<ApiResponse<DashboardSummary>>(
        '/dashboard/summary',
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getViewsTrend(days = 7): Promise<ApiResponse<ViewsTrendItem[]>> {
    try {
      const response = await apiService.client.get<ApiResponse<ViewsTrendItem[]>>(
        `/dashboard/views-trend?days=${days}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getCategoriesDistribution(): Promise<ApiResponse<ArticlesByCategoryItem[]>> {
    try {
      const response = await apiService.client.get<ApiResponse<ArticlesByCategoryItem[]>>(
        '/dashboard/categories-distribution',
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getMessagesTrend(months = 6): Promise<ApiResponse<MessagesTrendItem[]>> {
    try {
      const response = await apiService.client.get<ApiResponse<MessagesTrendItem[]>>(
        `/dashboard/messages-trend?months=${months}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getRecentArticles(limit = 5): Promise<ApiResponse<DashboardRecentArticle[]>> {
    try {
      const response = await apiService.client.get<ApiResponse<DashboardRecentArticle[]>>(
        `/dashboard/recent-articles?limit=${limit}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getRecentMessages(limit = 5): Promise<ApiResponse<DashboardRecentMessage[]>> {
    try {
      const response = await apiService.client.get<ApiResponse<DashboardRecentMessage[]>>(
        `/dashboard/recent-messages?limit=${limit}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }
}

export const dashboardService = new DashboardService()
