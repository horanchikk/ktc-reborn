import { useOTAStore } from '~/store/useOTAStore'

export default defineNuxtPlugin(async () => {
  const otaStore = useOTAStore()
  
  await otaStore.checkForUpdates()
}) 