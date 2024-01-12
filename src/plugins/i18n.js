import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import es from '@/locales/es.json'

export default new createI18n({
  locale:
    navigator.language.split('-')[0] || navigator.languages[0].split('-')[0],
  fallbackLocale: 'en',
  messages: {
    en,
    es,
  },
})
