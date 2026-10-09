import { useAuth } from '~/composables/useAuth'

// Protected routes pattern to required permission
const ROUTE_PERMISSIONS: Array<{ pattern: RegExp, permission: string }> = [
  { pattern: /^\/roles(\/.*)?$/, permission: 'roles.view' },
  { pattern: /^\/user(\/.*)?$/, permission: 'users.view' },
  { pattern: /^\/content\/category(\/.*)?$/, permission: 'categories.view' },
  { pattern: /^\/content\/article\/create$/, permission: 'articles.create' },
  { pattern: /^\/content\/article\/[^/]+$/, permission: 'articles.update' },
  { pattern: /^\/content\/article$/, permission: 'articles.view' },
  { pattern: /^\/faq(\/.*)?$/, permission: 'faqs.view' }
]

export default defineNuxtRouteMiddleware(async (to) => {
  const { state, service } = useAuth()

  const publicPaths = ['/auth/sign-in', '/auth/reset-password', '/auth/forgot-password']

  // Allow public pages
  if (publicPaths.includes(to.path)) return

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
    if (!userPermissions.includes(matchedRule.permission)) {
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
      return navigateTo('/')
    }
  }
})
