import { apiService } from './api-service'
import { handleServiceError } from '../composables/error-helper'
import type { Role, RolePayload, PermissionsData } from '../types/rbac'
import type { ApiResponse } from '../types/api'
import type { SortOrder } from '../composables/useTableQuery'

export class RbacService {
  private get authHeaders() {
    return { headers: { Authorization: `Bearer ${useAuth().state.token}` } }
  }

  async getAll(
    page = 1,
    perPage = 10,
    q = '',
    sortBy = '',
    order: SortOrder = 'ASC'
  ): Promise<ApiResponse<Role[]>> {
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(perPage), q })
      if (sortBy) {
        params.set('sortBy', sortBy)
        params.set('order', order)
      }
      const response = await apiService.client.get<ApiResponse<Role[]>>(
        `/rbac/roles?${params.toString()}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getAllList(): Promise<ApiResponse<Array<{ id: number, name: string }>>> {
    try {
      const response = await apiService.client.get<ApiResponse<Array<{ id: number, name: string }>>>(
        `/rbac/roles/all`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getById(id: number): Promise<ApiResponse<Role>> {
    try {
      const response = await apiService.client.get<ApiResponse<Role>>(
        `/rbac/roles/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async create(payload: RolePayload): Promise<ApiResponse<Role>> {
    try {
      const response = await apiService.client.post<ApiResponse<Role>>(
        `/rbac/roles`,
        payload,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async update(id: number, payload: Partial<RolePayload>): Promise<ApiResponse<Role>> {
    try {
      const response = await apiService.client.put<ApiResponse<Role>>(
        `/rbac/roles/${id}`,
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
        `/rbac/roles/${id}`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }

  async getPermissions(): Promise<ApiResponse<PermissionsData>> {
    try {
      const response = await apiService.client.get<ApiResponse<PermissionsData>>(
        `/rbac/permissions`,
        this.authHeaders
      )
      return response.data
    } catch (error) {
      return handleServiceError(error)
    }
  }
}

export const rbacService = new RbacService()
