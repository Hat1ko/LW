import React from 'react'

import { AuthBox, AuthBoxImage, AuthTypographyHeader, Logo } from '@/components'
import { SignInForm } from './components/signInForm'
import classes from './style.scss'
import bgImage from '@/assets/img/AuthBoxBg.png'

export const SignIn = () => {
  return (
    <div className={classes.container}>
      <AuthBox width={450} headAlign="center" head={<Logo url={'/'} />}>
        <AuthTypographyHeader bottomIndent={50}>
          Пожалуйста авторизируйтесь:
        </AuthTypographyHeader>
        <SignInForm />
      </AuthBox>
      <AuthBoxImage image={bgImage} />
    </div>
  )
}
