import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '@/components'
import classes from './style.scss'

const getIcon = (iconName, indent, variant) => {
  if (iconName) {
    return <Icon indent={indent} variant={variant} name={iconName} />
  }
  return ''
}

export const Link = ({
  to,
  anchor,
  iconLeft,
  iconRight,
  variant,
  onClick,
  children,
}) => {
  const cls = [classes.link, variant ? classes[variant] : classes.default].join(
    ' '
  )

  let ComponentLink = ({ children, ...props }) => {
    return <a {...props}>{children}</a>
  }

  if (to) ComponentLink = NavLink

  return (
    <ComponentLink className={cls} to={to} onClick={onClick}>
      {getIcon(iconLeft, { right: 10 }, variant)}
      {anchor || children}
      {getIcon(iconRight, { left: 10 }, variant)}
    </ComponentLink>
  )
}
