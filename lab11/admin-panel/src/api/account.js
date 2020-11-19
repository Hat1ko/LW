import axios from '@/services/axios'

const path = 'admins/account'

export const fetchAccount = () => {
  return axios.get(path)
}

export const updateAccountField = (data) => {
  return axios.patch(path, data)
}

export const updateAccountFull = (data) => {
  return axios.patch(`${path}/full`, data)
}

export const updateAccountPhoto = (file) => {
  const data = new FormData()
  data.append('image', file)

  return axios.patch(`${path}/photo`, data)
}
