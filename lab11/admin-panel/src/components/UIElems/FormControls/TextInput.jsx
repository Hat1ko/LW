import React, { useState } from 'react'
import MaskedInput from 'react-text-mask'
import classes from './style.scss'

const InputComponent = ({ mask, showMask, register, ...props }) => {
  if (mask) {
    return (
      <MaskedInput
        ref={(ref) => ref && register(ref.inputElement)}
        mask={mask}
        guide={false}
        showMask={showMask}
        {...props}
      />
    )
  } else return <input ref={register} {...props} />
}

export const TextInput = ({
  name,
  type,
  disabled,
  placeholder,
  label,
  onChange,
  fullWidth,
  className,
  error,
  bottomIndent,
  topIndent,
  mask,
  register,
  defaultValue,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false)
  const [isEmpty, setIsEmpty] = useState(!!!defaultValue)
  const cls = [
    classes.textInput__wrapper,
    isFocus ? classes.textInput_focus : '',
    !isEmpty ? classes.textInput_empty : '',
    fullWidth ? classes.textInput_fullWidth : '',
    disabled ? classes.textInput_disabled : '',
    error ? classes.textInput_error : '',
    className,
  ].join(' ')

  const onFocusInput = (e) => {
    setIsFocus(true)
    setIsEmpty(false)
  }

  const onBlurInput = (e) => {
    setIsFocus(false)

    if (e.target.value.length === 0) {
      setIsEmpty(true)
    }
  }

  if (type === 'hidden') {
    return (
      <InputComponent
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        onChange={onChange}
        register={register}
        mask={mask}
        disabled={disabled}
        showMask={!isEmpty || isFocus}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        defaultValue={defaultValue}
        {...props}
      />
    )
  }

  return (
    <div
      className={cls}
      style={{ marginBottom: bottomIndent, marginTop: topIndent }}
    >
      <label className={classes.textInput__label}>{label}</label>
      <div className={classes.textInput__field}>
        <InputComponent
          name={name}
          type={type || 'text'}
          placeholder={placeholder}
          onChange={onChange}
          register={register}
          mask={mask}
          disabled={disabled}
          showMask={!isEmpty || isFocus}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          defaultValue={defaultValue}
          {...props}
        />
      </div>
      {error ? <div className={classes.textInput__error}>{error}</div> : ''}
    </div>
  )
}
