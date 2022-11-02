import { es as fnsEs, enGB } from 'date-fns/locale'
import en from 'element-plus/dist/locale/en.mjs'
import es from 'element-plus/dist/locale/es.mjs'
import bitcoinPrice from '@/radExamples/bitcoinPrice.js'
import ethPrice from '@/radExamples/ethPrice.js'

export const EDITOR_ALLOWED_PROTOCOLS = ['http', 'https']

export const EDITOR_EXPORT_FORMAT = {
  JSON: 'json',
  js: 'js',
}

export const TRANSACTIONS_LIMIT = 13
export const EDITOR_TRY_INTERVAL = 3000
export const EDITOR_SAVE_INTERVAL = 3000
export const SECONDS_TO_NEXT_BLOCK = 45
export const FEE_TIERS = ['stinky', 'low', 'medium', 'high', 'opulent']

export const NETWORK_STATUS = {
  NODE_DISCONNECTED: 'node_disconnected',
  SYNCED: 'synced',
  SYNC_ERROR: 'sync_error',
  SYNCING: 'syncing',
  WAITING_FOR_NODE_TO_SYNC: 'waiting_for_node_to_sync',
}

export const EDITOR_STAGES = {
  SETTINGS: 'settings',
  SOURCES: 'sources',
  SCRIPTS: 'scripts',
  AGGREGATIONS: 'aggregations',
  TALLY: 'tally',
}

export const SOURCES_WITH_REDUCED_DISCLAIMERS = [
  'tip',
  'stakeholder',
  'founder',
]

export const VTT_DEFAULT_VALUES = {
  address: '',
  label: '',
  amount: null,
  fee: null,
  isWeightedFee: true,
  timelock: null,
}

export const DR_DEFAULT_VALUES = {
  commitAndRevealFee: '1',
  dataRequest: '1',
  fee: '1',
  isWeightedFee: true,
  minConsensusPercentage: '51',
  rewardFee: '1',
  witnesses: '3',
  collateral: '1000000000',
}

// TODO: update locales to element-plus
export const LANGUAGES = {
  es: { name: 'Español', locale: 'es', fnsLocale: fnsEs, elementLocale: es },
  en: { name: 'English', locale: 'en', fnsLocale: enGB, elementLocale: en },
}

export const DEFAULT_LOCALE = 'en'

export const CUSTOM_ICON_NAMES = [
  'add-operator',
  'add',
  'close-btn',
  'close-btn-light',
  'close',
  'delete-btn',
  'disconnected',
  'down',
  'exit-icon',
  'long-arrow',
  'negative',
  'open',
  'operator-arrow',
  'options-marketplace',
  'options',
  'positive',
  'sheikah-icon',
  'sheikah-small',
  'sheikah',
  'sort-down',
  'sort-up',
  'up',
]

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
}

export const DEFAULT_THEME = THEMES.LIGHT

export const WIT_UNIT = {
  WIT: 'Wit',
  MILLI: 'milliWit',
  MICRO: 'microWit',
  NANO: 'nanoWit',
}

export const DEFAULT_WIT_UNIT = WIT_UNIT.WIT

export const WALLET_EVENTS = {
  BLOCK: 'Block',
  MOVEMENT: 'Movement',
  SYNC_FINISH: 'SyncFinish',
  SYNC_PROGRESS: 'SyncProgress',
  SYNC_START: 'SyncStart',
  BLOCK_CONSOLIDATE: 'BlocksConsolidate',
  BLOCK_ORPHAN: 'BlocksOrphan',
  NODE_STATUS_CHANGED: 'NodeStatus',
  NODE_SYNC_ERROR: 'SyncError',
  NODE_DISCONNECTED: 'NodeDisconnected',
}

// Generate address delay in ms
export const GENERATE_ADDRESS_DELAY = 300

export const HISTORY_UPDATE_TYPE = {
  DELETE_OPERATOR: 'DELETE_OPERATOR',
  PUSH_OPERATOR: 'PUSH_OPERATOR',
  DELETE_SOURCE: 'DELETE_SOURCE',
  ADD_SOURCE: 'ADD_SOURCE',
  UPDATE_TEMPLATE: 'UPDATE_TEMPLATE',
  UPDATE_SOURCE: 'UPDATE_SOURCE',
  UPDATE_VARIABLE: 'UPDATE_VARIABLE',
  ADD_VARIABLE: 'ADD_VARIABLE',
  DELETE_VARIABLE: 'DELETE_VARIABLE',
  UPDATE_DESCRIPTION: 'UPDATE_DESCRIPTION',
  UPDATE_NAME: 'UPDATE_NAME',
}

export const EXTERNAL_URL = {
  BALANCE_LOCKED: 'https://witnet.io',
  SHEIKAH_WEBSITE: 'https://sheikah.app/',
  WITNET_BLOCK_EXPLORER: 'https://witnet.network',
}

export const GENESIS_EVENT_TIMESTAMP = 1602666000000

// Syncing time estimador
export const SYNCING_TIME_WINDOW_LENGTH = 100

export const NOTIFICATIONS = {
  BLOCK: 'block',
  TRANSACTIONS: 'transactions',
  PAYMENTS: 'payments',
  SYNCRONIZATION: 'syncronization',
}

export const SETTINGS = {
  UNIT: 'UNIT',
  RESYNC: 'RESYNC',
  EXPORT_XPRV: 'EXPORT_XPRV',
  COMMUNITY: 'COMMUNITY',
  NOTIFICATIONS: 'NOTIFICATIONS',
  LANGUAGE: 'LANGUAGE',
  APPEARANCE: 'APPEARANCE',
  RENAME: 'RENAME',
  DELETE: 'DELETE',
}

export const SETTINGS_SECTIONS = {
  GENERAL: 'GENERAL',
  ADVANCED: 'ADVANCED',
  NOTIFICATIONS: 'NOTIFICATIONS',
  ABOUT: 'ABOUT',
}

export const SETTINGS_BY_SECTION = {
  // TODO: include SETTINGS.LASGUAGE within general settings section when the transalations are ready
  GENERAL: [SETTINGS.UNIT, SETTINGS.APPEARANCE, SETTINGS.LANGUAGE],
  ADVANCED: [
    SETTINGS.EXPORT_XPRV,
    SETTINGS.RESYNC,
    SETTINGS.RENAME,
    SETTINGS.DELETE,
  ],
  NOTIFICATIONS: [SETTINGS.NOTIFICATIONS],
  ABOUT: [SETTINGS.COMMUNITY],
}

export const TEMPLATES_PER_PAGE = 12

export const BIRTH_DATE_DELAY_DAYS = 30

// 2020-10-14 09:00:00
export const GENESIS_TIMESTAMP = 1602666000000

export const EPOCH_PERIOD = 45 * 1000

export const RAD_EXAMPLES = [
  {
    name: 'Bitcoin price',
    description: 'Bitcoin price in USD',
    radRequest: bitcoinPrice,
  },
  {
    name: 'Eth price',
    description: 'Eth price in USD',
    radRequest: ethPrice,
  },
]
