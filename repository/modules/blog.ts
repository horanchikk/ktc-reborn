import { API } from '../api'
import type { TPosts } from '@/types/posts'

class BlogModule extends API {
  async getPosts() {
    return await this.get<TPosts>('/blogs/')
  }
}

export default BlogModule
