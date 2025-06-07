import { useApi } from './useApi'

export function useBlogApi() {
  const { checkModule } = useApi()
  const log = useLogger('BlogApi')

  try {
    const blogModule = checkModule('blog')
    return {
      blog: blogModule,
    }
  } catch (e) {
    log.error('Ошибка инициализации BlogApi:', e)
    reloadNuxtApp({
      force: true
    })
    return {
      blog: null,
    }
  }
} 