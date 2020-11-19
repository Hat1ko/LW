import React from 'react'
import { Typography } from '@/components'

export const NotFound = ({ text, variant = 'h1', ...props }) => {
  return (
    <Typography {...props} variant={variant}>
      {text || 'Страница не найдена'}
    </Typography>
  )
}
