import React from 'react'
import { Row, Col } from 'react-grid-system'
import { Typography, UserAvatar, TextLabel, ButtonIcon } from '@/components'
import classes from '../style.scss'

export const InfoUser = ({
  photo,
  firstName,
  lastName,
  typeActivity,
  country,
  city,
  address,
  phones,
  email,
  isActive,
  handleLock,
  handleUnlock,
  handleDelete,
}) => {
  return (
    <Row>
      <Col xs="content" className={classes.imageWrapper}>
        <UserAvatar photo={photo} size={240} />
        <div className={classes.buttonContainer}>
          {isActive ? (
            <ButtonIcon
              title="Заблокровать"
              indent={{ right: 15 }}
              icon="Block"
              onClick={handleLock}
              variant="error"
              height={19}
            />
          ) : (
            <ButtonIcon
              title="Разблокировать"
              indent={{ right: 15 }}
              icon="Blocked"
              onClick={handleUnlock}
              variant="error"
              height={19}
            />
          )}

          <ButtonIcon
            title="Удалить"
            icon="Delete"
            variant="primary"
            onClick={handleDelete}
            height={19}
          />
        </div>
      </Col>
      <Col>
        <Typography topIndent={5} bottomIndent={15} variant="body" weight={500}>
          Личные Данные
        </Typography>
        <Row>
          <Col xs={3}>
            <TextLabel label="Имя:" text={firstName} />
          </Col>
          <Col xs={3}>
            <TextLabel label="Фамилия:" text={lastName} />
          </Col>
          <Col>
            <TextLabel label="Тип деятельности:" text={typeActivity} />
          </Col>
        </Row>
        <Typography
          topIndent={15}
          bottomIndent={15}
          variant="body"
          weight={500}
        >
          Адрес
        </Typography>
        <Row>
          <Col xs={3}>
            <TextLabel label="Страна:" text={country.name} />
          </Col>
          <Col xs={3}>
            <TextLabel label="Город:" text={city.name} />
          </Col>
          <Col>
            <TextLabel label="Адрес:" text={address} />
          </Col>
        </Row>
        <Typography
          topIndent={15}
          bottomIndent={15}
          variant="body"
          weight={500}
        >
          Контакты
        </Typography>
        <Row>
          <Col xs={6}>
            <TextLabel
              label="Номер телефона:"
              text={phones ? phones.join(' ') : 'Не указан'}
            />
          </Col>
          <Col xs={3}>
            <TextLabel label="Почта:" text={email} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
