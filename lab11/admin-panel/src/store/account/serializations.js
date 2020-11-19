export const serializationAccountData = ({
  firstName,
  lastName,
  phoneNumber,
  ...data
}) => ({
  id: data.user.id,
  firstName,
  lastName,
  phoneNumber,
  photo: data.user.photoUrl,
  email: data.user.email,
})
