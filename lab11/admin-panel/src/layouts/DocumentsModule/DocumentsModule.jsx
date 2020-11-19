import React, { useEffect } from 'react'
import { setFetchingDocumentsParams } from '@/store/document/actions'
import { useForm } from 'react-hook-form'
import { PageContainer, HeaderBar } from '@/components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { DOCUMENTS } from '@/config/routes'

export const DocumentsModule = ({ children }) => {
  const { handleSubmit, register, setValue } = useForm()
  const history = useHistory()
  const account = useSelector(state => state.account)
  const searchQuery = useSelector(state => state.document.fetchingParams.search)
  const dispatch = useDispatch()

  useEffect(() => {
    setValue('search', searchQuery)
  }, [searchQuery, setValue])

  const onSearch = handleSubmit(data => {
    dispatch(setFetchingDocumentsParams(data))
    history.push(DOCUMENTS)
  })

  const onClearSearch = () =>
    dispatch(setFetchingDocumentsParams({ search: '' }))
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
    </>
  )
}
