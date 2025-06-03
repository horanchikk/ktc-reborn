import { API } from '../api'

class BranchModule extends API {
  async getBranches() {
    return await this.get('/branches', {
      squeeze: true,
    })
  }
}

export default BranchModule
