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

export const WIT_UNIT = {
  WIT: 'wit',
  MILLI: 'milliWit',
  MICRO: 'microWit',
  NANO: 'nanoWit',
}
export const DEFAULT_WIT_UNIT = WIT_UNIT.WIT

export const NETWORK_STATUS = {
  NODE_DISCONNECTED: 'NODE DISCONNECTED',
  SYNC_ERROR: 'SYNC ERROR',
  SYNCED: 'SYNCED',
  SYNCING: 'SYNCING',
  WAITING_FOR_NODE_TO_SYNC: 'WAITING FOR NODE TO SYNC',
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

export const TEMPLATE_EMPTY_DESCRIPTION = 'No description provided'

export const TEXT_NOTIFICATION_COPY_BLOCK = 'Block hash copied'
export const TEXT_NOTIFICATION_COPY_TX = 'Transaction ID copied'

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
  BLOCK: { key: 'block', title: 'Block notifications' },
  TRANSACTIONS: { key: 'transactions', title: 'Transactions notifications' },
  PAYMENTS: { key: 'payments', title: 'Payments notifications' },
  SYNCRONIZATION: {
    key: 'syncronization',
    title: 'Syncronization notifications',
  },
}

export const SETTINGS = {
  CURRENCY: 'CURRENCY',
  RESYNC: 'RESYNC',
  EXPORT_XPRV: 'EXPORT_XPRV',
  COMMUNITY: 'COMMUNITY',
  NOTIFICATIONS: 'NOTIFICATIONS',
}

export const SETTINGS_SECTIONS = {
  GENERAL: 'GENERAL',
  ADVANCED: 'ADVANCED',
  NOTIFICATIONS: 'NOTIFICATIONS',
  ABOUT: 'ABOUT',
}

export const SETTINGS_BY_SECTION = {
  GENERAL: [SETTINGS.CURRENCY],
  ADVANCED: [SETTINGS.EXPORT_XPRV, SETTINGS.RESYNC],
  NOTIFICATIONS: [SETTINGS.NOTIFICATIONS],
  ABOUT: [SETTINGS.COMMUNITY],
}
