import * as yup from 'yup'

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('form.error.required')
    .min(1, ({ min }) => ({ key: 'form.error.minLength', params: { min } })),
  lastName: yup
    .string()
    .required('form.error.required')
    .min(1, ({ min }) => ({ key: 'form.error.minLength', params: { min } })),
  phoneNumber: yup
    .string()
    .matches(
      /^((\+38\(0[0-9]{2}\)[0-9]{3}-[0-9]{2}-[0-9]{2})|(\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}))?$/i,
      'form.error.noValidPhone'
    ),
  email: yup
    .string()
    .required('form.error.required')
    .email('form.error.noValidEmail'),
})
