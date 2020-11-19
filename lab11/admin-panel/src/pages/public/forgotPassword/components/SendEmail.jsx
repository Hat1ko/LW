import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthTypographySub, TextInput, Button, ButtonGroup } from '@/components'
import { HeadFormSteps } from './HeaderFormSteps'
import { useDispatch } from 'react-redux'
import { startResetPassword } from '@/store/auth/actions'
import { emailSchema } from '../schemaValid'
import { useTranslate } from '@/hooks'

export const SendEmail = ({ step, nextStep }) => {
  const [loader, setLoader] = useState(false)
  const { register, errors, handleSubmit } = useForm({
    validationSchema: emailSchema,
  })
  const dispatch = useDispatch()

  const { t } = useTranslate()

  const onSubmit = async (data) => {
    setLoader(true)
    const response = await dispatch(startResetPassword(data))
    if (response) nextStep()
    else setLoader(false)
  }

  return (
    <>
      <div>
        <HeadFormSteps step={step} />
        <AuthTypographySub>
          Введите ваш электронный адрес, и мы отправим вам ссылку для
          восстановления доступа.
        </AuthTypographySub>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          register={register}
          error={t(errors?.email?.message)}
          label="Почта"
          name="email"
          fullWidth={true}
        />
        <ButtonGroup topIndent={90} justify="end">
          <Button loader={loader} variant="action" size="big">
            Отправить
          </Button>
        </ButtonGroup>
      </form>
    </>
  )
}
