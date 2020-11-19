import axios from '@/services/axios'

const path = 'admin/customers'

export const fetchCustomers = (data) => {
  return axios.get(`${path}/all`, { params: data })
}

export const fetchCustomer = (id) => {
  return axios.get(`${path}/${id}`)
}

export const deleteCustomer = (id) => {
  return axios.delete(`${path}/${id}`)
}

export const updateCustomer = (data) => {
  return axios.patch(path, data)
}
