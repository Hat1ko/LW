import React, { useState } from 'react'
import { AuthTypographySub, TextInput, Button, ButtonGroup } from '@/components'
import { HeadFormSteps } from './HeaderFormSteps'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { resetPasswordCheckCode } from '@/store/auth/actions'
import { codeSchema } from '../schemaValid'
import { useTranslate } from '@/hooks'

export const SendCode = ({ step, nextStep }) => {
  const { register, errors, handleSubmit, setError } = useForm({
    validationSchema: codeSchema,
  })

  const [loader, setLoader] = useState(false)

  const { t } = useTranslate()

  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    setLoader(true)
    const response = await dispatch(resetPasswordCheckCode(data))
    if (response.error) {
      setError('code', 'noMatch', response.error)
      setLoader(false)
    } else {
      nextStep()
    }
  }

  return (
    <>
      <div>
        <HeadFormSteps step={step} />
        <AuthTypographySub>Введите полученный код.</AuthTypographySub>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          register={register}
          error={t(errors?.code?.message)}
          label="Код"
          name="code"
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
