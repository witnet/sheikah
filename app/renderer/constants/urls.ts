// Forms base URL
export const FORMS = "/forms"

// WalletForm URLs
export const NEW_WALLET = `${FORMS}/wallet`
export const WELCOME = `${NEW_WALLET}/welcome`
export const WALLET_SEED_ADVANCED_OPTIONS = `${NEW_WALLET}/advanced-options`
export const WALLET_SEED_DISCLAIMER = `${NEW_WALLET}/seed-disclaimer`
export const WALLET_SEED_TYPE_SELECTION = `${NEW_WALLET}/wallet-seed-type-selection`
export const WALLET_SEED_BACKUP = `${NEW_WALLET}/wallet-seed-backup`
export const WALLET_SEED_CONFIRMATION = `${NEW_WALLET}/wallet-seed-confirmation`
export const WALLET_ENCRYPTION_PASSWORD = `${NEW_WALLET}/wallet-encryption-password`
export const WALLET_IMPORT_MNEMONICS = `${NEW_WALLET}/wallet-import-mnemonics`
export const WALLET_IMPORT_XPRV = `${NEW_WALLET}/wallet-import-xprv`

// LoginForm URLs
export const LOGIN = `${FORMS}/login`
export const WALLET_SELECTION = `${LOGIN}`
export const WALLET_PASSWORD_PROMPT = `${LOGIN}/password`

// Main URLs
export const MAIN = "/main"
export const COMMUNITY_SECTION = `${MAIN}/community`
export const DATA_REQUESTS_SECTION = `${MAIN}/data-requests`
export const MARKETPLACE_SECTION = `${MAIN}/marketplace`
export const SMART_CONTRACTS_SECTION = `${MAIN}/smartcontracts`
export const WALLET_SECTION = `${MAIN}/wallet`

// Main-WalletSection URLs
export const TRANSACTIONS_TAB = `${WALLET_SECTION}/transactions`
export const SEND_TAB = `${WALLET_SECTION}/send`
export const RECEIVE_TAB = `${WALLET_SECTION}/receive`

// Main-SmartContractsSection URLs
export const SMART_CONTRACTS_HISTORY_TAB = `${SMART_CONTRACTS_SECTION}/history`
export const SMART_CONTRACTS_EDITOR_TAB = `${SMART_CONTRACTS_SECTION}/editor`

// Main-DataRequestsSection URLs
export const DATA_REQUESTS_HISTORY_TAB = `${DATA_REQUESTS_SECTION}/history`
export const DATA_REQUESTS_EDITOR_TAB = `${DATA_REQUESTS_SECTION}/editor`
