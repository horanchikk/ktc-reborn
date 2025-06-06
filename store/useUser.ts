import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useLogger } from '~/composables/useLogger'
import { useRouter } from '#imports'

interface TUserData {
  user_id?: number
  group_id?: number
  teacher_id?: number
  branch_id?: number
  access_token?: string
  is_student?: boolean
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
  const router = useRouter()
  
  let initialData: TUserData = {}
  try {
    const storedData = localStorage.getItem('ktc_data')
    if (storedData) {
      initialData = JSON.parse(storedData)
    }
  } catch (e) {
    log.error('Ошибка при чтении данных пользователя из localStorage:', e)
  }
  
  const data = ref<TUserData>(initialData)

  function setAuthData(access_token: string, user_id: number) {
    data.value.access_token = access_token
    data.value.user_id = user_id
  }

  function logout() {
    localStorage.removeItem('ktc_data')
    data.value = {}
    return router.push('/auth')
  }

  watch(() => ({ ...data.value }), (upd, prev) => {
    try {
      localStorage.setItem('ktc_data', JSON.stringify(upd))
      log.success('Store was updated:', findNewKeys(prev, upd))
    } catch (e) {
      log.error('Ошибка при сохранении данных пользователя в localStorage:', e)
    }
  }, {
    deep: true,
  })

  return { data, setAuthData, logout }
})
