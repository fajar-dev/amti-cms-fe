export interface Client {
  id: number
  name: string
  logo: string
  logoUrl?: string | null
  website: string | null
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ClientPayload {
  name: string
  logo: string
  website?: string | null
  order?: number
  isActive: boolean
}
