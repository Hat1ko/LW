import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getDocument,
  clearDocument,
  setStatusProcessing,
  removeStatusProcessing,
  updateStatusDocument,
} from '@/store/document/actions'
import { Typography, DocumentControl } from '@/components'
import { Row, Col } from 'react-grid-system'
import { Link } from '@/components'
import { InfoDocument } from './atoms'
import { statusAccept, statusCancel } from '@/config/documentStatusInfoConfig'

export const Document = () => {
  const { id } = useParams()
  const document = useSelector((state) => state.document.document)
  const [isLoading, setIsLoading] = useState(document ? false : true)
  const documentsOnProcessing = useSelector(
    (state) => state.document.onProcessing
  )
  const dispatch = useDispatch()
  const history = useHistory()

  const fetchingDocument = useCallback(async () => {
    await dispatch(getDocument(id))
    setIsLoading(false)
  }, [dispatch, id])

  useEffect(() => {
    fetchingDocument()
    return () => {
      dispatch(clearDocument())
    }
  }, [dispatch, fetchingDocument])

  const onAccept = async (id) => changeDocumentStatus(id, statusAccept)

  const onCancel = (id) => changeDocumentStatus(id, statusCancel)

  const changeDocumentStatus = async (id, status) => {
    dispatch(setStatusProcessing(id, status))
    await dispatch(updateStatusDocument(id, status))
    await dispatch(getDocument(id))
    dispatch(removeStatusProcessing(id))
  }

  if (isLoading) return <div>Loading...</div>

  if (document) {
    const onProcessing = documentsOnProcessing.find((d) => d.id === document.id)
    const loader = onProcessing?.status

    return (
      <>
        <Row align="center" justify="between">
          <Col xs={12}>
            <Link
              onClick={() => history.goBack()}
              anchor="Назад"
              iconLeft="ArrowLeft"
            />
          </Col>
        </Row>
        <InfoDocument {...document} />
        <DocumentControl
          statusAccept={statusAccept}
          statusCancel={statusCancel}
          onAccept={onAccept}
          onCancel={onCancel}
          size="big"
          id={document.id}
          status={document.status}
          loader={loader}
        />
      </>
    )
  }

  return <Typography variant="h1">Документ не найден</Typography>
}
