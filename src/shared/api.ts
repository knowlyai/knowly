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

// Axios interceptor to handle 401 errors and refresh token
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

// Axios interceptor to handle 401 errors and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig

    // Check for network errors (likely 401/expired token)
    if (error.code === 'ERR_NETWORK' && !error.response) {
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      // Mark that we haven't retried this request yet
      if (originalRequest._retry) {
        // If we already tried to refresh for this request, give up
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(error)
      }

      const refreshToken = localStorage.getItem('refresh_token')

      if (refreshToken) {
        originalRequest._retry = true
        isRefreshing = true

        try {
          const response = await api.post('/auth/refresh', {
            refresh_token: refreshToken
          })

          const {
            id_token
            // refresh_token: newRefreshToken
          } = response.data
          localStorage.setItem('token', id_token)
          // localStorage.setItem('refresh_token', newRefreshToken)

          // Process queued requests with new token
          processQueue(null, id_token)

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${id_token}`
          }
          isRefreshing = false
          return api(originalRequest)
        } catch (refreshError) {
          processQueue(refreshError as Error, null)
          isRefreshing = false
          localStorage.removeItem('token')
          localStorage.removeItem('refresh_token')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }

      // If no refresh token, redirect to login
      processQueue(error, null)
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      window.location.href = '/login'
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)
