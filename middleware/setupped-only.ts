import { useUser } from '~/store/useUser'

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {
    const { $pinia } = useNuxtApp()
    const user = useUser($pinia)

    if (!(Object.hasOwn(user.data, 'isStudent') && Object.hasOwn(user.data, 'branch'))) {
      return navigateTo('/setup/branch')
    }
  }
})
