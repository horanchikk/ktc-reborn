import { $fetch } from 'ofetch'
import { useLogger } from './useLogger'
// import { useUser } from '~/store/useUser'

interface TException {
  error: string
  code: number
}

export function useApi() {
  const { public: { API_URL } } = useRuntimeConfig()
  // const user = useUser()
  const log = useLogger('useApi')

  function showError(data: TException) {
    if (Object.prototype.hasOwnProperty.call(data, 'code') && Object.prototype.hasOwnProperty.call(data, 'error')) {
      alert(data.error)
      log.error(JSON.stringify(data))
    }

    return data
  }

  const instance = $fetch.create({
    baseURL: API_URL,
    // onRequest(ctx) {
    //   if (!user.data.token && ctx.request !== '/login')
    //       navigateTo('/auth')
    // },
    onResponse(ctx) {
      const statusCode = ctx.response.status
      if (statusCode > 300)
        showError(ctx.response._data)
      // TODO: add refreshing token
    },
  })
  const api = {
    get: (url: string, params?: object) => {
      return instance(url, {
        method: 'GET',
        params,
      })
    },
    post: (url: string, body?: object) => {
      return instance(url, {
        method: 'POST',
        body,
      })
    },
    put: (url: string, body?: object) => {
      return instance(url, {
        method: 'PUT',
        body,
      })
    },
    DELETE: (url: string, body?: object) => {
      return instance(url, {
        method: 'DELETE',
        body,
      })
    },
  }

  return api
}
