export interface UpdateProfilePayload {
  name: string
  email: string
  phone?: string | null
  photo?: string | null
}

export interface UpdatePasswordPayload {
  oldPassword?: string
  newPassword: string
}
