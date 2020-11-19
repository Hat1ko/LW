import React from 'react'
import { ButtonIcon } from '@/components'
import classes from './style.scss'

export const Modal = ({ open, onClose, align, justify, children }) => {
  const cls = [
    classes.container,
    align ? classes[`align-${align}`] : classes['align-center'],
    justify ? classes[`justify-${justify}`] : classes['justify-center'],
  ].join(' ')

  if (open)
    return (
      <div className={classes.modal}>
        <div className={classes.content}>
          <div className={cls}>
            <ButtonIcon
              className={classes.button}
              icon="Denied"
              variant="error"
              title="Закрыть"
              width={20}
              height={20}
              onClick={onClose}
            />
            {children}
          </div>
        </div>
      </div>
    )

  return <></>
}
