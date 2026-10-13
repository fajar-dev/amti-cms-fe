import { useAuth } from '~/composables/useAuth'

const ROUTE_PERMISSIONS: Array<{ pattern: RegExp, permissions: string[] }> = [
  { pattern: /^\/app\/roles(\/.*)?$/, permissions: ['roles.view'] },
  { pattern: /^\/app\/user(\/.*)?$/, permissions: ['users.view'] },
  { pattern: /^\/app\/content\/category(\/.*)?$/, permissions: ['categories.view'] },
  { pattern: /^\/app\/content\/article\/create$/, permissions: ['articles.create'] },
  { pattern: /^\/app\/content\/article\/[^/]+$/, permissions: ['articles.update'] },
  { pattern: /^\/app\/content\/article$/, permissions: ['articles.view'] },
  { pattern: /^\/app\/faq(\/.*)?$/, permissions: ['faqs.view'] },
  { pattern: /^\/app\/messages(\/.*)?$/, permissions: ['messages.view'] },
  { pattern: /^\/app\/settings\/meta$/, permissions: ['settings.meta.view', 'settings.view'] },
  { pattern: /^\/app\/settings\/contact$/, permissions: ['settings.contact.view', 'settings.view'] },
  { pattern: /^\/app\/settings\/social$/, permissions: ['settings.social.view', 'settings.view'] },
  { pattern: /^\/app\/settings(\/.*)?$/, permissions: ['settings.view', 'settings.meta.view', 'settings.contact.view', 'settings.social.view'] }
]

export default defineNuxtRouteMiddleware(async (to) => {
  const isProtectedRoute = to.path.startsWith('/app')
  if (!isProtectedRoute) {
    return
  }

  const { state, service } = useAuth()

  if (!state.token) {
    return navigateTo('/auth/sign-in')
  }

  if (!state.user?.role) {
    await service.ensureUserLoaded()
  }

  const matchedRule = ROUTE_PERMISSIONS.find(rule => rule.pattern.test(to.path))
  if (matchedRule) {
    const userPermissions = state.user?.role?.permissions || []
    const hasPermission = matchedRule.permissions.some(p => userPermissions.includes(p))
    if (!hasPermission) {
      if (import.meta.client) {
        try {
          const toast = useToast()
          toast.add({
            title: 'Akses Ditolak',
            description: 'Anda tidak memiliki izin untuk mengakses halaman ini.',
            icon: 'i-lucide-circle-x',
            color: 'error'
          })
        } catch {
          /* ignore */
        }
      }
      return navigateTo('/app')
    }
  }
})
