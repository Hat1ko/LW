import React from 'react'
import classes from './style.scss'

const Radio = ({ label, value, selected, onClick }) => {
  const handleClick = () => {
    onClick(value)
  }
  const cls = [
    classes.radioGroup__input,
    selected ? classes.radioGroup_selected : '',
  ].join(' ')
  return (
    <div className={cls} onClick={handleClick}>
      <div className={classes.radioGroup__checkbox}>
        {selected ? <div className={classes.radioGroup__checkIcon}></div> : ''}
      </div>
      <div>{label}</div>
    </div>
  )
}

export const RadioGroup = ({
  options,
  value = '',
  name,
  onChange,
  fullWidth,
  register,
  error,
}) => {
  const handleOnChange = value => {
    if (onChange) onChange(value)
  }

  const radioList = options.map((option, index) => (
    <Radio
      key={index}
      {...option}
      name={name}
      selected={option.value === value ? true : false}
      onClick={handleOnChange}
    />
  ))

  const cls = [
    classes.radioGroup,
    fullWidth ? classes.radioGroup_fullWidth : '',
  ].join(' ')

  return (
    <div className={cls}>
      <div className={classes.radioGroup__error}>{error}</div>
      <input type="hidden" ref={register} name={name} value={value} />
      {radioList}
    </div>
  )
}
