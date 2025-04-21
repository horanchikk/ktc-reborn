import type { UserData } from '~/types/userData'
import { useApi } from '~/composables/useApi'

class UserModule {
  api = useApi('UserModule')

  async getInfo(access_token: string) {
    return await this.api.get<UserData>(
      `/user/info?access_token=${access_token}`,
    )
  }
}

export default UserModule
