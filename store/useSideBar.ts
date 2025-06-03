export const useSideBar = defineStore('useSideBar', () => {
  const isVisible = ref(false)
  const isRendered = ref(false)

  function show() {
    if (isRendered.value === false) {
      isRendered.value = true
      isVisible.value = true
    }
  }
  function hide() {
    isVisible.value = false
    setTimeout(() => {
      isRendered.value = false
    }, 500)
  }

  return { isVisible, isRendered, show, hide }
})
