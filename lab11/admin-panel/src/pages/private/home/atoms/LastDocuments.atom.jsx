import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDocumentsLast } from '@/store/document/actions'
import { Card, CardHeader, Link, DocumentsList, Typography } from '@/components'
import { DOCUMENTS } from '@/config/routes'
import { Row } from 'react-grid-system'

export const LastDocuments = () => {
  const documents = useSelector(state => state.document.last)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDocumentsLast())
  }, [dispatch])

  return (
    <Card>
      <CardHeader bottomIndent={20} justify="between">
        <Typography variant="body" weight={500}>
          Недавно полученные заявки
        </Typography>
        <Link
          to={DOCUMENTS}
          anchor="Все документы"
          variant="action"
          iconRight="ArrowRight"
        />
      </CardHeader>
      <Row>
        <DocumentsList
          url={DOCUMENTS}
          list={documents}
          type="line"
          size="small"
          dateWidth={75}
          statusWidth={115}
        />
      </Row>
    </Card>
  )
}
