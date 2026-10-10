import { apiService } from './api-service'
import { handleServiceError } from '../composables/error-helper'
import type {
  Setting,
  SettingPayload,
  SettingMetaPayload,
  SettingContactPayload,
  SettingSocialPayload,
  ApiResponse
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

  async updateMeta(payload: SettingMetaPayload): Promise<ApiResponse<Setting>> {
    try {
      const response = await apiService.client.put<ApiResponse<Setting>>(
        '/settings/meta',
        payload,
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
