export enum Errors {
  INVALID_ENTROPY_LENGTH = "Entropy length must be between 16 and 64 bytes",
  INVALID_KEY_LENGTH = "Requested key length too long",
  INVALID_MNEMONIC = "Invalid mnemonic",
  INVALID_PATH_NUMBER = "Invalid path number",
  PRIVATE_KEY_POINT_OUT_OF_RANGE = "Can't generate child private key",
  PUBLIC_KEY_POINT_OUT_OF_RANGE = "Can't generate child public key",
  UNSUPPORTED_CHAIN_TYPE = "Unsupported chain type"
}
