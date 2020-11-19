import axios from '@/services/axios'

const path = 'admin/documents'

export const fetchDocuments = (data) => {
  return axios.get(`${path}/list`, {
    params: data,
  })
}

export const fetchCustomerDocuments = ({ userId, ...data }) => {
  return axios.get(`${path}/user/${userId}`, { params: data })
}

export const updateDocument = (data) => {
  return axios.patch(path, data)
}

export const deleteDocument = ({ documentId, ...data }) => {
  return axios.delete(`${path}/${documentId}`, data)
}

export const fetchDocument = (documentId) => {
  return axios.get(`${path}/${documentId}`)
}
