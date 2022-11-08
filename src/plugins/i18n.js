// import Vue from 'vue'
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json';
// import es from '@/locales/es.json'
const data = import.meta.glob('../locales/*.json')
// Vue.use(VueI18n)
// console.log('data---->', data)
// console.log('{{------>', JSON.parse(JSON.stringify(data)))
console.log('en', en)
export default new createI18n({
  locale:
    navigator.language.split('-')[0] || navigator.languages[0].split('-')[0],
  fallbackLocale: 'en',
  messages: {
    // TODO: allow to load json files
    en,
    // es,
  },
})
