import { apiService } from './api-service'
import { handleServiceError } from '../composables/error-helper'
import type { ApiResponse } from '../types/api'
import type { Client, ClientPayload } from '../types/client'
import type { SortOrder } from '../composables/useTableQuery'

export class ClientService {
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
  ): Promise<ApiResponse<Client[]>> {
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(perPage), q })
      if (sortBy) {
        params.set('sortBy', sortBy)
        params.set('order', order)
      }
      if (isActive !== undefined) {
        params.set('isActive', String(isActive))
      }
      const response = await apiService.client.get<ApiResponse<Client[]>>(
        `/client?${params.toString()}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getPublic(): Promise<ApiResponse<Client[]>> {
    try {
      const response = await apiService.client.get<ApiResponse<Client[]>>('/clients')
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getById(id: number): Promise<ApiResponse<Client>> {
    try {
      const response = await apiService.client.get<ApiResponse<Client>>(
        `/client/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async create(payload: ClientPayload): Promise<ApiResponse<Client>> {
    try {
      const response = await apiService.client.post<ApiResponse<Client>>(
        '/client',
        payload,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async update(id: number, payload: Partial<ClientPayload>): Promise<ApiResponse<Client>> {
    try {
      const response = await apiService.client.put<ApiResponse<Client>>(
        `/client/${id}`,
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
        `/client/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async uploadLogo(file: File): Promise<ApiResponse<{ path: string }>> {
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

export const clientService = new ClientService()
