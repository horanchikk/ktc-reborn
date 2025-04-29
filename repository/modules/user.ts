import { API } from '../api'
import type { UserData } from '~/types/userData'

interface TLoginReq {
  login: string
  password: string
}

interface TLoginRes {
  access_token: string
  user_id: number
}

class UserModule extends API {
  async getInfo(access_token: string) {
    return await this.get<UserData>(
      `/user/info?access_token=${access_token}`,
    )
  }

  async login(data: TLoginReq) {
    return await this.post<TLoginRes>(
      `/user/login`,
      data,
    )
  }
}

export default UserModule
