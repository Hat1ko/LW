import { SAVE_ACCOUNT_INFO, CLEAR_ACCOUNT_INFO } from './types'

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  photo: null,
}

export const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_ACCOUNT_INFO:
      return {
        ...state,
        ...payload,
      }
    case CLEAR_ACCOUNT_INFO:
      return initialState
    default:
      return state
  }
}
