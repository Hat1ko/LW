import React, { useState } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import {
  Sidebar,
  Logo,
  MenuList,
  PageWrapper,
  NotFound,
  MenuButton,
} from '@/components'
import {
  baseMenu,
  SIGN_IN,
  SIGN_OUT,
  DOCUMENTS,
  USERS,
  PROFILE,
} from '@/config/routes'
import classes from './style.scss'
import { Home } from './home'
import { Documents } from './documents'
import { Document } from './document'
import { Users } from './users'
import { User } from './user'
import { Profile } from './profile'
import { SignOut } from './signOut'
import { ModalLogOut } from './atoms/ModalLogOut'
import { RouteWithLayout, UsersModule, DocumentsModule } from '@/layouts'

export const Private = () => {
  const [full, setFull] = useState(true)
  const [isOpenModalLogOut, setIsOpenModalLogOut] = useState(false)
  const history = useHistory()
  const handlerOpenModalLogOut = () => setIsOpenModalLogOut(true)
  const handlerCloseModalLogOut = () => setIsOpenModalLogOut(false)
  const handlerSubmitModalLogOut = () => history.push(SIGN_OUT)

  return (
    <div className={classes.wrapper}>
      <Sidebar full={full} onClickControl={setFull}>
        <Logo
          url={'/'}
          topIndent={20}
          bottomIndent={20}
          white={true}
          small={true}
          fullWidth
          justify="center"
          withText
          showText={full}
        />
        <nav>
          <MenuList list={baseMenu} />
        </nav>
        <MenuButton
          icon="LogOut"
          label="Выйти"
          onClick={handlerOpenModalLogOut}
        />
      </Sidebar>
      <PageWrapper>
        <Switch>
          <RouteWithLayout
            layout={DocumentsModule}
            path="/"
            exact
            component={Home}
          />
          <RouteWithLayout
            layout={DocumentsModule}
            path={`${DOCUMENTS}/:id(\\d+)`}
            component={Document}
          />
          <RouteWithLayout
            layout={DocumentsModule}
            path={DOCUMENTS}
            component={Documents}
          />
          <RouteWithLayout
            path={`${USERS}/:id(\\d+)`}
            layout={UsersModule}
            component={User}
          />
          <RouteWithLayout
            path={USERS}
            layout={UsersModule}
            component={Users}
          />
          <Route path={PROFILE} exact component={Profile} />
          <Route path={SIGN_OUT} exact component={SignOut} />
          <Route path={SIGN_IN} exact render={() => <Redirect to={'/'} />} />
          <Route path="*" component={NotFound} />
        </Switch>
      </PageWrapper>
      <ModalLogOut
        onSubmit={handlerSubmitModalLogOut}
        onClose={handlerCloseModalLogOut}
        open={isOpenModalLogOut}
      />
    </div>
  )
}
