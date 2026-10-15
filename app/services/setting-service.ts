import { apiService } from './api-service'
import { handleServiceError } from '../composables/error-helper'
import type { ApiResponse } from '../types/api'
import type {
  Setting,
  SettingContactPayload,
  SettingSocialPayload
} from '../types/setting'

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

  async updateContact(payload: SettingContactPayload): Promise<ApiResponse<Setting>> {
    try {
      const response = await apiService.client.put<ApiResponse<Setting>>(
        '/settings/contact',
        payload,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async updateSocial(payload: SettingSocialPayload): Promise<ApiResponse<Setting>> {
    try {
      const response = await apiService.client.put<ApiResponse<Setting>>(
        '/settings/social',
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
}

export const settingService = new SettingService()
