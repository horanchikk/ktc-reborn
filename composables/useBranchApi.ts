import { useApi } from './useApi'

export function useBranchApi() {
  const { checkModule } = useApi()
  const log = useLogger('BranchApi')

  try {
    const branchModule = checkModule('branch')
    return {
      branch: branchModule,
    }
  } catch (e) {
    log.error('Ошибка инициализации BranchApi:', e)
    return {
      branch: null,
    }
  }
} 