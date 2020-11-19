import React from 'react'
import * as Icons from './svg'
import { createUseStyles } from 'react-jss'
import classes from './style.scss'

export const Icon = ({
  name,
  height,
  width,
  indent,
  variant,
  className,
  stroke,
  title = null,
}) => {
  const stylesClass = createUseStyles({
    icon: {
      margin: indent,
      width: width,
      height: height,
    },
  })()

  const cls = [
    variant ? classes[variant] : '',
    variant && stroke ? classes.stroke : '',
    stylesClass.icon,
    className ? className : '',
  ].join(' ')

  if (Icons[name]) {
    const TagName = Icons[name]
    return <TagName title={title} className={cls} />
  }

  return <></>
}
