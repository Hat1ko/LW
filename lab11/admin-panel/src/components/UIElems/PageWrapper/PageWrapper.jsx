import React from 'react'
import classes from './style.scss'

export const PageWrapper = ({ children }) => {
  return (
    <div className={classes.wrapper}>
      <div>{children}</div>
      <div className={classes.copyright}>
        © 2020 Copyright Life Services by&nbsp;<span>JetUp Digital</span>
      </div>
    </div>
  )
}
