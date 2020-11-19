import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-grid-system'

import {
  Typography,
  Select,
  NotFound,
  TitleLine,
  Pagination,
} from '@/components'
import { usersFilters as sorts } from '@/config/filtersConfig'

import {
  getUsers,
  addFetchingUsersParam,
  setRemovingUser,
  setLockingUser,
  setUnlockingUser,
} from '@/store/users/actions'
import { UsersTable } from './atoms'
import { USERS } from '@/config/routes'
import { useQuery } from '@/hooks'

export const Users = () => {
  const { page } = useQuery({ page: 1 })

  const fetchingParams = useSelector((state) => state.users.fetchingParams)

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const totalCountUsers = useSelector((state) => state.users.totalCount)

  const fetchUsers = useCallback(async () => {
    dispatch(getUsers(fetchingParams))
  }, [dispatch, fetchingParams])

  useEffect(() => {
    fetchUsers()
  }, [dispatch, fetchUsers])

  useEffect(() => {
    if (+page !== fetchingParams.page) dispatch(addFetchingUsersParam({ page }))
  }, [dispatch, fetchingParams.page, page])

  const onClickDelete = (user) => {
    dispatch(setRemovingUser(user))
  }

  const onClickLock = (user) => {
    dispatch(setLockingUser(user))
  }

  const onClickUnlock = (user) => {
    dispatch(setUnlockingUser(user))
  }

  return (
    <>
      <Row align="center" justify="between">
        <Col xs="content">
          <Typography variant="h1">Пользователи</Typography>
        </Col>
        <Col>
          <TitleLine />
        </Col>
        <Col xs="content">
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <Select
              name="filter"
              placeholder="Сортировать"
              defaultValue={-1}
              value={
                sorts.find(
                  (item) => item.sortField === fetchingParams.sortField
                )?.value || -1
              }
              options={sorts}
              onChange={(value) => {
                const selectSorts = sorts.find((item) => item.value === value)
                if (selectSorts)
                  dispatch(
                    addFetchingUsersParam({
                      sort: selectSorts.sort,
                      sortField: selectSorts.sortField,
                    })
                  )
              }}
            />
          </form>
        </Col>
      </Row>
      {users.length ? (
        <>
          <UsersTable
            users={users}
            handleDelete={onClickDelete}
            handleLock={onClickLock}
            handleUnlock={onClickUnlock}
          />
        </>
      ) : (
        <NotFound
          topIndent={50}
          variant="body"
          text="По вашему запросу пользователей не найдено"
        />
      )}
      <Pagination
        activePage={page}
        url={USERS}
        total={totalCountUsers}
        pageSize={12}
      />
    </>
  )
}
