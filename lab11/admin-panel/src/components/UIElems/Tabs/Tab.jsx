import React from 'react'
import classes from './style.scss'

export const Tab = ({ name, onClick, active }) => {
  const cls = [classes.tab, active ? classes.activeTab : ''].join(' ')

  return (
    <button className={cls} type="button" onClick={onClick}>
      {name}
      <div className={classes.underline}>
        {active ? <span className={classes.active}></span> : ''}
      </div>
    </button>
  )
}
