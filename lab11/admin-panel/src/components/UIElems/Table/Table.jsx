import React from 'react'
import classes from './style.scss'

export const Table = ({ children, topIndent, bottomIndent }) => {
  return (
    <table
      className={classes.table}
      style={{ marginTop: topIndent, marginBottom: bottomIndent }}
    >
      {children}
    </table>
  )
}
