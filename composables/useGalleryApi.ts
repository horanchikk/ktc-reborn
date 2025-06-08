import { useApi } from './useApi'

export function useGalleryApi() {
  const { checkModule } = useApi()
  const log = useLogger('GalleryApi')

  try {
    const galleryModule = checkModule('gallery')
    return {
      gallery: galleryModule,
    }
  } catch (e) {
    log.error('Ошибка инициализации GalleryApi:', e)
    reloadNuxtApp({
      persistState: true
    })
    return {
      gallery: null,
    }
  }
} 