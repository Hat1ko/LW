import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Typography,
  ButtonGroup,
  Button,
  UserAvatar,
  Modal,
  RadioGroup,
  TextInput,
} from '@/components'

import { usersBlocked as blockVariants } from '@/config/filtersConfig'
import classes from './../style.scss'

export const ModalLock = ({ user, onClose, onSubmit, loader }) => {
  const { register, errors, handleSubmit, watch, control, setValue } = useForm()

  const lockVariant = watch('variant')

  useEffect(() => {
    if (lockVariant && +lockVariant !== 3) {
      setValue(
        'reason',
        blockVariants.find((item) => item.value === +lockVariant).label,
        true
      )
    } else {
      setValue('reason', '', true)
    }
  }, [lockVariant, setValue])

  useEffect(() => {
    register('reason', { required: true })
  }, [register])

  if (user) {
    return (
      <>
        <Modal onClose={onClose} open>
          <UserAvatar size={50} photo={user.photo} />
          <Typography variant="body" topIndent={10} bottomIndent={35}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography bottomIndent={25}>
            Пожалуйста, укажите причину&nbsp;
            <Typography variant="span" weight="500">
              блокировки
            </Typography>
            &nbsp;данного пользователя:
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" ref={register} name="id" value={user.id} />
            <Controller
              control={control}
              as={RadioGroup}
              fullWidth={true}
              options={blockVariants}
              name="variant"
              register={register({ required: true })}
              error={errors?.variant && 'This is required'}
            />
            <Controller
              as={TextInput}
              control={control}
              register={register}
              topIndent={30}
              fullWidth
              name="reason"
              type={+lockVariant === 3 ? 'text' : 'hidden'}
              label="Ваш вариант"
              error={errors?.reason && 'This is required'}
              defaultValue={''}
            />
            <ButtonGroup justify="center" topIndent={40}>
              <Button loader={loader} size="big" variant="action">
                Заблокировать
              </Button>
              <Button disabled={loader} size="big" onClick={onClose}>
                Отмена
              </Button>
            </ButtonGroup>
          </form>
        </Modal>
      </>
    )
  }
  return null
}
