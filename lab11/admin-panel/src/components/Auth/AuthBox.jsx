import React from 'react'
import classes from './style.scss'

export const AuthBox = ({ children, width, head, headAlign }) => (
  <div style={{ width }} className={classes.box}>
    <div className={classes.boxHead} align={headAlign}>
      {head}
    </div>
    <div className={classes.boxBody}>{children}</div>
  </div>
)
