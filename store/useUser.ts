interface TUserData {
  user_id: number
  group_id?: number
  teacher_id?: number
  branch_id: number
  access_token: string
  is_student: boolean
}

function findNewKeys(oldObj: object, newObj: object) {
  const newKeys = {}

  for (const key in newObj) {
    if (!(key in oldObj)) {
      newKeys[key] = newObj[key]
    }
  }

  if (Object.keys(newKeys).length > 0) {
    return newKeys
  }

  return null
}

export const useUser = defineStore('useUser', () => {
  const log = useLogger('userStore')
  const data = ref<TUserData>(JSON.parse(localStorage.getItem('ktc_data')!) || {})

  function setAuthData(access_token: string, user_id: number) {
    data.value.access_token = access_token
    data.value.user_id = user_id
  }

  function logout() {
    localStorage.removeItem('ktc_data')
    return navigateTo('/auth', { external: true, replace: true })
  }

  watch(() => ({ ...data.value }), (upd, prev) => {
    localStorage.setItem('ktc_data', JSON.stringify(upd))
    log.success('Store was updated:', findNewKeys(prev, upd))
  }, {
    deep: true,
  })

  return { data, setAuthData, logout }
})
