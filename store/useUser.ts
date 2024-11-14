interface TUserData {
  user_id: number
  access_token: string
  branch: number
  isStudent: boolean
}

export const useUser = defineStore('useUser', () => {
  const log = useLogger('useUser')
  const data = ref<TUserData>(JSON.parse(localStorage.getItem('ktc_data')) || {})

  function setAuthData(access_token: string, user_id: number) {
    data.value.access_token = access_token
    data.value.user_id = user_id
  }

  function logout() {
    localStorage.removeItem('ktc_data')
    return navigateTo('/auth', { external: true, replace: true })
  }

  watch(data.value, (upd, prev) => {
    localStorage.setItem('ktc_data', JSON.stringify(upd))
    log.success('Store was updated:', JSON.stringify(upd), JSON.stringify(prev))
  })

  return { data, setAuthData, logout }
})
