import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { PageContainer, HeaderBar } from '@/components'
import { ModalLock, ModalDelete, ModalUnLock } from './atoms'
import {
  setFetchingUsersParams,
  updateStatusUser,
  deleteUser,
  clearRemovingUser,
  clearLockingUser,
  clearUnlockingUser,
} from '@/store/users/actions'
import { USERS } from '@/config/routes'

export const UsersModule = ({ children }) => {
  const [loader, setLoader] = useState(false)

  const history = useHistory()
  const { handleSubmit, register, setValue } = useForm()
  const dispatch = useDispatch()

  const account = useSelector((state) => state.account)
  const removingUser = useSelector((state) => state.users.removingUser)
  const lockingUser = useSelector((state) => state.users.lockingUser)
  const unlockingUser = useSelector((state) => state.users.unlockingUser)
  const searchQuery = useSelector((state) => state.users.fetchingParams.search)

  useEffect(() => {
    setValue('search', searchQuery)
  }, [searchQuery, setValue])

  useEffect(() => {
    return () => {
      dispatch(clearRemovingUser())
      dispatch(clearLockingUser())
      dispatch(clearUnlockingUser())
    }
  }, [dispatch])

  const onSearch = handleSubmit((data) => {
    dispatch(setFetchingUsersParams(data))
    history.push(USERS)
  })

  const onClearSearch = () => {
    dispatch(setFetchingUsersParams({ search: '' }))
  }

  const onSubmitFormModalLock = async ({ id, reason }) => {
    setLoader(true)
    await dispatch(updateStatusUser(id, false, reason))
    setLoader(false)
    handlerCloseModalLock()
  }

  const onSubmitFormModalUnLock = async ({ id }) => {
    setLoader(true)
    await dispatch(updateStatusUser(id, true))
    setLoader(false)
    handlerCloseModalUnLock()
  }

  const onSubmitFormModalDelete = async ({ id }) => {
    setLoader(true)
    await dispatch(deleteUser(id))
    setLoader(false)
    handlerCloseModalDelete()
  }

  const handlerCloseModalDelete = () => {
    if (!loader) {
      dispatch(clearRemovingUser())
    }
  }

  const handlerCloseModalLock = () => {
    if (!loader) {
      dispatch(clearLockingUser())
    }
  }

  const handlerCloseModalUnLock = () => {
    if (!loader) {
      dispatch(clearUnlockingUser())
    }
  }

  return (
    <>
      <HeaderBar
        register={register}
        account={account}
        onClearSearch={onClearSearch}
        onSearch={onSearch}
        defaultSearchValue={searchQuery}
      />
      <PageContainer>{children}</PageContainer>
      <ModalDelete
        onClose={handlerCloseModalDelete}
        onSubmit={onSubmitFormModalDelete}
        loader={loader}
        user={removingUser}
      />
      <ModalLock
        onClose={handlerCloseModalLock}
        loader={loader}
        onSubmit={onSubmitFormModalLock}
        user={lockingUser}
      />
      <ModalUnLock
        onClose={handlerCloseModalUnLock}
        onSubmit={onSubmitFormModalUnLock}
        loader={loader}
        user={unlockingUser}
      />
    </>
  )
}
