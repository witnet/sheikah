export type CustomLocale = {
  name: string
  locale: string
  fnsLocale: any
  elementLocale: any
}

export enum LocaleCodes {
  en = 'en',
  es = 'es',
}

export interface LanguageDictionary {
  [LocaleCodes.en]: CustomLocale
  [LocaleCodes.es]: CustomLocale
}
