export const EDITOR_ALLOWED_PROTOCOLS = ['http', 'https']

export const EDITOR_EXPORT_FORMAT = {
  JSON: 'json',
  js: 'js',
}

export const EDITOR_TRY_INTERVAL = 3000
export const EDITOR_SAVE_INTERVAL = 3000

export const EDITOR_STAGES = {
  SETTINGS: 'settings',
  SOURCES: 'sources',
  SCRIPTS: 'scripts',
  AGGREGATIONS: 'aggregations',
  TALLY: 'tally',
}

export const WIT_UNIT = {
  WIT: 'wit',
  MICRO: 'microWit',
  NANO: 'nanoWit',
}

export const WALLET_EVENTS = {
  BLOCK: 'Block',
  MOVEMENT: 'Movement',
  SYNC_FINISH: 'SyncFinish',
  SYNC_PROGRESS: 'SyncProgress',
  SYNC_START: 'SyncStart',
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
