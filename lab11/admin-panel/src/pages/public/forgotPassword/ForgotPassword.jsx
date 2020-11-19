import React from 'react'
import { AuthBox, AuthBoxImage, Logo } from '@/components'
import { FormSteps } from './components'
import bgImage from '@/assets/img/AuthBoxBg.png'
import classes from './style.scss'

export const ForgotPassword = () => {
  return (
    <div className={classes.container}>
      <AuthBox width={450} headAlign="center" head={<Logo url={'/'} />}>
        <FormSteps />
      </AuthBox>
      <AuthBoxImage image={bgImage} />
    </div>
  )
}
