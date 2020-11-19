import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Typography,
  ButtonGroup,
  Button,
  UserAvatar,
  Modal,
} from '@/components'
import classes from './../style.scss'

export const ModalDelete = ({ user, onClose, onSubmit, loader }) => {
  const { register, handleSubmit } = useForm()

  if (user) {
    return (
      <Modal key={user.id} onClose={onClose} open>
        <UserAvatar size={50} photo={user.photo} />
        <Typography variant="body" topIndent={10} bottomIndent={35}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography>
          Вы действительно хотите&nbsp;
          <Typography variant="span" weight="500">
            удалить
          </Typography>
          &nbsp;данного пользователя?
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" ref={register} name="id" value={user.id} />
          <ButtonGroup justify="center" topIndent={40}>
            <Button loader={loader} size="big" type="submit" variant="action">
              Удалить
            </Button>
            <Button disabled={loader} size="big" onClick={() => onClose(null)}>
              Отмена
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    )
  }

  return null
}
