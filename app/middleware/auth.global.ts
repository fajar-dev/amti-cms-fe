import { useAuth } from '~/composables/useAuth'

// Protected routes pattern to required permission
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
  const { state, service } = useAuth()

  const publicPaths = ['/auth/sign-in', '/auth/reset-password', '/auth/forgot-password']

  // Allow public pages
  if (publicPaths.includes(to.path)) return

  // Redirect root path to /app or auth
  if (to.path === '/') {
    return navigateTo(state.token ? '/app' : '/auth/sign-in')
  }

  // Require authentication
  if (!state.token) {
    return navigateTo('/auth/sign-in')
  }

  // Ensure user and role information is populated
  if (!state.user?.role) {
    await service.ensureUserLoaded()
  }

  // Match protected routes
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
          // Toast fallback
        }
      }
      return navigateTo('/app')
    }
  }
})
