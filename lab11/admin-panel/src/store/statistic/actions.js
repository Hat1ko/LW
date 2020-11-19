import * as types from './types'

import {
  fetchAmountActiveUser as fetchAmountActiveUserAPI,
  fetchDocumentsInReview as fetchDocumentsInReviewAPI,
  fetchRequestByTime as fetchRequestByTimeAPI,
} from '@/api/statistic'

export const saveRequestStatistic = (payload) => ({
  type: types.SAVE_REQUEST_STATISTIC,
  payload,
})

export const saveAmountActiveUser = (payload) => ({
  type: types.SAVE_AMOUNT_ACTIVE_USER,
  payload,
})

export const saveAmountDocumentInReview = (payload) => ({
  type: types.SAVE_AMOUNT_DOCUMENT_IN_REVIEW,
  payload,
})

export const fetchRequestStatistic = (payload) => async (dispatch) => {
  try {
    const { data } = await fetchRequestByTimeAPI(payload)
    dispatch(saveRequestStatistic(data))
  } catch (error) {
    console.log(error)
  }
}

export const fetchAmountDocumentInReview = () => async (dispatch) => {
  try {
    const { data } = await fetchDocumentsInReviewAPI()
    dispatch(saveAmountDocumentInReview(data.amount))
  } catch (error) {
    console.log(error)
  }
}

export const fetchAmountActiveUser = () => async (dispatch) => {
  try {
    const { data } = await fetchAmountActiveUserAPI()
    dispatch(saveAmountActiveUser(data.amount))
  } catch (error) {
    console.log(error)
  }
}
