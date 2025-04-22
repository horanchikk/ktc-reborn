import GalleryModule from './modules/gallery'
import UserModule from './modules/user'

export const ApiModules = {
  user: new UserModule(),
  gallery: new GalleryModule(),
}
