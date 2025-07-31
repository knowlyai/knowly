import { apiUrl } from '@/shared/enviroment'
import axios from 'axios'

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
