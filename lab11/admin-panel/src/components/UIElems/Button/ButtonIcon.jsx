import React from 'react'
import { Icon } from '@/components'
import classes from './style.scss'
import { createUseStyles } from 'react-jss'

export const ButtonIcon = ({
  icon,
  variant,
  type = 'button',
  onClick,
  indent,
  height,
  width,
  className,
  title,
}) => {
  if (!width && !height) width = 16

  const stylesClass = createUseStyles({
    indent: {
      margin: indent,
    },
  })()

  const cls = [
    classes.btnIcon,
    indent ? stylesClass.indent : '',
    className ? className : '',
  ].join(' ')

  return (
    <button type={type} className={cls} onClick={onClick}>
      <Icon
        title={title}
        height={height}
        width={width}
        name={icon}
        variant={variant}
      />
    </button>
  )
}
