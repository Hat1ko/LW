import React from 'react'
import classes from './style.scss'
import { useHistory } from 'react-router-dom'
import { Icon, Typography } from '@/components'
import { getDocumentStatusInfo } from '@/services/documentStatusInfo'
import { formattedDateTo2 } from '@/services/formattedDateTo2'

const formatStringToDate = ({ pattern, value }, str) => {
  return str.replace(pattern, value)
}

export const DocumentLinear = ({
  id,
  name,
  date,
  status,
  label,
  icons,
  size,
  dateFormat = 'd/m',
  url,
  statusWidth,
  dateWidth,
}) => {
  const history = useHistory()
  const statusDoc = getDocumentStatusInfo(status)
  const [day, month, year] = formattedDateTo2(date)
  icons = {
    date: true,
    status: true,
    ...icons,
  }

  const repl = [
    {
      pattern: 'd',
      value: day,
    },
    {
      pattern: 'm',
      value: month,
    },
    {
      pattern: 'y',
      value: year,
    },
  ]

  const handlerClick = () => {
    history.push(`${url}/${id}`)
  }

  for (let i = 0; i < repl.length; i++) {
    dateFormat = formatStringToDate(repl[i], dateFormat)
  }

  return (
    <tr className={classes.linear} onClick={handlerClick}>
      <td>
        <div className={classes.linearName}>
          <Icon name="Doc" variant="action" />
          <div className={classes.linearNameText}>{name}</div>
        </div>
      </td>
      <td className={classes.linearDateTd} width={dateWidth}>
        <div
          className={`${classes.linearDate} ${classes[size]} ${
            label ? classes.label : ''
          }`}
        >
          {label ? <span className={classes.linearLabel}>Дата:</span> : ''}
          {icons.date ? <Icon name="Date" /> : ''}
          {dateFormat}
        </div>
      </td>
      <td width={statusWidth}>
        <div
          className={`${classes.linearStatus}  ${classes[size]} ${
            label ? classes.label : ''
          }`}
        >
          {label ? <span className={classes.linearLabel}>Статус:</span> : ''}
          {icons.status ? (
            <Icon name={statusDoc?.icon} variant={statusDoc?.variant} />
          ) : (
            ''
          )}
          <Typography color={statusDoc?.variant}>
            {statusDoc?.description}
          </Typography>
        </div>
      </td>
    </tr>
  )
}
