import React, { useState } from 'react'
import { SIGN_IN } from '@/config/routes'
import { TextInput, Button, ButtonGroup } from '@/components'
import { HeadFormSteps } from './HeaderFormSteps'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetPassword } from '@/store/auth/actions'
import { passwordSchema } from '../schemaValid'
import { useTranslate } from '@/hooks'

export const SendPassword = ({ step }) => {
  const dispatch = useDispatch()
  const { register, errors, handleSubmit, setError } = useForm({
    validationSchema: passwordSchema,
  })
  const history = useHistory()
  const { t } = useTranslate()
  const [loader, setLoader] = useState(false)

  console.log(errors)

  const onSubmit = async (data) => {
    setLoader(true)
    const { error } = await dispatch(resetPassword(data))
    if (error) {
      setError('confirmPassword', 'serverError', error?.message)
    } else {
      history.push(SIGN_IN)
    }
    setLoader(false)
  }

  return (
    <>
      <HeadFormSteps step={step} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          register={register}
          type="password"
          bottomIndent={40}
          error={t(errors?.newPassword?.message)}
          label="Новый пароль"
          name="newPassword"
          fullWidth={true}
        />
        <TextInput
          register={register}
          type="password"
          error={t(errors?.confirmPassword?.message)}
          label="Повторите новый пароль"
          name="confirmPassword"
          fullWidth={true}
        />
        <ButtonGroup topIndent={90} justify="end">
          <Button loader={loader} variant="action" size="big">
            Сохранить
          </Button>
        </ButtonGroup>
      </form>
    </>
  )
}
