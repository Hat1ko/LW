import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-grid-system'
import { Card, Counter } from '@/components'

//store
import {
  fetchAmountDocumentInReview,
  fetchAmountActiveUser,
} from '@/store/statistic/actions'

export const DashboardCounter = ({ toDocuments, toUsers }) => {
  const dispatch = useDispatch()

  const amountActiveUser = useSelector(
    (state) => state.statistic.amountActiveUser
  )
  const amountDocumentsInReview = useSelector(
    (state) => state.statistic.amountDocumentsInReview
  )

  useEffect(() => {
    dispatch(fetchAmountActiveUser())
    dispatch(fetchAmountDocumentInReview())
  }, [dispatch])

  return (
    <Row>
      <Col md={6}>
        <Card
          justify="center"
          space={15}
          variant="action"
          height="100%"
          to={toDocuments}
        >
          <Counter
            count={amountDocumentsInReview}
            icon={'Clock'}
            title="Документы на расмотрении"
            variant="action"
          />
        </Card>
      </Col>
      <Col md={6}>
        <Card
          justify="center"
          space={15}
          variant="default"
          height="100%"
          to={toUsers}
        >
          <Counter
            count={amountActiveUser}
            icon={'Users'}
            title="Активные пользователи"
          />
        </Card>
      </Col>
    </Row>
  )
}
