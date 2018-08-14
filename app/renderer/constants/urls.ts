// Forms base URL
export const FORMS = "/forms"

// WalletForm URLS
export const NEW_WALLET = `${FORMS}/wallet`
export const WELCOME = `${NEW_WALLET}/welcome`
export const WALLET_SEED_TYPE_SELECTION = `${NEW_WALLET}/wallet-seed-type-selection`
export const WALLET_SEED_BACKUP = `${NEW_WALLET}/wallet-seed-backup`
export const WALLET_SEED_CONFIRMATION = `${NEW_WALLET}/wallet-seed-confirmation`
export const WALLET_ENCRYPTION_PASSWORD = `${NEW_WALLET}/wallet-encryption-password`
export const WALLET_IMPORT_MNEMONICS = `${NEW_WALLET}/wallet-import-mnemonics`
export const WALLET_IMPORT_XPRV = `${NEW_WALLET}/wallet-import-xprv`

// LoginForm URLS
export const LOGIN = `${FORMS}/login`
export const WALLET_SELECTION = `${LOGIN}`
export const WALLET_PASSWORD_PROMPT = `${LOGIN}/password`

// Main base URL
export const MAIN = "/main"
