export interface User {
  id: number
  name: string
  email: string
  photo: string | null
  isActive: boolean
  roleId?: number | null
  role?: {
    id: number
    name: string
    displayName: string
  } | null
  createdAt: string
}

export interface UserPayload {
  name: string
  email: string
  password?: string
  photo?: string | null
  isActive: boolean
  roleId?: number | null
}
