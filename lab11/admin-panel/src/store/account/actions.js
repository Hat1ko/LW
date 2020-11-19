import { SAVE_ACCOUNT_INFO, CLEAR_ACCOUNT_INFO } from './types'

import {
  fetchAccount as fetchAccountAPI,
  updateAccountFull as updateAccountFullAPI,
  updateAccountPhoto as updateAccountPhotoAPI,
} from '@/api/account'

import { serializationAccountData } from './serializations'

export const saveAccountInfo = (data) => ({
  type: SAVE_ACCOUNT_INFO,
  payload: { ...data },
})

export const clearAccountInfo = () => {
  return {
    type: CLEAR_ACCOUNT_INFO,
  }
}

export const getAccountInfo = () => async (dispatch) => {
  try {
    const { data } = await fetchAccountAPI()
    await dispatch(saveAccountInfo(serializationAccountData(data)))
    return true
  } catch {
    return false
  }
}

export const updateAccountInfo = ({ photo, ...payload }) => async (
  dispatch
) => {
  try {
    await updateAccountFullAPI(payload)
    if (photo) {
      await updateAccountPhotoAPI(photo)
    }
    await dispatch(getAccountInfo())
  } catch (error) {
    console.log(error)
  }
}
