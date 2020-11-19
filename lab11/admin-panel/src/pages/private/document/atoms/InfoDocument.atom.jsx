import React from 'react'
import { getDocumentStatusInfo } from '@/services/documentStatusInfo'
import { formattedDateTo2 } from '@/services/formattedDateTo2'
import { Typography, TextLabel, Icon, AttachedFileList } from '@/components'
import { Row, Col } from 'react-grid-system'
import { USERS } from '@/config/routes'

export const InfoDocument = ({
  status,
  createDate,
  name,
  user,
  service,
  description,
  userId,
  documentFiles,
}) => {
  const statusDoc = getDocumentStatusInfo(status)
  const [day, month] = formattedDateTo2(createDate)

  return (
    <>
      <Row align="center">
        <Col>
          <Typography
            align="center"
            variant="h1"
            weight="400"
            topIndent={50}
            bottomIndent={40}
          >
            <Icon
              name="Doc"
              indent={{ right: 15 }}
              variant="action"
              height={18}
            />
            {name}
          </Typography>
        </Col>
        <Col xs={4}>
          <Typography
            variant="body"
            topIndent={50}
            bottomIndent={40}
            align="center"
            color={statusDoc?.variant}
          >
            <Icon
              name={statusDoc?.icon}
              variant={statusDoc?.variant}
              width={20}
              height={20}
              indent={{ right: 10 }}
            />

            {statusDoc.description}
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <TextLabel
              label="От:"
              text={`${user.firstName} ${user.lastName}`}
              to={`${USERS}/${userId}`}
            />
            <TextLabel label="Страна:" text={user.countryName} />
            <TextLabel label="Тип деятельности:" text={service.name} />
            <TextLabel label="Дата заявки:" text={`${day}/${month}`} />
          </div>
          <div>
            <Typography
              variant="h2"
              weight="400"
              topIndent={40}
              bottomIndent={20}
            >
              Детали:
            </Typography>
            <Typography color="secondary" variant="body" lineHeight={1.5625}>
              {description}
            </Typography>
          </div>
        </Col>
        <Col xs={4}>
          <Typography variant="body" color="secondary" align="center">
            <Icon
              name="Attached"
              width={20}
              height={20}
              indent={{ right: 10 }}
            />
            <span>Прикрепленые файлы</span>
          </Typography>
          {documentFiles ? (
            <AttachedFileList
              indent={{
                top: 25,
                bottom: 25,
              }}
              files={documentFiles}
            />
          ) : (
            <Typography topIndent={25} variant="body">
              Нет файлов
            </Typography>
          )}
        </Col>
      </Row>
    </>
  )
}
