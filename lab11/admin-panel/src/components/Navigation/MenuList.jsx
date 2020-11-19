import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '@/components'
import classes from './style.scss'

export const MenuList = ({ list }) => {
  const MenuList = list.map((item, index) => (
    <MenuListItem key={index} {...item} />
  ))
  return <ul className={classes.listColumn}>{MenuList}</ul>
}

const MenuListItem = ({ link, name, icon, exact }) => {
  return (
    <li className={classes.item}>
      <NavLink
        activeClassName={classes.itemLinkActive}
        className={classes.itemLink}
        exact={exact}
        to={link}
      >
        <div className={classes.itemIcon}>
          <Icon name={icon} title={name} variant="white" />
        </div>
        <div className={classes.itemName}>{name}</div>
      </NavLink>
    </li>
  )
}
