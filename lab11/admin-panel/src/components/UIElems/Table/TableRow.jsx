import React from 'react'
import classes from './style.scss'

export const TableRow = ({ children, color }) => {
  const cls = [classes.row, color ? classes[`row_${color}`] : ''].join(' ')
  return <tr className={cls}>{children}</tr>
}
