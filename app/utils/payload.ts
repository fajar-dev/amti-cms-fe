/**
 * Helper pembentukan payload form.
 */

/** String kosong / whitespace → `null`. Dipakai field opsional. */
export function trimOrNull(value?: string | null): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

/** String wajib: hanya di-trim, tidak pernah jadi `null`. */
export function trimRequired(value: string): string {
  return value.trim()
}
