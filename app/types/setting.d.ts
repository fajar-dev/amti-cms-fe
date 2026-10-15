export interface Setting {
  id: number
  phone: string | null
  whatsapp?: string | null
  email: string | null
  address: string | null
  mapsUrl?: string | null
  facebook: string | null
  instagram: string | null
  tiktok: string | null
  linkedin: string | null
  twitter: string | null
  youtube: string | null
  createdAt: string
  updatedAt: string
}

export interface SettingContactPayload {
  phone?: string | null
  whatsapp?: string | null
  email?: string | null
  address?: string | null
  mapsUrl?: string | null
}

export interface SettingSocialPayload {
  facebook?: string | null
  instagram?: string | null
  tiktok?: string | null
  linkedin?: string | null
  twitter?: string | null
  youtube?: string | null
}
