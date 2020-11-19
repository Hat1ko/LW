import * as types from './types'

const initialState = {
  requests: null,
  amountActiveUser: 0,
  amountDocumentsInReview: 0,
}

export const statisticReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SAVE_REQUEST_STATISTIC:
      return {
        ...state,
        requests: payload,
      }
    case types.SAVE_AMOUNT_DOCUMENT_IN_REVIEW:
      return {
        ...state,
        amountDocumentsInReview: payload,
      }

    case types.SAVE_AMOUNT_ACTIVE_USER:
      return {
        ...state,
        amountActiveUser: payload,
      }
    default:
      return state
  }
}
