import {
  SAVE_LAST_DOCUMENTS,
  SAVE_DOCUMENTS,
  SET_STATUS_PROCESSING,
  SET_STATUS,
  REMOVE_STATUS_PROCESSING,
  SAVE_DOCUMENT,
  CLEAR_DOCUMENT,
  SET_FETCHING_PARAMS_DOCUMENTS,
  ADD_FETCHING_PARAM_DOCUMENTS,
  SET_TOTAL_COUNT,
} from './types'

const initialState = {
  last: [],
  items: [],
  onProcessing: [],
  fetchingParams: {
    page: 1,
    limit: 12,
    sortField: 'document.id',
    sort: 'DESC',
  },
  document: null,
  totalCount: 0,
}

export const documentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_LAST_DOCUMENTS:
      return {
        ...state,
        last: payload,
      }
    case SAVE_DOCUMENTS:
      return {
        ...state,
        items: payload,
      }
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: payload,
      }
    case SET_STATUS_PROCESSING:
      return {
        ...state,
        onProcessing: [...state.onProcessing, payload],
      }
    case REMOVE_STATUS_PROCESSING:
      return {
        ...state,
        onProcessing: state.onProcessing.filter((d) => d.id !== payload),
      }
    case SET_STATUS:
      let document = state.document
      if (state.document && state.document.id === payload.id)
        document = { ...state.document, status: payload.status }

      return {
        ...state,
        items: state.items.map((d) => {
          if (d.id === payload.id) d.status = payload.status
          return d
        }),
        last: state.items.map((d) => {
          if (d.id === payload.id) d.status = payload.status
          return d
        }),
        document,
      }
    case SAVE_DOCUMENT:
      return {
        ...state,
        document: payload,
      }
    case CLEAR_DOCUMENT:
      return {
        ...state,
        document: null,
      }
    case ADD_FETCHING_PARAM_DOCUMENTS:
      return {
        ...state,
        fetchingParams: {
          ...state.fetchingParams,
          ...payload,
        },
      }
    case SET_FETCHING_PARAMS_DOCUMENTS:
      return {
        ...state,
        fetchingParams: {
          ...initialState.fetchingParams,
          ...payload,
        },
      }
    default:
      return state
  }
}
