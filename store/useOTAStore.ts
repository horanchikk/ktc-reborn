import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useOTA } from '../composables/useOTA'
import { useLogger } from '../composables/useLogger'

export const useOTAStore = defineStore('ota', () => {
  const showForm = ref(false)
  const update = ref<[boolean, string, string, string] | undefined>()
  const description = ref<{ features: string[], bugfixes: string[] }>()
  const log = useLogger('OTAStore')

  async function checkForUpdates() {
    try {
      const { needsUpdate, getDescription } = await useOTA()
      const updateInfo = needsUpdate()
      if (updateInfo) {
        log.info('Получена информация об обновлении:', updateInfo)
        if (updateInfo[0]) {
          update.value = updateInfo as [boolean, string, string, string]
          description.value = getDescription()
          showForm.value = true
          log.info('Форма обновления открыта')
        } else {
          log.info('Обновлений не обнаружено')
          return false
        }
      }
    } catch (error) {
      log.error('Ошибка проверки обновлений:', error)
    }
  }

  function closeForm() {
    showForm.value = false
    log.info('Форма обновления закрыта')
  }

  return {
    showForm,
    update,
    description,
    checkForUpdates,
    closeForm
  }
}) 