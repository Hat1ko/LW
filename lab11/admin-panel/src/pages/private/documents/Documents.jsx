import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-grid-system'
import { useHistory } from 'react-router-dom'
import {
  getDocuments,
  setStatusProcessing,
  removeStatusProcessing,
  updateStatusDocument,
} from '@/store/document/actions'
import {
  Typography,
  Select,
  DocumentsList,
  NotFound,
  TitleLine,
  Pagination,
} from '@/components'
import { documentFilters as sorts } from '@/config/filtersConfig'
import { statusAccept, statusCancel } from '@/config/documentStatusInfoConfig'
import { DOCUMENTS } from '@/config/routes'
import { WrapperGridCard } from './atoms'
import { addFetchingDocumentsParam } from '@/store/document/actions'
import { useQuery } from '@/hooks'

export const Documents = () => {
  const { page } = useQuery({ page: 1 })
  const dispatch = useDispatch()
  const fetchingParams = useSelector((state) => state.document.fetchingParams)
  const documents = useSelector((state) => state.document.items)
  const history = useHistory()
  const documentsOnProcessing = useSelector(
    (state) => state.document.onProcessing
  )
  const dataList = documents.map((d) => {
    let loader = documentsOnProcessing.find((l) => l.id === d.id)
    if (loader) return { ...d, loader: loader.status }
    return d
  })
  const totalCountDocuments = useSelector((state) => state.document.totalCount)

  useEffect(() => {
    dispatch(getDocuments(fetchingParams))
  }, [dispatch, fetchingParams])

  useEffect(() => {
    if (+page !== fetchingParams.page)
      dispatch(addFetchingDocumentsParam({ page }))
  }, [dispatch, fetchingParams.page, page])

  const onAccept = (id) => changeDocumentStatus(id, statusAccept)

  const onCancel = (id) => changeDocumentStatus(id, statusCancel)

  const changeDocumentStatus = async (id, status) => {
    dispatch(setStatusProcessing(id, status))
    await dispatch(updateStatusDocument(id, status))
    await dispatch(getDocuments(fetchingParams))
    dispatch(removeStatusProcessing(id))
  }

  return (
    <>
      <Row align="center" justify="between">
        <Col xs="content">
          <Typography variant="h1">Мои Документы</Typography>
        </Col>
        <Col>
          <TitleLine />
        </Col>
        <Col xs="content">
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <Select
              name="sort"
              placeholder="Сортировать"
              value={fetchingParams.filterByStatus || false}
              defaultValue={false}
              options={sorts}
              onChange={(sort) => {
                dispatch(addFetchingDocumentsParam({ filterByStatus: sort }))
                history.push(DOCUMENTS)
              }}
            />
          </form>
        </Col>
      </Row>
      {documents.length ? (
        <DocumentsList
          list={dataList}
          type="grid"
          Wrapper={WrapperGridCard}
          statusAccept={statusAccept}
          statusCancel={statusCancel}
          onAccept={onAccept}
          onCancel={onCancel}
          url={DOCUMENTS}
        />
      ) : (
        <NotFound
          topIndent={50}
          variant="body"
          text="По вашему запросу документов не найдено"
        />
      )}
      <Pagination
        activePage={page}
        url={DOCUMENTS}
        total={totalCountDocuments}
        pageSize={12}
      />
    </>
  )
}
