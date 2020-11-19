import React from 'react'
import { Modal, Typography, ButtonGroup, Button } from '@/components'

export const ModalLogOut = ({ onClose, onSubmit, open }) => {
  return (
    <Modal onClose={onClose} open={open}>
      <Typography topIndent={20}>
        Вы действительно хотите&nbsp;
        <Typography variant="span" weight="500">
          выйти
        </Typography>
        &nbsp;?
      </Typography>
      <ButtonGroup justify="center" topIndent={40}>
        <Button size="big" onClick={onSubmit} variant="action">
          Выйти
        </Button>
        <Button size="big" onClick={onClose}>
          Отмена
        </Button>
      </ButtonGroup>
    </Modal>
  )
}
