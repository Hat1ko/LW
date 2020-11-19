import React from 'react'
import classes from './style.scss'
import { Icon } from '@/components'

export const Counter = ({ count, icon, title, variant }) => {
  const cls = [
    classes.wrapper,
    variant ? classes[variant] : classes.default,
  ].join(' ')

  return (
    <div className={cls}>
      <div className={classes.counter}>
        <div className={classes.number}>{count}</div>
      </div>
      <div className={classes.content}>
        <div>
          <Icon className={classes.icon} name={icon} />
        </div>
        <div className={classes.title}>{title}</div>
      </div>
    </div>
  )
}
