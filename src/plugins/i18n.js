import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Vue.use(VueI18n)

export default new createI18n({
  locale:
    navigator.language.split('-')[0] || navigator.languages[0].split('-')[0],
  fallbackLocale: 'en',
  messages: {
    en: require('@/locales/en.json'),
    es: require('@/locales/es.json'),
  },
})
