import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { auth } from '@/store/auth/actions'
import { FORGOT_PASSWORD } from '@/config/routes'
import { Button, ButtonGroup, TextInput } from '@/components'
import { schema } from './schemaValid'
import classes from './../style.scss'
import { useTranslate } from '@/hooks'

export const SignInForm = () => {
  const { register, errors, handleSubmit, setError } = useForm({
    validationSchema: schema,
    defaultValues: {
      email: 'live.services.dev@gmail.com',
      password: 'vLHM?8+3P=DDTdzk',
    },
  })

  const [loader, setLoader] = useState(false)

  const dispatch = useDispatch()

  const { t } = useTranslate()

  const onSubmit = async (data) => {
    setLoader(true)
    const { error, message } = await dispatch(auth(data))

    if (error) {
      if (message) setError('password', 'serverError', message)
      else setError('password', 'serverError', error?.message)
      setLoader(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        register={register}
        error={t(errors?.email?.message)}
        bottomIndent={40}
        name="email"
        label="Почта"
        fullWidth={true}
      />
      <TextInput
        register={register}
        error={t(errors?.password?.message)}
        name="password"
        label="Пароль"
        type="password"
        fullWidth={true}
      />
      <NavLink to={FORGOT_PASSWORD} className={classes.link}>
        Забыли пароль?
      </NavLink>
      <ButtonGroup topIndent={50} justify="end">
        <Button loader={loader} variant="action" size="big">
          Вход
        </Button>
      </ButtonGroup>
    </form>
  )
}
