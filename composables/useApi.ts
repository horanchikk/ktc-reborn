import { useNuxtApp } from '#app'
import type { IApiInstance } from '~/plugins/api.client'

export function useApi() {
  const { $api } = useNuxtApp()

  function checkModule<T extends keyof IApiInstance>(moduleName: T): IApiInstance[T] {
    if (!$api?.[moduleName]) {
      throw new Error(`Модуль ${moduleName} не инициализирован`)
    }
    return $api[moduleName]
  }

  return {
    api: $api,
    checkModule,
  }
} 