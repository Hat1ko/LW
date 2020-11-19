import React from 'react'
import classes from './style.scss'
import { Link } from '@/components'

const TextComponent = ({ to, ...props }) => {
  if (to) return <Link to={to} {...props} />

  return <span {...props} />
}

export const TextLabel = ({
  label,
  text,
  variant,
  bottomIndent = 15,
  topIndent,
  to,
}) => {
  const cls = [
    classes.textLabel,
    variant && classes[`textLabel${variant}`]
      ? classes[`textLabel${variant}`]
      : '',
  ].join(' ')

  return (
    <div
      style={{ marginBottom: bottomIndent, marginTop: topIndent }}
      className={cls}
    >
      {label ? <span className={classes.Label}>{label}</span> : ''}
      &nbsp;
      <TextComponent to={to}>{text}</TextComponent>
    </div>
  )
}
