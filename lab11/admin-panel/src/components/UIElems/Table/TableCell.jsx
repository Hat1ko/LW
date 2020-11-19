import React from 'react'
import classes from './style.scss'

export const TableCell = ({
  children,
  component,
  align = 'center',
  justify = 'center',
  width,
}) => {
  const Cell = component || 'td'
  const cls = [
    classes.cellContainer,
    align ? classes[`align-${align}`] : '',
    justify ? classes[`justify-${justify}`] : '',
  ].join(' ')

  return (
    <Cell width={width} className={classes.cell}>
      <div className={cls}>{children}</div>
    </Cell>
  )
}
