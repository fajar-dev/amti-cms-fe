import type { ApiResponse } from './api'

export interface UserRole {
  id: number
  name: string
  permissions: string[]
}

export interface User {
  id: number
  name: string
  email: string
  photo: string
  isActive: boolean
  hasPassword?: boolean
  role?: UserRole | null
  roleId?: number | null
}

export interface AuthData {
  user: User
  accessToken: string
  refreshToken: string
}

export type { ApiResponse }
export type AuthResponse = ApiResponse<AuthData>
