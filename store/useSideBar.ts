export const useSideBar = defineStore('useSideBar', () => {
  const isVisible = ref(false)
  const isRendered = ref(false)
  const log = useLogger('useSidebar')

  function show() {
    log.log('show')
    if (isRendered.value === false) {
      isRendered.value = true
      isVisible.value = true
    }
  }
  function hide() {
    log.log('hide')
    isVisible.value = false
    setTimeout(() => {
      isRendered.value = false
    }, 500)
  }

  if (import.meta.dev) {
    watch(isRendered, val => log.log(`isRendered: ${val}`))
    watch(isVisible, val => log.log(`isVisible: ${val}`))
  }

  return { isVisible, isRendered, show, hide }
})
