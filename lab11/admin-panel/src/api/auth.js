import axios from '@/services/axios'

const path = '/auth'

export const login = (data) => {
  return axios.post(`${path}/login`, data)
}

export const refreshToken = (data) => {
  return axios.post(`${path}/getAccessToken`, data)
}

export const sendEmailRestorePassword = (data) => {
  return axios.post(`${path}/reset-password-start`, data)
}

export const sendCodeRestorePassword = (data) => {
  return axios.post(`${path}/reset-password-check`, data)
}

export const sendPasswordRestorePassword = (data) => {
  return axios.post(`${path}/reset-password`, data)
}
