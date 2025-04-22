import { useApi } from '~/composables/useApi'

class GalleryModule {
  api = useApi('GalleryModule')

  // TODO: types
  async getAlbums() {
    return await this.api.get<object>(
      `/photos/albums`,
    )
  }

  // TODO: types
  async getPhotos(album_id: string) {
    return await this.api.get<object>(`/photos/${album_id}`)
  }
}

export default GalleryModule
