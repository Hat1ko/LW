import React from 'react'
import Loader from 'react-loader-spinner'

export const LsLoader = ({ size }) => {
  return <Loader type="TailSpin" color="#ff681c" height={size} width={size} />
}
