import { API } from '../api'

class GalleryModule extends API {
  // TODO: types
  async getAlbums() {
    return await this.get<object>(
      `/photos/albums`,
    )
  }

  // TODO: types
  async getPhotos(album_id: string) {
    return await this.get<object>(`/photos/${album_id}`)
  }
}

export default GalleryModule
