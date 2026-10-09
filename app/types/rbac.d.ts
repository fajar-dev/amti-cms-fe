export interface Permission {
  id: number
  name: string
  module: string
  description: string | null
}

export interface RoleUser {
  id: number
  name: string
  email: string
  photo: string | null
}

export interface Role {
  id: number
  name: string
  description: string | null
  permissions?: Permission[]
  permissionCount?: number
  userCount?: number
  users?: RoleUser[]
  createdAt: string
  updatedAt: string
}

export interface RolePayload {
  name: string
  description?: string
  permissionIds: number[]
}

export interface PermissionsData {
  flat: Permission[]
  grouped: Record<string, Permission[]>
}
