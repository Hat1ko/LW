import {
  SAVE_USERS,
  CLEAR_STORE,
  CLEAR_USER,
  SAVE_USER,
  SET_FETCHING_PARAMS_USERS,
  ADD_FETCHING_PARAM_USERS,
  SET_STATUS_USER,
  SET_REMOVING_USER,
  CLEAR_REMOVING_USER,
  SET_LOCKING_USER,
  CLEAR_LOCKING_USER,
  SET_UNLOCKING_USER,
  CLEAR_UNLOCKING_USER,
  SET_TOTAL_COUNT,
  SAVE_USER_DOCUMENTS,
  CLEAR_USER_DOCUMENTS,
  SET_FETCHING_PARAMS_USER_DOCUMENTS,
  SET_IS_FETCHING_USER_DOCUMENTS,
} from './types'

import {
  fetchCustomers as APIGetUsers,
  deleteCustomer as APIDeleteUser,
  updateCustomer as APIUpdateUserStatus,
  fetchCustomer as APIGetUSer,
} from '@/api/customers'

import { fetchCustomerDocuments as fetchCustomerDocumentsAPI } from '@/api/documents'

import {
  serializationUsers,
  serializationUser,
  adapterFilterParams,
} from './serializations'

export const saveUsers = (users) => {
  return {
    type: SAVE_USERS,
    payload: users,
  }
}

export const saveUser = (userData) => {
  return {
    type: SAVE_USER,
    payload: userData,
  }
}

export const setTotalCount = (count) => {
  return {
    type: SET_TOTAL_COUNT,
    payload: count,
  }
}

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  }
}

export const clearStore = () => {
  return {
    type: CLEAR_STORE,
  }
}

export const setStatusUser = (id, status) => {
  return {
    type: SET_STATUS_USER,
    payload: {
      id,
      status,
    },
  }
}

export const setFetchingUsersParams = (data) => {
  return {
    type: SET_FETCHING_PARAMS_USERS,
    payload: data,
  }
}

export const addFetchingUsersParam = (data) => {
  return {
    type: ADD_FETCHING_PARAM_USERS,
    payload: data,
  }
}

export const setRemovingUser = (user) => {
  return {
    type: SET_REMOVING_USER,
    payload: user,
  }
}

export const setLockingUser = (user) => {
  return {
    type: SET_LOCKING_USER,
    payload: user,
  }
}

export const setUnlockingUser = (user) => {
  return {
    type: SET_UNLOCKING_USER,
    payload: user,
  }
}

export const clearRemovingUser = () => {
  return {
    type: CLEAR_REMOVING_USER,
  }
}

export const clearLockingUser = () => {
  return {
    type: CLEAR_LOCKING_USER,
  }
}

export const clearUnlockingUser = () => {
  return {
    type: CLEAR_UNLOCKING_USER,
  }
}

export const saveUserDocuments = (payload) => ({
  type: SAVE_USER_DOCUMENTS,
  payload,
})

export const setFetchingUserDocumentsParams = (payload) => ({
  type: SET_FETCHING_PARAMS_USER_DOCUMENTS,
  payload,
})

export const setIsFetchingUserDocuments = (payload) => ({
  type: SET_IS_FETCHING_USER_DOCUMENTS,
  payload,
})

export const clearUserDocument = () => ({
  type: CLEAR_USER_DOCUMENTS,
})

export const updateStatusUser = (id, status, reason) => async (dispatch) => {
  try {
    await APIUpdateUserStatus({ userId: id, status, reason })
    dispatch(setStatusUser(+id, status))
    dispatch(getUser(id))
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    await APIDeleteUser(id)
    dispatch(getUsers(getState().users.fetchingParams))
    dispatch(clearUser())
  } catch (error) {
    console.log(error)
  }
}

export const getUsers = (params) => async (dispatch) => {
  const {
    data: { items, count },
  } = await APIGetUsers(adapterFilterParams(params))
  dispatch(setTotalCount(count))
  dispatch(saveUsers(serializationUsers(items)))
}

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await APIGetUSer(id)
    dispatch(saveUser(serializationUser(data)))
  } catch {
    dispatch(clearUser())
  }
}

export const fetchUserDocuments = (payload) => async (dispatch, getState) => {
  try {
    await dispatch(setIsFetchingUserDocuments(true))
    const { data } = await fetchCustomerDocumentsAPI(payload)
    await dispatch(saveUserDocuments(data))
  } catch (error) {
    console.log(error)
  } finally {
    await dispatch(setIsFetchingUserDocuments(false))
  }
}
