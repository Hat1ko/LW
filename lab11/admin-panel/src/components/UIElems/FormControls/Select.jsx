import React, { useState, useRef } from 'react'
import { useClickOutside } from '@/hooks'
import { Icon } from '@/components'
import classes from './style.scss'

const Option = ({ label, value, selected, onClick }) => {
  const handleClick = () => {
    onClick(value)
  }
  const cls = [
    classes.selectOption,
    selected ? classes.selectOptionSelected : '',
  ].join(' ')
  return (
    <div className={cls} onClick={handleClick}>
      <div className={classes.selectOption__checkbox}>
        {selected ? (
          <div className={classes.selectOption__checkIcon}></div>
        ) : (
          ''
        )}
      </div>
      <div>{label}</div>
    </div>
  )
}

export const Select = ({
  options,
  value = '',
  name,
  placeholder,
  onChange,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useClickOutside(wrapperRef, () => {
    setIsOpen(false)
  })

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  const handleOnChange = value => {
    setIsOpen(false)
    if (onChange) onChange(value)
  }

  const optionsList = options.map((option, index) => (
    <Option
      key={index}
      {...option}
      name={name}
      selected={option.value === value ? true : false}
      onClick={handleOnChange}
    />
  ))

  const selectLabel = options.find(option => option.value === value)?.label

  const cls = [classes.select, isOpen ? classes.open : ''].join(' ')

  const icon = isOpen ? 'ArrowUp' : 'ArrowDown'

  return (
    <div ref={wrapperRef} className={cls}>
      <div className={classes.selectLabel} onClick={onClick}>
        {(defaultValue !== value && selectLabel) || placeholder}
        <input type="hidden" name={name} value={value} />
        <Icon indent={{ left: 10 }} height={7} name={icon} />
      </div>
      {isOpen ? <div className={classes.selectOptions}>{optionsList}</div> : ''}
    </div>
  )
}
