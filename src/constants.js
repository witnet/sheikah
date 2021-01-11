import i18n from '@/plugins/i18n'

export const EDITOR_ALLOWED_PROTOCOLS = ['http', 'https']

export const EDITOR_EXPORT_FORMAT = {
  JSON: 'json',
  js: 'js',
}

export const TRANSACTIONS_LIMIT = 13
export const EDITOR_TRY_INTERVAL = 3000
export const EDITOR_SAVE_INTERVAL = 3000

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

export const LANGUAGES = {
  ES: 'Español',
  EN: 'English',
}

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

export const LOCALES = {
  [LANGUAGES.ES]: 'es',
  [LANGUAGES.EN]: 'en',
}

export const DEFAULT_LANGUAGE = LANGUAGES.EN
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

export const NETWORK_STATUS = {
  NODE_DISCONNECTED: i18n.t('node_disconnected'),
  SYNC_ERROR: i18n.t('sync_error'),
  SYNCED: i18n.t('synced'),
  SYNCING: i18n.t('syncing'),
  WAITING_FOR_NODE_TO_SYNC: i18n.t('waiting_for_node_to_sync'),
}

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

export const TEMPLATE_EMPTY_DESCRIPTION = i18n.t('template_empty_description')

export const TEXT_NOTIFICATION_COPY_BLOCK = i18n.t('block_hash_copied')
export const TEXT_NOTIFICATION_COPY_TX = i18n.t('tx_id_copied')

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
}

export const GENESIS_EVENT_TIMESTAMP = 1602666000000

// Syncing time estimador
export const SYNCING_TIME_WINDOW_LENGTH = 100

export const NOTIFICATIONS = {
  BLOCK: { key: 'block', title: i18n.t('block_notifications_title') },
  TRANSACTIONS: {
    key: 'transactions',
    title: i18n.t('tx_notifications_title'),
  },
  PAYMENTS: { key: 'payments', title: i18n.t('payments_notifications_title') },
  SYNCRONIZATION: {
    key: 'syncronization',
    title: i18n.t('syncronization_notifications_title'),
  },
}

export const SETTINGS = {
  UNIT: 'UNIT',
  RESYNC: 'RESYNC',
  EXPORT_XPRV: 'EXPORT_XPRV',
  COMMUNITY: 'COMMUNITY',
  NOTIFICATIONS: 'NOTIFICATIONS',
  LANGUAGE: 'LANGUAGE',
  APPEARANCE: 'APPEARANCE',
}

export const SETTINGS_SECTIONS = {
  GENERAL: 'GENERAL',
  ADVANCED: 'ADVANCED',
  NOTIFICATIONS: 'NOTIFICATIONS',
  ABOUT: 'ABOUT',
}

export const SETTINGS_BY_SECTION = {
  // TODO: include SETTINGS.LASGUAGE within general settings section when the transalations are ready
  GENERAL: [SETTINGS.UNIT, SETTINGS.APPEARANCE],
  ADVANCED: [SETTINGS.EXPORT_XPRV, SETTINGS.RESYNC],
  NOTIFICATIONS: [SETTINGS.NOTIFICATIONS],
  ABOUT: [SETTINGS.COMMUNITY],
}

export const TEMPLATES_PER_PAGE = 9
