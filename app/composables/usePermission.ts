import { useAuth } from './useAuth'

export const usePermission = () => {
  const { state } = useAuth()

  const permissions = computed<string[]>(() => {
    return state.user?.role?.permissions || []
  })

  const role = computed(() => {
    return state.user?.role || null
  })

  const hasPermission = (permission: string): boolean => {
    if (!state.user || !state.user.role) return false
    return permissions.value.includes(permission)
  }

  const hasAnyPermission = (perms: string[]): boolean => {
    if (!state.user || !state.user.role) return false
    return perms.some(p => permissions.value.includes(p))
  }

  const hasAllPermissions = (perms: string[]): boolean => {
    if (!state.user || !state.user.role) return false
    return perms.every(p => permissions.value.includes(p))
  }

  const can = (permission: string): boolean => hasPermission(permission)

  return {
    role,
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    can
  }
}
