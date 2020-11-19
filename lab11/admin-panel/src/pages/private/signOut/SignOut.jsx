import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/auth/actions'
import { Redirect } from 'react-router-dom'
import { SIGN_IN } from '@/config/routes'

export const SignOut = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logout())
  }, [dispatch])

  return <Redirect to={SIGN_IN} />
}
