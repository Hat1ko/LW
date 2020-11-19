import { useCallback } from 'react'
import i18n from '@/i18n'

export const useTranslate = () => {
  const t = useCallback((value) => {
    try {
      if (value) {
        if (typeof value === 'string') return i18n.t(value)

        if (typeof value === 'object') {
          const { key, params } = value

          if (key && params) {
            return i18n.t(key, params)
          }

          if (key) {
            return i18n.t(key)
          }
        }
      }

      return value
    } catch (error) {
      console.log('Don`t translated value', error)
      return
    }
  }, [])

  return {
    t,
  }
}
