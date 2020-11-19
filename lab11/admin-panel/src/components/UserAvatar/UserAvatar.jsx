import React from 'react'
import classes from './style.scss'
import { Icon, LsLoader } from '@/components'

export const UserAvatar = ({
  photo,
  topIndent,
  indentLeft,
  indentRight,
  bottomIndent,
  size,
}) => {
  const styles = {
    marginLeft: indentLeft,
    marginTop: topIndent,
    marginRight: indentRight,
    marginBottom: bottomIndent,
    width: size,
    height: size,
  }

  if (photo)
    return (
      <div className={classes.wrapper} style={styles}>
        <LsLoader size={size / 4} />
        <img className={classes.image} alt="" src={photo} />
      </div>
    )

  return (
    <div className={classes.wrapper} style={styles}>
      <Icon
        name="Profile"
        height={size / 4}
        width={size / 4}
        variant="default"
        title="Мой профиль"
      />
    </div>
  )
}
