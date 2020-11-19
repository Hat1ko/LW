import React from 'react'
import { Row, Col } from 'react-grid-system'

import { LastDocuments, DashboardCounter, DashboardStatistic } from './atoms'
import { DOCUMENTS, USERS } from '@/config/routes'

export const Home = () => {
  return (
    <>
      <Row>
        <Col md={6}>
          <DashboardCounter toDocuments={DOCUMENTS} toUsers={USERS} />
          <DashboardStatistic topIndent={30} />
        </Col>
        <Col md={6}>
          <LastDocuments />
        </Col>
      </Row>
    </>
  )
}
