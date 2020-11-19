import React from 'react'
import classes from './style.scss'
import { NavLink } from 'react-router-dom'

const CardComponent = ({ to, ...props }) => {
  if (to) return <NavLink to={to} {...props} />

  return <div {...props} />
}

export const Card = ({
  variant,
  align,
  justify,
  children,
  topIndent,
  bottomIndent,
  height,
  space,
  to,
}) => {
  const cls = [
    classes.card,
    variant ? classes[variant] : classes.default,
    align ? classes[`align-${align}`] : '',
    justify ? classes[`justify-${justify}`] : '',
    to ? classes.isLink : '',
  ].join(' ')

  return (
    <CardComponent
      style={{
        marginTop: topIndent,
        marginBottom: bottomIndent,
        height: height,
        padding: space,
      }}
      className={cls}
      to={to}
    >
      {children}
    </CardComponent>
  )
}
