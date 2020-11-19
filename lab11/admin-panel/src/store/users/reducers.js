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

const LIMIT_DOCUMENTS = 12

const initialState = {
  users: [],
  totalCount: 0,
  user: null,
  fetchingParams: {
    page: 1,
    limit: 10,
  },
  removingUser: null,
  lockingUser: null,
  unlockingUser: null,
  userDocuments: null,
  totalUserDocuments: 0,
  fetchingParamsUserDocuments: {
    page: 1,
    limit: LIMIT_DOCUMENTS,
  },
  isFetchingUserDocuments: true,
}

export const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_USERS:
      return {
        ...state,
        users: payload,
      }
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: payload,
      }
    case CLEAR_STORE:
      return initialState
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      }
    case SAVE_USER:
      return {
        ...state,
        user: payload,
      }
    case SET_STATUS_USER:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === payload.id) {
            return {
              ...u,
              isActive: payload.status,
            }
          }
          return u
        }),
      }
    case ADD_FETCHING_PARAM_USERS:
      return {
        ...state,
        fetchingParams: {
          ...state.fetchingParams,
          ...payload,
        },
      }
    case SET_FETCHING_PARAMS_USERS:
      return {
        ...state,
        fetchingParams: {
          ...initialState.fetchingParams,
          ...payload,
        },
      }
    case SET_REMOVING_USER:
      return {
        ...state,
        removingUser: payload,
      }
    case CLEAR_REMOVING_USER:
      return {
        ...state,
        removingUser: null,
      }
    case SET_LOCKING_USER:
      return {
        ...state,
        lockingUser: payload,
      }
    case CLEAR_LOCKING_USER:
      return {
        ...state,
        lockingUser: null,
      }
    case SET_UNLOCKING_USER:
      return {
        ...state,
        unlockingUser: payload,
      }
    case CLEAR_UNLOCKING_USER:
      return {
        ...state,
        unlockingUser: null,
      }
    case SAVE_USER_DOCUMENTS:
      return {
        ...state,
        userDocuments: payload.items,
        totalUserDocuments: payload.count,
      }
    case CLEAR_USER_DOCUMENTS:
      return {
        ...state,
        userDocuments: null,
        totalUserDocuments: 0,
        fetchingParamsUserDocuments: {
          page: 1,
          limit: LIMIT_DOCUMENTS,
        },
        isFetchingUserDocuments: true,
      }
    case SET_FETCHING_PARAMS_USER_DOCUMENTS:
      return {
        ...state,
        fetchingParamsUserDocuments: {
          ...state.fetchingParamsUserDocuments,
          ...payload,
        },
      }
    case SET_IS_FETCHING_USER_DOCUMENTS:
      return {
        ...state,
        isFetchingUserDocuments: payload,
      }
    default:
      return state
  }
}
