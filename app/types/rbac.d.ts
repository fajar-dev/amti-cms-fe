export interface Permission {
  id: number
  name: string
  module: string
  description: string | null
}

export interface Role {
  id: number
  name: string
  displayName: string
  description: string | null
  isSystem: boolean
  permissions?: Permission[]
  permissionCount?: number
  userCount?: number
  createdAt: string
  updatedAt: string
}

export interface RolePayload {
  name: string
  displayName: string
  description?: string
  permissionIds: number[]
}

export interface PermissionsData {
  flat: Permission[]
  grouped: Record<string, Permission[]>
}
