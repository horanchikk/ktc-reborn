import { useApi } from './useApi'

export function useTimetableApi() {
  const { checkModule } = useApi()
  const log = useLogger('TimetableApi')

  try {
    const timetableModule = checkModule('timetable')
    return {
      timetable: timetableModule,
    }
  } catch (e) {
    log.error('Ошибка инициализации TimetableApi:', e)
    return {
      timetable: null,
    }
  }
} 