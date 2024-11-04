import { useUser } from '~/store/useUser'

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {
    const { $pinia } = useNuxtApp()
    const user = useUser($pinia)

    if (user.data.access_token !== undefined) {
      return navigateTo('/profile')
    }
  }
})
