import React from 'react'
import classes from './style.scss'

import { Icon } from '@/components/UIElems/Icon'

export const AttachedFile = ({ name, fileUrl, extension }) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={fileUrl}
      className={classes.wrapper}
    >
      {extension === '.pdf' ? (
        <div className={classes.preview}>
          <Icon name="Doc" title={name} variant="default" />
        </div>
      ) : (
        <div
          className={classes.preview}
          style={{ backgroundImage: `url(${fileUrl})` }}
        ></div>
      )}

      <div className={classes.footer}>
        <div className={classes.name}>{name}</div>
        <div
          className={`${classes.triangle} ${classes.triangle_default}`}
        ></div>
        <div className={`${classes.triangle} ${classes.triangle_error}`}></div>
      </div>
    </a>
  )
}
