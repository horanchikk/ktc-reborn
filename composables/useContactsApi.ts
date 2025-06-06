import { useApi } from './useApi'

export function useContactsApi() {
  const { checkModule } = useApi()
  const log = useLogger('ContactsApi')

  try {
    const contactsModule = checkModule('contacts')
    return {
      contacts: contactsModule,
    }
  } catch (e) {
    log.error('Ошибка инициализации ContactsApi:', e)
    return {
      contacts: null,
    }
  }
} 