import React, { Fragment } from 'react'
import classes from './style.scss'
import { getDocumentStatusInfo } from '@/services/documentStatusInfo'
import { Icon, DocumentControl, Typography } from '@/components'
import { formattedDateTo2 } from '@/services/formattedDateTo2'

export const DocumentGrid = ({
  id,
  name,
  date,
  status,
  user,
  Wrapper,
  url,
  ...props
}) => {
  const statusDoc = getDocumentStatusInfo(status)
  const [day, month] = formattedDateTo2(date)

  if (!Wrapper) Wrapper = ({ children }) => <Fragment>{children}</Fragment>

  return (
    <Wrapper {...props}>
      <div className={classes.grid}>
        <div className={classes.gridHeader}>
          <div className={classes.gridDate}>
            <Icon name="Date" />
            <span>
              {day}/{month}
            </span>
          </div>
          <div className={classes.gridStatus}>
            <Icon name={statusDoc?.icon} variant={statusDoc?.variant} />
            <Typography color={statusDoc?.variant}>
              {statusDoc?.description}
            </Typography>
          </div>
        </div>
        <div className={classes.gridInfo}>
          <span>От:</span> {user.firstName} {user.lastName}
        </div>
        <div className={classes.gridInfo}>
          <span>Страна:</span> {user.country.name}
        </div>
        <div className={classes.gridName}>
          <Icon name="Doc" variant="action" />
          {name}
        </div>
        <DocumentControl {...props} status={status} id={id} />
      </div>
    </Wrapper>
  )
}
