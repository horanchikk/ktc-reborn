import { useApi } from './useApi'

export function useNewsApi() {
  const { checkModule } = useApi()
  const log = useLogger('NewsApi')

  try {
    const newsModule = checkModule('news')
    return {
      news: newsModule,
    }
  } catch (e) {
    log.error('Ошибка инициализации NewsApi:', e)
    return {
      news: null,
    }
  }
} 