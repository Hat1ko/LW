import * as yup from 'yup'

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email('form.error.noValidEmail')
    .required('form.error.required'),
})

export const codeSchema = yup.object().shape({
  code: yup.string().required('form.error.required'),
})

export const passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('form.error.required')
    .min(8, ({ min }) => ({ key: 'form.error.minLength', params: { min } })),
  confirmPassword: yup
    .string()
    .required('form.error.required')
    .oneOf([yup.ref('newPassword'), null], 'form.error.noMatchPasswords'),
})
