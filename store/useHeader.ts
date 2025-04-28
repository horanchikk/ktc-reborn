interface MenuRoute {
  name: string
  icon: string
  action: () => void
}

export const useHeader = defineStore('useHeader', () => {
  const log = useLogger('useHeader')
  const menu = ref<[] | MenuRoute[]>([])
  const router = useRouter()

  function setAdditionalMenu(params: MenuRoute[]) {
    setTimeout(() => {
      log.info(params)
      menu.value = params
    }, 300)
  }

  watch(() => router.currentRoute.value, () => {
    menu.value = []
  })

  return { menu, setAdditionalMenu }
})
