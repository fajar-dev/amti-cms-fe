import { apiService } from './api-service'
import { handleServiceError } from '../composables/error-helper'
import type { DashboardStats } from '../types/dashboard'
import type { ApiResponse } from '../types/content'

export class DashboardService {
  private get authHeaders() {
    return { headers: { Authorization: `Bearer ${useAuth().state.token}` } }
  }

  async getStats(): Promise<ApiResponse<DashboardStats>> {
    try {
      const response = await apiService.client.get<ApiResponse<DashboardStats>>(
        '/dashboard/stats',
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }
}

export const dashboardService = new DashboardService()
