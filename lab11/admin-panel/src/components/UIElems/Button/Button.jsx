import React from 'react'
import classes from './style.scss'
import { Icon } from '@/components'

export const Button = ({
  type,
  variant,
  size,
  className,
  disabled,
  children,
  loader,
  onClick,
}) => {
  const cls = [
    classes.btn,
    variant ? classes[variant] : classes.default,
    size ? classes[size] : '',
    disabled ? classes.disabled : '',
    className,
  ].join(' ')

  const handlerClick = e => {
    if (onClick) {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) onClick(e)
    }
  }

  return (
    <button className={cls} type={type} onClick={handlerClick}>
      <div className={classes.content}>
        {loader ? (
          <Icon name="Tail" stroke={true} className={classes.loader} />
        ) : (
          children
        )}
      </div>
    </button>
  )
}
