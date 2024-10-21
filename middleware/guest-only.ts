import { useUser } from '~/store/useUser'

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {
    const app = useNuxtApp()
    const user = useUser(app.$pinia)

    if (user.data.access_token !== undefined) {
      return navigateTo('/profile')
    }
  }
})
