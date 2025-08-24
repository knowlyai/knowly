import { apiUrl } from '@/shared/enviroment'
import axios from 'axios'

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export const getAuthHeader = () => {
  const token = localStorage.getItem('access_token') || ''
  return {
    Authorization: `Bearer ${token}`
  }
}
