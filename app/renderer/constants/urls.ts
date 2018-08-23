// Forms base URL
export const FORMS = "/forms"

// WalletForm URLs
export const NEW_WALLET = `${FORMS}/wallet`
export const WELCOME = `${NEW_WALLET}/welcome`
export const WALLET_SEED_ADVANCED_OPTIONS = `${NEW_WALLET}/advanced-options`
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
export const WALLET_SECTION = `${MAIN}/wallet`
export const SMART_CONTRACTS_SECTION = `${MAIN}/smartcontracts`
export const ATTESTATIONS_SECTION = `${MAIN}/attestations`
export const BLOCK_EXPLORER_SECTION = `${MAIN}/blockexplorer`
export const COMMUNITY_SECTION = `${MAIN}/community`

// Main-WalletSection URLs
export const TRANSACTIONS_TAB = `${WALLET_SECTION}/transactions`
export const COINS_TAB = `${WALLET_SECTION}/coins`
export const SEND_TAB = `${WALLET_SECTION}/send`
export const RECEIVE_TAB = `${WALLET_SECTION}/receive`

// Main-SmartContracts URLs
export const MY_CONTRACTS_TAB = `${SMART_CONTRACTS_SECTION}/mycontracts`
export const EASY_COMPOSER_TAB = `${SMART_CONTRACTS_SECTION}/easycomposer`
export const PROEDITOR_TAB = `${SMART_CONTRACTS_SECTION}/proeditor`
export const MARKETPLACE_TAB = `${SMART_CONTRACTS_SECTION}/marketplace`