import React, { useState } from 'react'
import { SendEmail } from './SendEmail'
import { SendCode } from './SendCode'
import { SendPassword } from './SendPassword'
import classes from './../style.scss'

const getForm = (step, changeStep) => {
  switch (step) {
    case 1:
      return (
        <SendEmail
          step={step}
          nextStep={() => {
            changeStep(2)
          }}
        />
      )
    case 2:
      return (
        <SendCode
          step={step}
          nextStep={() => {
            changeStep(3)
          }}
        />
      )
    case 3:
      return <SendPassword step={step} />
    default:
      return null
  }
}

export const FormSteps = () => {
  const [step, setStep] = useState(1)

  return <div className={classes.wrapperForm}>{getForm(step, setStep)}</div>
}
