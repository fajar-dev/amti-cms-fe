export function trimOrNull(value?: string | null): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

export function trimRequired(value: string): string {
  return value.trim()
}
