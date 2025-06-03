import { API } from '../api'
import type { Tota } from '~/types/ota'

class OTAModule extends API {
  async getVersion(isDev: boolean) {
    return await this.get<Tota>(`/updates/check${isDev ? '?prerelease=true' : ''}`)
  }
}

export default OTAModule

