import { apiService } from './api-service'
import { handleServiceError } from '../composables/error-helper'
import type { Setting, SettingPayload, ApiResponse } from '../types/setting'

export class SettingService {
  private get authHeaders() {
    return { headers: { Authorization: `Bearer ${useAuth().state.token}` } }
  }

  async get(): Promise<ApiResponse<Setting>> {
    try {
      const response = await apiService.client.get<ApiResponse<Setting>>(
        '/settings',
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async update(payload: SettingPayload): Promise<ApiResponse<Setting>> {
    try {
      const response = await apiService.client.put<ApiResponse<Setting>>(
        '/settings',
        payload,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getPublic(): Promise<ApiResponse<Setting>> {
    try {
      const response = await apiService.client.get<ApiResponse<Setting>>('/settings/public')
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async uploadFile(file: File): Promise<ApiResponse<{ path: string }>> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await apiService.client.post<ApiResponse<{ path: string }>>(
        '/upload',
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
}

export const settingService = new SettingService()
