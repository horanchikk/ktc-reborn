import { API } from '../api'

class ContactsModule extends API {
  // TODO: types
  async getContacts() {
    return await this.get<object>(
      `/contacts/`,
    )
  }
}

export default ContactsModule
