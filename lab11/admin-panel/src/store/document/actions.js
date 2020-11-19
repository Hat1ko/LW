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

import {
  fetchDocuments as fetchDocumentsAPI,
  updateDocument as updateDocumentAPI,
  fetchDocument as fetchDocumentAPI,
} from '@/api/documents'

import { serializationDocuments, adapterFilterParams } from './serializations'

export const saveLastDocuments = (documents) => {
  return {
    type: SAVE_LAST_DOCUMENTS,
    payload: documents,
  }
}

export const saveDocuments = (documents) => {
  return {
    type: SAVE_DOCUMENTS,
    payload: documents,
  }
}

export const setTotalCount = (count) => {
  return {
    type: SET_TOTAL_COUNT,
    payload: count,
  }
}

export const setStatusDocument = (id, status) => {
  return {
    type: SET_STATUS,
    payload: { id, status },
  }
}

export const setStatusProcessing = (id, status) => {
  return {
    type: SET_STATUS_PROCESSING,
    payload: { id, status },
  }
}

export const removeStatusProcessing = (id) => {
  return {
    type: REMOVE_STATUS_PROCESSING,
    payload: id,
  }
}

export const saveDocument = (document) => {
  return {
    type: SAVE_DOCUMENT,
    payload: document,
  }
}

export const clearDocument = () => {
  return {
    type: CLEAR_DOCUMENT,
  }
}

export const setFetchingDocumentsParams = (data) => {
  return {
    type: SET_FETCHING_PARAMS_DOCUMENTS,
    payload: data,
  }
}

export const addFetchingDocumentsParam = (data) => {
  return {
    type: ADD_FETCHING_PARAM_DOCUMENTS,
    payload: data,
  }
}

export const getDocumentsLast = () => async (dispatch) => {
  try {
    const {
      data: { items },
    } = await fetchDocumentsAPI({
      page: 1,
      limit: 12,
      sortField: 'document.id',
      sort: 'DESC',
    })
    dispatch(saveLastDocuments(serializationDocuments(items)))
  } catch (error) {
    console.log(error)
  }
}

export const getDocuments = (params) => async (dispatch) => {
  try {
    const {
      data: { items, count },
    } = await fetchDocumentsAPI(adapterFilterParams(params))

    await dispatch(saveDocuments(serializationDocuments(items)))
    await dispatch(setTotalCount(count))
  } catch (error) {
    console.log(error)
  }
}

export const getDocument = (id) => async (dispatch) => {
  const { data } = await fetchDocumentAPI(id)
  dispatch(saveDocument(data))
}

export const updateStatusDocument = (documentId, status) => async (
  dispatch
) => {
  try {
    await updateDocumentAPI({ documentId, status })
    dispatch(setStatusDocument(documentId, status))
  } catch (error) {
    console.log(error)
  }
}
