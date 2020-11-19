import React from 'react'
import { NavLink } from 'react-router-dom'
import { PROFILE } from '@/config/routes'
import classes from './style.scss'
import { UserAvatar } from '@/components'

export const HeaderProfileInfo = ({ firstName, lastName, photo }) => {
  return (
    <div className={classes.profile}>
      <NavLink to={PROFILE} className={classes.profile__link}>
        <div>{firstName}</div>&nbsp;<div>{lastName}</div>
        <UserAvatar photo={photo} indentLeft={20} size={43} />
      </NavLink>
    </div>
  )
}
