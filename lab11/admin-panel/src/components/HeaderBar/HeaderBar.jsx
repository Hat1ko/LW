import React from 'react'
import classes from './style.scss'
import { SearchForm } from '@/components'
import { HeaderProfileInfo } from './HeaderProfileInfo'

export const HeaderBar = ({
  onSearch,
  register,
  onClearSearch,
  defaultSearchValue,
  account,
}) => {
  return (
    <div className={classes.wrapper}>
      {onSearch ? (
        <SearchForm
          register={register}
          onClear={onClearSearch}
          defaultValue={defaultSearchValue}
          onSubmit={onSearch}
        />
      ) : (
        <div></div>
      )}
      <HeaderProfileInfo {...account} />
    </div>
  )
}
