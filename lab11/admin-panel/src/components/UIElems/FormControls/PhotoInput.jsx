import React from 'react'
import { Icon } from '@/components'
import classes from './style.scss'

export const PhotoInput = ({
  name,
  photo,
  size,
  component,
  onChange,
  onClear,
  preview,
}) => {
  const PreviewComponent = component

  return (
    <div className={classes.photoInput}>
      <PreviewComponent photo={preview ?? photo} size={size} />

      {preview ? (
        <button
          type="button"
          onClick={onClear}
          className={classes.photoInput__button}
        >
          Очистить
          <Icon
            indent={{ left: 10 }}
            width={20}
            variant="error"
            height={20}
            title="Очистить"
            name="Denied"
          />
        </button>
      ) : (
        <label className={classes.photoInput__label}>
          Загрузить новое фото
          <Icon
            indent={{ left: 10 }}
            width={20}
            height={20}
            title="Выбрать файл"
            name="Upload"
          />
          <input
            className={classes.photoInput__input}
            type="file"
            name={name}
            onChange={onChange}
          />
        </label>
      )}
    </div>
  )
}
