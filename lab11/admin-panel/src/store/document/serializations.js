export const serializationDocuments = (data) =>
  data.map((document) => serializationDocument(document))

export const serializationDocument = (data) => ({
  id: data.id,
  status: data.status,
  date: data.createDate,
  name: data.name,
  user: serializationDocumentUser(data.user),
})

const serializationDocumentUser = (user) => ({
  id: user.id,
  firstName: user.customerInfo.firstName,
  lastName: user.customerInfo.lastName,
  city: {
    name: user.customerInfo.city.name,
    id: user.customerInfo.city.id,
  },
  country: {
    name: user.customerInfo.city.country.name,
    id: user.customerInfo.city.country.id,
    code: user.customerInfo.city.country.code,
  },
})

export const adapterFilterParams = (params) => {
  const newParams = { ...params }

  if (!newParams.filterByStatus) {
    if (newParams.hasOwnProperty('filterByStatus')) {
      delete newParams.filterByStatus
    }
  }

  if (newParams.search) {
    newParams.filterByDocumentName = newParams.search
    delete newParams.search
  }

  return newParams
}
