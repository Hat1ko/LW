import axios from 'axios'
import { STORAGE_ACCESS_TOKEN, API_URL } from '@/config/baseConfig'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(STORAGE_ACCESS_TOKEN)

    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    //console.log(error.response) // for debug
    return Promise.reject(error)
  }
)

export default axiosInstance
