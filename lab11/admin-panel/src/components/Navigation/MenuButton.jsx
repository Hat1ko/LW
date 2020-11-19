import React from 'react'
import { Icon } from '@/components'
import classes from './style.scss'

export const MenuButton = ({ type = 'button', label, onClick, icon }) => {
  return (
    <button className={classes.menuButton} type={type} onClick={onClick}>
      <div className={classes.menuButtonIcon}>
        <Icon variant="white" name={icon} title={label} />
      </div>
      <div className={classes.menuButtonName}>{label}</div>
    </button>
  )
}
