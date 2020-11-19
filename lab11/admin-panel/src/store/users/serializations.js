export const serializationUsers = (data) =>
  data.map((user) => serializationUserList(user))

const serializationUserList = (user) => ({
  id: user.user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  city: {
    name: user.city.name,
    id: user.city.id,
  },
  country: {
    name: user.city.country.name,
    code: user.city.country.code,
    id: user.city.country.id,
  },
  photo: user.photoUrl,
  typeActivity: user.user.serviceToUsers
    .map((item) => item.service.name)
    .join(' '),
  isActive: user.user.isActive,
  email: user.user.email,
})

export const serializationUser = (data) => ({
  id: data.user.id,
  firstName: data.firstName,
  lastName: data.lastName,
  city: {
    name: data.city.name,
    id: data.city.id,
  },
  country: {
    name: data.city.country.name,
    code: data.city.country.code,
    id: data.city.country.id,
  },
  address: data?.addressLine || null,
  photo: data.photoUrl,
  typeActivity: data.user.serviceToUsers
    .map((item) => item.service.name)
    .join(' '),
  isActive: data.user.isActive,
  email: data.user.email,
  phones: data?.phoneNumbers.map((item) => item.phoneNumber),
})

export const adapterFilterParams = (params) => {
  const newParams = { ...params }

  if (!newParams.filterByStatus) {
    if (newParams.hasOwnProperty('filterByStatus')) {
      delete newParams.filterByStatus
    }
  }

  if (newParams.search) {
    newParams.filterByFullName = newParams.search
    delete newParams.search
  }

  return newParams
}
