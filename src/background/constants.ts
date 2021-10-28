import os from 'os'
import path from 'path'

export const osArch = os.arch()
export const platform = os.platform()
export const arch = osArch === 'x64' || osArch === 'arm64' ? 'x86_64' : osArch
export const DEVELOPMENT = process.env.NODE_ENV !== 'production'
export const URL_PUBLIC_WITNET_NODE = '52.166.178.145:21338'
export const SHEIKAH_PATH_BY_PLATFORM = {
  darwin: path.join(os.homedir(), 'Desktop', '.sheikah'),
  linux: path.join(os.homedir(), '.sheikah'),
  win32: path.join(os.homedir(), '.sheikah'),
}
export const VERSION_FILE_NAME = '.version'
export const SHEIKAH_PATH = process.env.TRAVIS
  ? ''
  : SHEIKAH_PATH_BY_PLATFORM[platform]
export const FILE_NAME = {
  darwin: `witnet-${arch}-apple-${platform}.tar.gz`,
  linux: `release-${arch}-${platform}.tar.gz`,
  win32: `witnet-x86_64-pc-windows-msvc.tar.gz`,
}
export const WITNET_FILE_NAME = {
  win32: 'witnet.exe',
  linux: 'witnet',
  darwin: 'witnet',
}[platform]
export const STATUS = {
  OS_NOT_SUPPORTED: 'OS_NOT_SUPPORTED',
  WAIT: 'WAIT',
  READY: 'READY',
}
export const STATUS_PATH = {
  [STATUS.OS_NOT_SUPPORTED]: 'wallet-not-found',
  [STATUS.WAIT]: 'setup',
  [STATUS.READY]: '',
}
export const WITNET_CONFIG_FILE_NAME = 'witnet.toml'
export const LATEST_RELEASES_URL =
  'https://api.github.com/repos/witnet/witnet-rust/releases/latest'
export const WITNET_RUST_VERSION = '1.4.1'
export const DEFAULT_WALLET_LOG_LEVEL = 'error'