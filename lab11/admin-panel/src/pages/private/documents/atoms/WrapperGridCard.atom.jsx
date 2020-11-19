import React from 'react'
import { Col } from 'react-grid-system'
import { Card } from '@/components'

export const WrapperGridCard = ({ children, to }) => (
  <Col style={{ marginTop: 20, marginBottom: 20 }} xs="content">
    <Card to={to} height="100%">
      {children}
    </Card>
  </Col>
)
