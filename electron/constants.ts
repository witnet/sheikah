import os from 'os'
import path from 'path'

export const OS_ARCH = os.arch()

export const osPlatform = os.platform()

type SupportedPlatform = 'win32' | 'linux' | 'darwin'

const supportedPlatforms = ['win32', 'linux', 'darwin']

if (!supportedPlatforms.includes(osPlatform)) {
  throw new Error(`Platform ${osPlatform} not supported`)
}

export const PLATFORM: SupportedPlatform = osPlatform as SupportedPlatform

export const ARCH = ['x64', 'arm64'].includes(OS_ARCH) ? 'x86_64' : OS_ARCH

export const DEVELOPMENT = process.env.NODE_ENV !== 'production'

export const URLS_PUBLIC_WITNET_NODES = [
  '3.133.4.38:21338',
  '3.21.74.162:21338',
]

export const LEGACY_CONFIGURATION_WITNET_NODE_IPS: Array<string> = [
  '20.120.248.2:21338',
  '20.126.70.77:21338',
  '52.166.178.145:21338',
  '20.103.108.57:21338',
]

export const SHEIKAH_PATH_BY_PLATFORM = {
  darwin: path.join(os.homedir(), 'Desktop', '.sheikah'),
  linux: path.join(os.homedir(), '.sheikah'),
  win32: path.join(os.homedir(), '.sheikah'),
}[PLATFORM]

export const VERSION_FILE_NAME = '.version'

export const SHEIKAH_PATH = process.env.TRAVIS ? '' : SHEIKAH_PATH_BY_PLATFORM

export const WALLET_COMPRESS_FILE_NAME: string = {
  darwin: `witnet-${ARCH}-apple-${PLATFORM}.tar.gz`,
  linux: `release-${ARCH}-${PLATFORM}.tar.gz`,
  win32: `witnet-x86_64-pc-windows-msvc.tar.gz`,
}[PLATFORM]

export const WITNET_FILE_NAME: string = {
  win32: 'witnet.exe',
  linux: 'witnet',
  darwin: 'witnet',
}[PLATFORM]

export enum Status {
  OsNotSupported = 'OS_NOT_SUPPORTED',
  Wait = 'WAIT',
  Ready = 'READY',
}

export const STATUS_PATH = {
  [Status.OsNotSupported]: 'wallet-not-found',
  [Status.Wait]: 'setup',
  [Status.Ready]: '',
}

export const WITNET_CONFIG_FILE_NAME = 'witnet.toml'

export const WITNET_RUST_VERSION = '1.5.6'

export const DEFAULT_WALLET_LOG_LEVEL = 'error'

export const RELEASE_BASE_URL = `https://api.github.com/repos/witnet/witnet-rust/releases/tags/`
