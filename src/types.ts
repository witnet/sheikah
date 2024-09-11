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

export enum ContentType {
  JsonApi = 'JSON API',
  BinaryFile = 'Binary file',
  Unknown = 'Unknown',
}

export enum Kind {
  HttpGet = 'HTTP-GET',
  HttpPost = 'HTTP-POST',
  Rng = 'RNG',
  Head = 'Head',
}

export enum SetupMessages {
  runningWallet,
  updatingWalletBackend,
  walletUpToDate,
  loaded,
}
