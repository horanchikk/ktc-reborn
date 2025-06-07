import { useApi } from './useApi'

export function useUserApi() {
  const { checkModule } = useApi()
  const log = useLogger('UserApi')

  try {
    const userModule = checkModule('user')
    return {
      user: userModule,
    }
  } catch (e) {
    log.error('Ошибка инициализации UserApi:', e)
    reloadNuxtApp({
      force: true
    })
    return {
      user: null,
    }
  }
} 