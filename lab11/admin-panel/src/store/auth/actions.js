import {
  SAVE_ACCESS_TOKEN,
  SAVE_REFRESH_TOKEN,
  CLEAR_STORE,
  ADD_RESTORE_DATA,
} from './types'

import {
  login as loginAPI,
  refreshToken as refreshTokenAPI,
  sendEmailRestorePassword as sendEmailRestorePasswordAPI,
  sendCodeRestorePassword as sendCodeRestorePasswordAPI,
  sendPasswordRestorePassword as sendPasswordRestorePasswordAPI,
} from '@/api/auth'

import { getAccountInfo, clearAccountInfo } from '@/store/account/actions'

import {
  STORAGE_ACCESS_TOKEN,
  STORAGE_REFRESH_TOKEN,
} from '@/config/baseConfig'

export const saveAccessToken = (token) => ({
  type: SAVE_ACCESS_TOKEN,
  payload: token,
})

export const saveRefreshToken = (token) => ({
  type: SAVE_REFRESH_TOKEN,
  payload: token,
})

export const addDataRestorePassword = (name, value) => ({
  type: ADD_RESTORE_DATA,
  payload: { name, value },
})

export const clearStore = () => {
  return {
    type: CLEAR_STORE,
  }
}

export const auth = ({ email, password }) => async (dispatch) => {
  try {
    const { data } = await loginAPI({ email, password })
    return await dispatch(successFullAuth(data.accessToken, data.refreshToken))
  } catch (error) {
    dispatch(logout())
    const { response } = error
    if (response && response.data) {
      return response.data
    }

    return { error }
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem(STORAGE_ACCESS_TOKEN)
  localStorage.removeItem(STORAGE_REFRESH_TOKEN)
  dispatch(clearAccountInfo())
  dispatch(clearStore())
}

export const startResetPassword = ({ email }) => async (dispatch) => {
  try {
    await sendEmailRestorePasswordAPI({ email })
    dispatch(addDataRestorePassword('email', email))
    return true
  } catch {
    return false
  }
}

export const resetPasswordCheckCode = ({ code }) => async (
  dispatch,
  getState
) => {
  try {
    await sendCodeRestorePasswordAPI({
      ...getState().auth.dataRestorePassword,
      code,
    })
    dispatch(addDataRestorePassword('code', code))
    return true
  } catch ({ data }) {
    return { error: data }
  }
}

export const resetPassword = ({ newPassword, confirmPassword }) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await sendPasswordRestorePasswordAPI({
      ...getState().auth.dataRestorePassword,
      newPassword,
      confirmPassword,
    })
    return await dispatch(successFullAuth(data.accessToken, data.refreshToken))
  } catch ({ data }) {
    return { error: data }
  }
}

export const resetToken = (refreshToken) => async (dispatch) => {
  try {
    const { data } = await refreshTokenAPI({ refreshToken })
    return await dispatch(
      successFullAuth(data.accessToken, data.refreshToken || refreshToken)
    )
  } catch {
    return false
  }
}

export const autoLogin = () => async (dispatch) => {
  const refreshToken = localStorage.getItem(STORAGE_REFRESH_TOKEN)
  if (!refreshToken) {
    await dispatch(logout())
  } else {
    await dispatch(resetToken(refreshToken))
  }
}

const successFullAuth = (accessToken, refreshToken) => async (dispatch) => {
  localStorage.setItem(STORAGE_ACCESS_TOKEN, accessToken)
  localStorage.setItem(STORAGE_REFRESH_TOKEN, refreshToken)
  await dispatch(saveAccessToken(accessToken))
  await dispatch(saveRefreshToken(refreshToken))
  try {
    await dispatch(getAccountInfo())
    return true
  } catch {
    dispatch(logout())
    return false
  }
}
