import { apiChatUrl, apiUrl } from '@/shared/enviroment'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

// Extend Axios request config to include _retry flag
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export const apiChat = axios.create({
  baseURL: apiChatUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export const getAuthHeader = () => {
  const token = localStorage.getItem('token') || ''
  return {
    Authorization: `Bearer ${token}`
  }
}

// Flag to track if we're already refreshing to prevent multiple refresh attempts
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: Error | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve()
    }
  })
  failedQueue = []
}

// Axios interceptor to handle 401 errors and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig

    // Check if error is 401 and we haven't already tried to refresh
    // Only handle 401 errors that have a response (not network errors)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }
      originalRequest._retry = true
      isRefreshing = true

      // TODO: Implementar refresh token quando a rota estiver disponível
      // const refreshToken = localStorage.getItem('refresh_token')
      //
      // if (refreshToken) {
      //   try {
      //     const response = await api.post('/auth/refresh', {
      //       refresh_token: refreshToken
      //     })
      //
      //     const { id_token, access_token, refresh_token: newRefreshToken } = response.data
      //     localStorage.setItem('token', id_token)
      //     localStorage.setItem('refresh_token', newRefreshToken)
      //
      //     isRefreshing = false
      //     processQueue(null)
      //
      //     // Retry original request with new token
      //     originalRequest.headers.Authorization = `Bearer ${id_token}`
      //     return api(originalRequest)
      //   } catch (refreshError) {
      //     // Refresh token failed, redirect to login
      //     isRefreshing = false
      //     processQueue(refreshError as Error)
      //     localStorage.removeItem('token')
      //     localStorage.removeItem('refresh_token')
      //     window.location.href = '/login'
      //     return Promise.reject(refreshError)
      //   }
      // }

      // If no refresh token, redirect to login
      isRefreshing = false
      processQueue(error)
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      window.location.href = '/login'
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)
