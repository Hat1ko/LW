import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-grid-system'
import {
  getUser,
  clearUser,
  setRemovingUser,
  setLockingUser,
  setUnlockingUser,
  fetchUserDocuments,
  setFetchingUserDocumentsParams,
  clearUserDocument,
} from '@/store/users/actions'
import {
  Typography,
  DocumentsList,
  TitleLine,
  Link,
  Pagination,
  NotFound,
  LsLoader,
} from '@/components'
import { InfoUser } from './atoms'
import { DOCUMENTS, USERS } from '@/config/routes'
import { useQuery } from '@/hooks'
import classes from '../style.scss'

export const User = () => {
  const { id } = useParams()
  const { page } = useQuery({ page: 1 })
  const user = useSelector((state) => state.users.user)
  const documents = useSelector((state) => state.users.userDocuments)
  const fetchingParamsUserDocuments = useSelector(
    (state) => state.users.fetchingParamsUserDocuments
  )
  const totalUserDocuments = useSelector(
    (state) => state.users.totalUserDocuments
  )
  const isFetchingUserDocuments = useSelector(
    (state) => state.users.isFetchingUserDocuments
  )

  const [isLoading, setIsLoading] = useState(user ? false : true)

  const dispatch = useDispatch()
  const history = useHistory()

  const fetchingUser = useCallback(async () => {
    await dispatch(getUser(id))
    setIsLoading(false)
  }, [dispatch, id])

  const fetchingDocuments = useCallback(async () => {
    await dispatch(
      fetchUserDocuments({ userId: id, ...fetchingParamsUserDocuments })
    )
  }, [dispatch, fetchingParamsUserDocuments, id])

  useEffect(() => {
    if (+page !== fetchingParamsUserDocuments.page) {
      dispatch(setFetchingUserDocumentsParams({ page: +page }))
    }
  }, [dispatch, fetchingParamsUserDocuments.page, page])

  useEffect(() => {
    fetchingUser()
    return () => {
      dispatch(clearUser())
      dispatch(clearUserDocument())
    }
  }, [dispatch, fetchingUser])

  useEffect(() => {
    fetchingDocuments()
  }, [dispatch, fetchingDocuments])

  const onClickDelete = () => {
    dispatch(setRemovingUser(user))
  }

  const onClickLock = () => {
    dispatch(setLockingUser(user))
  }

  const onClickUnlock = () => {
    dispatch(setUnlockingUser(user))
  }

  const _renderDocuments = () => {
    if (isFetchingUserDocuments)
      return (
        <div className={classes.loaderWrapper}>
          <LsLoader topIndent={20} size={18} />
        </div>
      )
    if (documents && documents.length) {
      return (
        <>
          <DocumentsList
            list={documents.map((document) => ({
              id: document.id,
              name: document.name,
              date: document.createDate,
              status: document.status,
            }))}
            type="line"
            label={true}
            dateFormat="d.m.y"
            url={DOCUMENTS}
            icons={{ date: false }}
            dateWidth={150}
            statusWidth={190}
          />
        </>
      )
    } else {
      return (
        <NotFound
          topIndent={50}
          variant="body"
          justify="center"
          text="Не найдено документов"
        />
      )
    }
  }

  if (isLoading)
    return (
      <div className={classes.loaderWrapper}>
        <LsLoader topIndent={20} size={18} />
      </div>
    )

  if (user) {
    return (
      <>
        <Row align="center" style={{ marginBottom: 50 }}>
          <Col xs="content">
            <Link
              onClick={() => history.goBack()}
              anchor="Назад"
              iconLeft="ArrowLeft"
            />
          </Col>
          <Col xs="content">
            <Typography variant="h1">Профиль Пользователя</Typography>
          </Col>
          <Col>
            <TitleLine />
          </Col>
        </Row>
        <InfoUser
          {...user}
          handleDelete={onClickDelete}
          handleLock={onClickLock}
          handleUnlock={onClickUnlock}
        />
        <Typography variant="h1" bottomIndent={35} topIndent={50}>
          Прикрепленные Файлы
        </Typography>
        {_renderDocuments()}
        <Pagination
          activePage={fetchingParamsUserDocuments.page}
          url={`${USERS}/${id}`}
          total={totalUserDocuments}
          pageSize={fetchingParamsUserDocuments.limit}
        />
      </>
    )
  }

  return <Typography variant="h1">Пользователь не найден</Typography>
}
