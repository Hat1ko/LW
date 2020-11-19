import React, { useState } from 'react'
import { updateAccountInfo } from '@/store/account/actions'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import {
  Typography,
  UserAvatar,
  TextInput,
  Button,
  PhotoInput,
  PageContainer,
  HeaderBar,
  TitleLine,
} from '@/components'
import { Row, Col } from 'react-grid-system'
import { normalizePhone } from '@/services/normalizePhone'
import classes from './style.scss'
import { schema } from './schemaValid'
import { generateMask } from '@/services'
import { useTranslate } from '@/hooks'

export const Profile = () => {
  const dispatch = useDispatch()

  const [buttonLoader, setButtonLoader] = useState(false)
  const [preview, setPreview] = useState(null)

  const account = useSelector((state) => state.account)

  const { handleSubmit, register, errors } = useForm({
    validationSchema: schema,
  })

  const { t } = useTranslate()

  const onFileLoad = (e) => {
    console.log(e.target.files[0])
    setPreview(e.target.files[0])
  }

  const onClearFile = () => {
    setPreview(null)
  }

  const onSubmit = async (data) => {
    setButtonLoader(true)

    if (preview) data['photo'] = preview

    await dispatch(
      updateAccountInfo({
        ...data,
        phoneNumber: normalizePhone(data.phoneNumber),
      })
    )
    setButtonLoader(false)

    setPreview(null)
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs="content">
            <div className={classes.wrapperAvatar}>
              <PhotoInput
                size={115}
                photo={account.photo}
                component={UserAvatar}
                onChange={onFileLoad}
                onClear={onClearFile}
                preview={preview ? URL.createObjectURL(preview) : null}
                register={register}
              />
            </div>
          </Col>
          <Col xs="content">
            <div className={classes.wrapperForm}>
              <TextInput
                register={register}
                bottomIndent={50}
                fullWidth
                name="firstName"
                label="Имя"
                defaultValue={account.firstName}
                error={t(errors?.firstName?.message)}
              />
              <TextInput
                register={register}
                bottomIndent={50}
                fullWidth
                name="lastName"
                label="Фамилия"
                error={t(errors?.lastName?.message)}
                defaultValue={account.lastName}
              />
              <TextInput
                bottomIndent={50}
                fullWidth
                name="phoneNumber"
                register={register}
                mask={generateMask}
                error={t(errors?.phoneNumber?.message)}
                label="Номер телефона"
                defaultValue={account.phoneNumber}
              />
              <TextInput
                register={register}
                bottomIndent={50}
                fullWidth
                name="email"
                error={t(errors?.email?.message)}
                label="Почта"
                defaultValue={account.email}
              />
              <Button loader={buttonLoader} variant="action" size="big">
                Сохранить
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    )
  }

  return (
    <>
      <HeaderBar register={register} account={account} />
      <PageContainer>
        <Row>
          <Col xs="content">
            <Typography bottomIndent={60} variant="h1">
              Мой Профиль
            </Typography>
          </Col>
          <Col>
            <TitleLine />
          </Col>
        </Row>
        {renderForm()}
      </PageContainer>
    </>
  )
}
