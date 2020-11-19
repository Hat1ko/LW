import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as LogoIcon } from './Logo.svg'
import classes from './style.scss'

const LogoContent = ({ short, show }) => {
  const cls = [classes.text, !show ? classes.text_transparent : ''].join(' ')
  return (
    <div className={classes.content}>
      <LogoIcon width={48} height={48} title="Life Services" />
      {!short ? (
        <div className={cls}>
          <span>Life</span> Services
        </div>
      ) : null}
    </div>
  )
}

export const Logo = ({
  url,
  white,
  small,
  fullWidth,
  align,
  justify,
  topIndent,
  bottomIndent,
  withText = true,
  showText = true,
}) => {
  let cls = [
    classes.wrapper,
    url ? classes.link : '',
    white ? classes.white : classes.default,
    small ? classes.small : '',
    fullWidth ? classes.fullWidth : '',
    align ? classes[`align-${align}`] : '',
    justify ? classes[`justify-${justify}`] : '',
  ].join(' ')

  const style = {
    marginTop: topIndent,
    marginBottom: bottomIndent,
  }

  const props = {
    style,
    className: cls,
  }

  return url ? (
    <NavLink to={url} {...props}>
      <LogoContent short={!withText} show={showText} />
    </NavLink>
  ) : (
    <div {...props}>
      <LogoContent short={!withText} show={showText} />
    </div>
  )
}
