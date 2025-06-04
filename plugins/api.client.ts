import GalleryModule from '@/repository/modules/gallery'
import OTAModule from '@/repository/modules/ota'
import UserModule from '@/repository/modules/user'
import BranchModule from '@/repository/modules/branch'
import TimetableModule from '@/repository/modules/timetable'
import BlogModule from '@/repository/modules/blog'
import NewsModule from '@/repository/modules/news'
import ContactsModule from '~/repository/modules/contacts'

export interface IApiInstance {
  user: UserModule
  gallery: GalleryModule
  ota: OTAModule
  branch: BranchModule
  timetable: TimetableModule
  blog: BlogModule
  news: NewsModule
  contacts: ContactsModule
}

export interface Provide {
  $api: IApiInstance
}
declare module '#app' {
  interface NuxtApp {
    api: IApiInstance
  }
}

export default defineNuxtPlugin(() => {
  const modules: IApiInstance = {
    user: new UserModule('UserModule'),
    gallery: new GalleryModule('GalleryModule'),
    ota: new OTAModule('OTAModule'),
    branch: new BranchModule('BranchModule'),
    timetable: new TimetableModule('TimetableModule'),
    blog: new BlogModule('BlogModule'),
    news: new NewsModule('NewsModule'),
    contacts: new ContactsModule('ContactsModule'),
  }

  return {
    provide: {
      api: modules,
    },
  }
})
