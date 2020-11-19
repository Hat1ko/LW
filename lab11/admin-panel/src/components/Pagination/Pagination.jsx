import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './style.scss'

const PaginationItem = ({ url, page, active, label }) => {
  const cls = [classes.control, active ? classes.control_active : ''].join(' ')
  return (
    <NavLink className={cls} to={`${url}?page=${page}`}>
      {label || page}
    </NavLink>
  )
}

export const Pagination = ({ url, activePage, total, pageSize }) => {
  if (total) {
    activePage = parseInt(activePage)
    const maxCountPagesShow = 20
    const countPages = Math.ceil(total / pageSize)
    const startItem = (activePage - 1) * pageSize + 1
    const endItem =
      activePage * pageSize < total ? activePage * pageSize : total
    const leftBorder =
      activePage < maxCountPagesShow / 2
        ? 1
        : activePage - maxCountPagesShow / 2
    const rightBorder =
      activePage + maxCountPagesShow / 2 > countPages
        ? countPages
        : activePage + maxCountPagesShow / 2
    const pages = []

    for (let i = leftBorder; i <= rightBorder; i++) {
      pages.push(i)
    }

    return (
      <>
        <div className={classes.text}>
          Показано с <b>{startItem}</b> по <b>{endItem}</b> из <b>{total}</b>
          <span className={classes.text__page}>(Cтраниц {countPages})</span>
        </div>
        <div className={classes.wrapper}>
          {leftBorder > maxCountPagesShow / 2 && activePage !== countPages && (
            <PaginationItem url={url} page={1} label="<<" />
          )}
          {pages.map(p => (
            <PaginationItem
              key={p}
              url={url}
              page={p}
              active={+activePage === p}
            />
          ))}
          {countPages > rightBorder && activePage !== countPages && (
            <PaginationItem url={url} page={countPages} label=">>" />
          )}
        </div>
      </>
    )
  }

  return null
}
