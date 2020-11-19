import React from 'react'
import classes from './style.scss'

export const TableHead = ({ children }) => {
  return <thead className={classes.thead}>{children}</thead>
}
