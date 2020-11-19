import React from 'react'
import classes from './style.scss'
import { Icon } from '@/components'

export const SidebarControl = ({ full, setFull }) => {
  const icon = full ? 'ArrowLeft' : 'ArrowRight'

  return (
    <button
      type="button"
      onClick={() => setFull(!full)}
      className={classes.sidebarControl}
    >
      <Icon variant="action" height={14} name={icon} />
    </button>
  )
}
