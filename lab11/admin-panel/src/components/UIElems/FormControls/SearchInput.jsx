import React, { useState, useEffect } from 'react'
import classes from './style.scss'
import { Icon } from '@/components'

export const SearchInput = ({
  name,
  type,
  placeholder,
  label,
  onChange,
  className,
  error,
  bottomIndent,
  register,
  width,
  onClear,
  defaultValue,
}) => {
  const [isEmpty, setIsEmpty] = useState(!!!defaultValue)
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    setIsEmpty(!!!defaultValue)
  }, [defaultValue])

  const handleOnChange = e => {
    let action = e.target.value.length > 0 ? false : true
    setIsEmpty(action)
    if (onChange) onChange(e)
  }

  const handlerFocus = () => {
    setIsFocus(true)
  }

  const handlerBlur = () => {
    setIsFocus(false)
  }

  const cls = [
    classes.searchInput__wrapper,
    isFocus || !isEmpty ? classes.searchInput_focus : '',
    className,
  ].join(' ')

  return (
    <div className={cls} style={{ width: width, marginBottom: bottomIndent }}>
      <div className={classes.searchInput__containerIcon}>
        <div className={classes.searchInput__divider}></div>
        <Icon className={classes.searchInput__icon} name="Search" />
      </div>
      <div className={classes.searchInput__field}>
        {isEmpty && (
          <label className={classes.searchInput__label}>
            {placeholder || label}
          </label>
        )}
        <input
          ref={register}
          onChange={handleOnChange}
          name={name}
          onFocus={handlerFocus}
          onBlur={handlerBlur}
          type={type || 'text'}
        />
      </div>
      <button
        tabIndex={-1}
        type="button"
        className={classes.searchInput__buttonClose}
        onClick={onClear}
      >
        <Icon name="Close" />
      </button>
      {error ? <div className={classes.searchInput__error}>{error}</div> : ''}
    </div>
  )
}
