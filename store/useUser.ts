interface TUserData {
  user_id: number
  access_token: string
}

export const useUser = defineStore('useUser', () => {
  const log = useLogger('useUser')
  const data = ref<TUserData>(JSON.parse(localStorage.getItem('ktc_auth')) || {})
  const isStudent = ref(null)

  function setUserData(obj: TUserData) {
    data.value = obj
    localStorage.setItem('ktc_auth', JSON.stringify(obj))
    log.success('Store was updated:', JSON.stringify(obj))
  }

  function logout() {
    localStorage.removeItem('ktc_auth')
    return navigateTo('/auth', { external: true, replace: true })
  }

  return { data, setUserData, isStudent, logout }
})
