import { API } from '../api'
import type { NewsList, News } from '~/types/news'

class NewsModule extends API {
  async getPosts() {
    return await this.get<NewsList>('/news/')
  }

  async getPost(id: number) {
    return await this.get<News>(`/news/id${id}?md=false`)
  }
}

export default NewsModule
