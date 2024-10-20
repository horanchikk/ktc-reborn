import { useUser } from '~/store/useUser'

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {
    console.log(useUser().data)
  }
})
