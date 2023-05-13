import ru from './locales/ru.json'

import {initReactI18next} from 'react-i18next'
import i18n from 'i18next'

const resources = {
  ru: {
    translation: ru,
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    // @ts-ignore
    lng: JSON.parse(localStorage.getItem('language')),
    fallbackLng: 'ru'
  })

export default i18n;