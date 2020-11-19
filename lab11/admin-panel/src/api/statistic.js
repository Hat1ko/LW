import axios from '@/services/axios'

const path = '/statistics'

export const fetchAmountActiveUser = () => {
  return axios.get(`${path}/users/activeAmount`)
}

export const fetchDocumentsInReview = () => {
  return axios.get(`${path}/documents/inReview`)
}

export const fetchRequestByTime = (data) => {
  return axios.get(`${path}/requests/byTime`, {
    params: data,
  })
}
