import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useLogger } from '~/composables/useLogger'
import { useRouter } from '#imports'

interface TUserData {
  user_id: number
  group_id?: number
  teacher_id?: number
  branch_id: number
  access_token: string
  is_student: boolean
}

function findNewKeys(oldObj: Record<string, unknown>, newObj: Record<string, unknown>) {
  const newKeys: Record<string, unknown> = {}

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
  const router = useRouter()

  function setAuthData(access_token: string, user_id: number) {
    data.value.access_token = access_token
    data.value.user_id = user_id
  }

  function logout() {
    localStorage.removeItem('ktc_data')
    return router.push('/auth')
  }

  watch(() => ({ ...data.value }), (upd, prev) => {
    localStorage.setItem('ktc_data', JSON.stringify(upd))
    log.success('Store was updated:', findNewKeys(prev, upd))
  }, {
    deep: true,
  })

  return { data, setAuthData, logout }
})
