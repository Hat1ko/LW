import React from 'react'
import { Route } from 'react-router-dom'

export const RouteWithLayout = props => {
  const {
    path,
    layout: Layout,
    component: Component,
    options,
    ...restProps
  } = props

  return (
    <Route
      {...restProps}
      path={path}
      render={matchProps => (
        <Layout {...options}>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  )
}
