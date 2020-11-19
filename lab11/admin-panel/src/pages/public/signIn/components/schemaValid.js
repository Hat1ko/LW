import * as yup from 'yup'

export const schema = yup.object().shape({
  email: yup
    .string()
    .email('form.error.noValidEmail')
    .required('form.error.required'),
  password: yup.string().required('form.error.required'),
})
