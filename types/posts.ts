interface PostList {
  title: string
  avatar: string
  author: string
  date: string
  raw_content: string
  attachments: []
}

export interface TPosts {
  items: PostList[]
}
