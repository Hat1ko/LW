import React from 'react'
import { SearchInput } from '@/components'

export const SearchForm = ({ onSubmit, ...props }) => {
  return (
    <form onSubmit={onSubmit}>
      <SearchInput width={540} name="search" placeholder="Поиск" {...props} />
    </form>
  )
}
