import { apiChatUrl, apiUrl } from '@/shared/enviroment'
import axios from 'axios'

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
