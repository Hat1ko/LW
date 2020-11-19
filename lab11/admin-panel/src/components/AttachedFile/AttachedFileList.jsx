import React from 'react'
import { AttachedFile } from './AttachedFile'
import { createUseStyles } from 'react-jss'
import classes from './style.scss'

export const AttachedFileList = ({ files, indent }) => {
  const stylesClass = createUseStyles({
    list: {
      margin: indent,
    },
  })()

  const cls = [classes.list, stylesClass.list].join(' ')
  return (
    <div className={cls}>
      {files.map((file, index) => (
        <AttachedFile key={index} {...file} />
      ))}
    </div>
  )
}
