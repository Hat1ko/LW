import React, { useEffect, useCallback, useState } from 'react'
import { Private } from '@/pages'
import { Public } from '@/pages'
import { useDispatch, useSelector } from 'react-redux'
import { autoLogin } from '@/store/auth/actions'

export const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const accessToken = useSelector(state => state.auth.accessToken)
  const accountId = useSelector(state => state.account.id)
  const dispatch = useDispatch()

  console.log('App init')

  const bootstrap = useCallback(async () => {
    try {
      await dispatch(autoLogin())
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    bootstrap()
  }, [bootstrap])

  if (isLoading) return 'Loading...'

  if (accessToken && accountId) {
    return <Private />
  } else {
    return <Public />
  }
}
