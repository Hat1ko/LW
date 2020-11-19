import React from 'react'
import classes from './style.scss'

const variantMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  body: 'p',
}

export const Typography = ({
  variant,
  children,
  weight,
  topIndent,
  bottomIndent,
  align,
  justify,
  color,
  lineHeight,
}) => {
  const TagName = variantMap[variant] || 'p'
  const cls = [
    variant ? classes[variant] : classes.p,
    align ? classes[`align-${align}`] : '',
    justify ? classes[`justify-${justify}`] : '',
    color ? classes[`color-${color}`] : '',
  ].join(' ')

  return (
    <TagName
      style={{
        fontWeight: weight,
        marginTop: topIndent,
        marginBottom: bottomIndent,
        lineHeight: lineHeight,
      }}
      className={cls}
    >
      {children}
    </TagName>
  )
}
