import en from './locales/en.json'
import ru from './locales/ru.json'
import kz from './locales/kz.json'
import ua from './locales/ua.json'
import de from './locales/de.json'

import {initReactI18next} from 'react-i18next'
import i18n from 'i18next'

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  kz: {
    translation: kz,
  },
  ua: {
    translation: ua,
  },
  de: {
    translation: de,
  }
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