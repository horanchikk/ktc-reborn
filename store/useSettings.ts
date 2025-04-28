import { hasKeys } from '~/helpers/obj/hasKeys'
import type { TSettings } from '~/types/settings'

export const useSettings = defineStore('useSettings', () => {
  const { public: { APP_VERSION } } = useRuntimeConfig()

  function getFromLS(): TSettings {
    const LS = localStorage.getItem('settings')

    if (LS) {
      const parsed: object = JSON.parse(LS)
      if (typeof parsed === 'object') {
        if (hasKeys(parsed, ['dark', 'dev', 'debug']))
          return parsed as TSettings
      }
    }

    const defaultSettings: TSettings = {
      dark: true,
      dev: APP_VERSION.includes('dev'),
      debug: false,
    }
    localStorage.setItem('settings', JSON.stringify(defaultSettings))

    return defaultSettings
  }

  function updateLS(val: object) {
    localStorage.setItem('settings', JSON.stringify(val))
  }

  const settings = ref<TSettings>(getFromLS())

  // Sync ref with localStorage
  watch(settings.value, (val) => {
    updateLS(val)
  })

  return {
    settings,
  }
})
