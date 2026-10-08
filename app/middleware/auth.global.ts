import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  const { state } = useAuth()

  const publicPaths = ['/auth/sign-in', '/auth/reset-password', '/auth/forgot-password']

  // Allow public pages
  if (publicPaths.includes(to.path)) return

  // Require authentication
  if (!state.token) {
    return navigateTo('/auth/sign-in')
  }
})
