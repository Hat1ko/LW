import i18n from 'i18next'
import { reactI18nextModule } from 'react-i18next'

import ru from './ru'

const resources = {
  ru: {
    translation: ru,
  },
}
i18n.use(reactI18nextModule).init({
  lng: 'ru',
  resources,
  debug: true,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
