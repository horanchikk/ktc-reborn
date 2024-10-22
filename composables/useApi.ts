import { $fetch } from 'ofetch'
import { useLogger } from './useLogger'
import { useUser } from '~/store/useUser'

interface Detail {
  type: string
  loc: string[]
  msg: string
}

interface TException {
  error?: string
  code?: number
  detail?: Detail[]
}

export function useApi() {
  const { public: { API_URL } } = useRuntimeConfig()
  const log = useLogger('useApi')
  const user = useUser()

  function showError(data: TException) {
    if (Object.prototype.hasOwnProperty.call(data, 'code') && Object.prototype.hasOwnProperty.call(data, 'error')) {
      log.error(`${data.error} (${data.code})`)
    }
    else if (Object.prototype.hasOwnProperty.call(data, 'detail')) {
      const details = data.detail[0]
      log.error(`${details.type} ${details.loc.join(', ')} (${details.msg})`)
    }

    return data
  }

  const instance = $fetch.create({
    baseURL: API_URL,

    onRequest(ctx) {
      if (!user.data.access_token && ctx.request !== '/login')
        navigateTo('/auth')
    },
    async onResponse(ctx) {
      const statusCode = ctx.response.status
      if (statusCode > 300)
        showError(ctx.response._data)
    },
    async onResponseError(ctx) {
      const statusCode = ctx.response.status

      if (statusCode === 401) {
        const newToken = await api.get('/user/refresh', {
          access_token: ctx.request.split('?')[1].split('=')[1],
        })

        user.setUserData(newToken)
      }
      else if (statusCode === 400) {
        user.logout()
      }
    },
  })
  const api = {
    get: (url: string, params?: object) => {
      return instance(url, {
        method: 'GET',
        params: {
          access_token: user.data.access_token,
          ...params,
        },
      })
    },
    post: (url: string, body?: object, params?: object) => {
      return instance(url, {
        method: 'POST',
        body,
        params: {
          access_token: user.data.access_token,
          ...params,
        },
      })
    },
    put: (url: string, body?: object, params?: object) => {
      return instance(url, {
        method: 'PUT',
        body,
        params: {
          access_token: user.data.access_token,
          ...params,
        },
      })
    },
    DELETE: (url: string, body?: object, params?: object) => {
      return instance(url, {
        method: 'DELETE',
        body,
        params: {
          access_token: user.data.access_token,
          ...params,
        },
      })
    },
  }

  return api
}
