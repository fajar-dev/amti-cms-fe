/**
 * Preview file lokal sebelum di-upload.
 *
 * Setiap object URL HARUS di-revoke lewat `revokePreviewUrl` saat preview diganti,
 * di-rollback, atau komponen di-unmount — kalau tidak, blob-nya tertahan di memori.
 */
export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file)
}

export function revokePreviewUrl(url: string | null | undefined): void {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url)
  }
}
