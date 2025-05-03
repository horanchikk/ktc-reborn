import { $fetch } from 'ofetch'
import { useLogger } from '@/composables/useLogger'
import { useUser } from '~/store/useUser'

interface TUserData {
  user_id: number
  access_token: string
}

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

export class API {
  private log
  private module: string = 'API'
  private API_URL: string = useRuntimeConfig().public.API_URL
  private user = useUser()

  constructor(module: string) {
    this.module = module
    this.log = useLogger(this.module)
  }

  private throwError(request: string, data: TException) {
    const err = {
      info: '',
      request,
    }
    if (Object.prototype.hasOwnProperty.call(data, 'code') && Object.prototype.hasOwnProperty.call(data, 'error')) {
      err.info = `${data.error} (${data.code})`
    }
    else if (Object.prototype.hasOwnProperty.call(data, 'detail')) {
      const details = data.detail[0]
      err.info = `${details.type} ${details.loc.join(', ')} (${details.msg})`
    }
    else {
      err.info = data
    }

    this.log.error(err)
    showError(data)
  }

  private instance = $fetch.create({
    baseURL: this.API_URL,

    onRequest: (ctx) => {
      if (!this.user.data.access_token && ctx.request !== '/login')
        navigateTo('/auth')
    },
    onResponse: (ctx) => {
      const statusCode = ctx.response.status
      if (statusCode > 300 && statusCode !== 422)
        this.throwError(ctx.request.toString(), ctx.response._data)
    },
    onResponseError: async (ctx) => {
      const statusCode = ctx.response.status

      if (statusCode === 401) {
        const newToken: TUserData = await this.get('/user/refresh', {
          access_token: ctx.request.toString().split('?')[1].split('=')[1],
        })

        this.user.data.access_token = newToken.access_token
      }
      else if (statusCode === 400 && ctx.request !== `${this.API_URL}/user/login`) {
        this.user.logout()
      }
      else {
        this.throwError(ctx.request.toString(), ctx.response._data)
      }
    },
  })

  get = <T>(url: string, params?: object): Promise<T> => {
    return this.instance(url, {
      method: 'GET',
      params: {
        access_token: this.user.data.access_token,
        ...params,
      },
    })
  }

  post = <T>(url: string, body?: object, params?: object): Promise<T> => {
    return this.instance(url, {
      method: 'POST',
      body,
      params: {
        access_token: this.user.data.access_token,
        ...params,
      },
    })
  }

  put = <T>(url: string, body?: object, params?: object): Promise<T> => {
    return this.instance(url, {
      method: 'PUT',
      body,
      params: {
        access_token: this.user.data.access_token,
        ...params,
      },
    })
  }

  delete = <T>(url: string, body?: object, params?: object): Promise<T> => {
    return this.instance(url, {
      method: 'DELETE',
      body,
      params: {
        access_token: this.user.data.access_token,
        ...params,
      },
    })
  }
}
