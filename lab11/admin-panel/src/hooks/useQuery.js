import { useLocation } from 'react-router-dom'

/**
 * Hook parse react-router-dom location search query to object key:value
 * @param {object} defaultValues
 */
export const useQuery = defaultValues => {
  const query = new URLSearchParams(useLocation().search)
  const result = {}
  for (let key of query.keys()) {
    result[key] = query.get(key)
  }

  Object.keys(defaultValues).map(k => {
    if (!result[k]) result[k] = defaultValues[k]
    return null
  })

  return result
}
