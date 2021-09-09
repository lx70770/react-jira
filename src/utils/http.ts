import qs from 'qs'
import * as auth from 'auth-provider'
import apiUrl from './api-url'
import { useAuth } from 'context/auth-context'

interface Config extends RequestInit {
  data?: object
  token?: string
}
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ messaeg: '请重新登录' })
    }
    const res_data = await response.json()
    if (response.ok) {
      return res_data
    } else {
      return Promise.reject(res_data)
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth()
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}
