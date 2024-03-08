import path from 'path'
import cp from 'child_process'
import util from 'util'
import stream from 'stream'
import semver from 'semver'
import fs from 'fs-extra'
import axios, { AxiosResponse } from 'axios'
import progress from 'progress-stream'
import tar from 'tar'
import {
  SHEIKAH_PATH,
  VERSION_FILE_NAME,
  WITNET_FILE_NAME,
  WITNET_RUST_VERSION,
  WITNET_CONFIG_FILE_NAME,
  WALLET_COMPRESS_FILE_NAME,
  URLS_PUBLIC_WITNET_NODES,
  DEFAULT_WALLET_LOG_LEVEL,
  ARCH,
  PLATFORM,
  OS_ARCH,
  RELEASE_BASE_URL,
} from './constants'
import { IPC_ACTIONS } from './ipc/ipcActions'

const {
  SET_RUNNING_STATUS,
  SET_DOWNLOADED_STATUS,
  SET_DOWNLOADING_STATUS,
  SET_LOADED_STATUS,
  SET_DOWNLOAD_PROGRESS,
  SET_OS_NOT_SUPPORTED,
} = IPC_ACTIONS.Window

import { Actions } from './main/index'

// Parse version name to get the version number witnet-1.2.1 => 1.2.1
export function getVersionFromName(name: string): string | null {
  return semver.valid(semver.coerce(name))
}

// Replace witnet nodes urls in witnet configuration file
export function overwriteWitnetNodeConfiguration({
  sheikahPath,
  witnetConfigFileName,
  publicNodeUrls,
}: {
  sheikahPath: string
  witnetConfigFileName: string
  publicNodeUrls: Array<string>
}) {
  const replacement = `node_url = ${JSON.stringify(publicNodeUrls)}\n`
    .replace("'", '')
    .trim()
  const nodeUrlUntilCharacter = (character: string) =>
    new RegExp('node_url =([^;]*)' + character)
  try {
    fs.writeFileSync(
      path.join(sheikahPath, witnetConfigFileName),
      fs
        .readFileSync(path.join(sheikahPath, witnetConfigFileName))
        .toString()
        .replace(nodeUrlUntilCharacter('"'), replacement)
        .replace(nodeUrlUntilCharacter(']'), replacement),
    )
  } catch (error) {
    console.log('Error overwriting configuration file', error)
  }
}

export default async function sleep(t: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}

interface GithubReleaseAsset {
  // eslint-disable-next-line camelcase
  browser_download_url: string
}

interface GithubTagInfo {
  assets: Array<GithubReleaseAsset>
}

export class WalletManager {
  public webContents: Electron.WebContents | null
  public isUpdating: boolean = false
  public walletProcess: cp.ChildProcessWithoutNullStreams | null = null
  private existDirectory: boolean
  private needToDownloadWallet: boolean = true
  private latestWitnetRustVersion: string = WITNET_RUST_VERSION
  private witnetRustVersion: string = WITNET_RUST_VERSION
  private decompressWallet = {
    win32: this.decompressWin32Wallet,
    darwin: this.decompressDarwinWallet,
    linux: this.decompressLinuxWallet,
  }[PLATFORM]

  constructor(webContents: Electron.WebContents | null) {
    this.webContents = webContents
    this.existDirectory = fs.existsSync(SHEIKAH_PATH)
  }

  //  Start running the wallet release and download it when is necessary
  public async run(actions: Actions) {
    if (this.existDirectory) {
      // Check if latest version is compatible or needs to be downloaded
      try {
        const versionName = fs.readFileSync(
          path.join(SHEIKAH_PATH, VERSION_FILE_NAME),
          'utf8',
        )
        const installedVersion = getVersionFromName(versionName)
        this.latestWitnetRustVersion = await getLatestWitnetRustRelease()
        const isLatestVersionInstalled =
          installedVersion === this.latestWitnetRustVersion
        const isCompatibleRelease = semver.satisfies(
          this.latestWitnetRustVersion,
          `~${WITNET_RUST_VERSION}`,
        )
        this.needToDownloadWallet =
          isCompatibleRelease && !isLatestVersionInstalled
        if (isLatestVersionInstalled) {
          console.info(
            `Latest wallet version ${this.latestWitnetRustVersion} already installed`,
          )
        } else if (!this.needToDownloadWallet) {
          console.info(
            `Latest wallet version ${this.latestWitnetRustVersion} is not compatible with this version of sheikah, so it will not be installed`,
          )
        }
      } catch (err) {
        console.error('An error occured trying to read version file', err)
      }
    }
    this.witnetRustVersion = this.needToDownloadWallet
      ? this.latestWitnetRustVersion
      : WITNET_RUST_VERSION

    const downloadUrl: string | undefined = await fetchReleaseDownloadUrl(
      `${RELEASE_BASE_URL}${this.witnetRustVersion}`,
      ARCH,
      PLATFORM,
    )

    if (downloadUrl) {
      if (!this.existDirectory) {
        // Create sheikah directory for wallet
        console.info(
          "Sheikah's directory not found. Creating a new one in: ",
          SHEIKAH_PATH,
        )
        fs.mkdirSync(SHEIKAH_PATH)
      }

      if (this.needToDownloadWallet) {
        await this.downloadWallet(actions, downloadUrl)
      } else {
        this.webContents.send(SET_DOWNLOADED_STATUS)
        await sleep(3000)
      }

      if (!this.isUpdating) {
        this.runWallet(actions)
      }
    } else {
      this.webContents.send(SET_OS_NOT_SUPPORTED)
      console.info('Your OS is not supported yet')
    }
  }

  // Setter for isUpdating attribute
  public setIsUpdating(status: boolean) {
    this.isUpdating = status
  }

  // Download a wallet release from the url specified
  public async downloadWallet(actions: Actions, releaseUrl: string) {
    console.info(
      `Fetching release from: ${RELEASE_BASE_URL}${this.witnetRustVersion}`,
    )
    this.webContents.send(SET_DOWNLOADING_STATUS)
    try {
      const response: AxiosResponse = await axios.get(releaseUrl, {
        responseType: 'stream',
      })
      await sleep(2500)
      await this.handleDownloadWalletResponse(response)
    } catch (err) {
      console.error(
        'An error happened while trying to download the wallet',
        err,
      )
    }
  }

  // Decompress downloaded wallet release on macOS
  private async decompressDarwinWallet(file: string) {
    try {
      const currentCwd = process.cwd()
      process.chdir(SHEIKAH_PATH)
      cp.execSync(`tar -xvf ${file}`)
      process.chdir(currentCwd)

      await sleep(3000)
      overwriteWitnetNodeConfiguration({
        sheikahPath: SHEIKAH_PATH,
        witnetConfigFileName: WITNET_CONFIG_FILE_NAME,
        publicNodeUrls: URLS_PUBLIC_WITNET_NODES,
      })

      fs.writeFileSync(
        path.join(SHEIKAH_PATH, VERSION_FILE_NAME),
        this.witnetRustVersion,
      )
    } catch (err) {
      console.error(err)
    }
  }

  // Decompress downloaded wallet release on windows
  private async decompressWin32Wallet(file: string) {
    tar.x({ file, sync: true })
    fs.copyFileSync(WITNET_FILE_NAME, path.join(SHEIKAH_PATH, WITNET_FILE_NAME))
    fs.copyFileSync(
      'witnet.toml',
      path.join(SHEIKAH_PATH, WITNET_CONFIG_FILE_NAME),
    )
    await sleep(3000)

    overwriteWitnetNodeConfiguration({
      sheikahPath: SHEIKAH_PATH,
      witnetConfigFileName: WITNET_CONFIG_FILE_NAME,
      publicNodeUrls: URLS_PUBLIC_WITNET_NODES,
    })

    fs.writeFileSync(
      path.join(SHEIKAH_PATH, VERSION_FILE_NAME),
      this.witnetRustVersion,
    )
  }

  // Decompress downloaded wallet release on linux
  private async decompressLinuxWallet(file: string) {
    tar.x({ file, sync: true })
    fs.copyFileSync('witnet', path.join(SHEIKAH_PATH, WITNET_FILE_NAME))
    fs.copyFileSync(
      'witnet.toml',
      path.join(SHEIKAH_PATH, WITNET_CONFIG_FILE_NAME),
    )

    await sleep(3000)
    overwriteWitnetNodeConfiguration({
      sheikahPath: SHEIKAH_PATH,
      witnetConfigFileName: WITNET_CONFIG_FILE_NAME,
      publicNodeUrls: URLS_PUBLIC_WITNET_NODES,
    })

    cp.execSync(`chmod 777 ${path.join(SHEIKAH_PATH, WITNET_FILE_NAME)}`)
    fs.writeFileSync(
      path.join(SHEIKAH_PATH, VERSION_FILE_NAME),
      this.witnetRustVersion,
    )
  }

  private async handleDownloadWalletResponse(response: AxiosResponse) {
    const walletCompressPath = path.join(
      SHEIKAH_PATH,
      WALLET_COMPRESS_FILE_NAME,
    )
    const str = progress({
      length: response.headers['content-length'],
      time: 100 /* ms */,
    })
    str.on('progress', (progress: number) => {
      this.webContents.send(SET_DOWNLOAD_PROGRESS, progress)
    })
    const pipeline = util.promisify(stream.pipeline)
    // Promise equivalent for response.data.pipe(writeStream)
    await pipeline(response.data, str, fs.createWriteStream(walletCompressPath))
    console.info('witnet release downloaded succesfully')

    const existWitnetFile = fs.existsSync(
      path.join(SHEIKAH_PATH, WITNET_FILE_NAME),
    )
    // delete witnet file before decompress
    if (existWitnetFile) {
      fs.unlinkSync(path.join(SHEIKAH_PATH, WITNET_FILE_NAME))
    }

    console.info('Decompressing wallet release...')
    await this.decompressWallet(walletCompressPath)
    // remove compressed file
    fs.unlinkSync(walletCompressPath)
  }

  public killWalletProcess() {
    this.walletProcess.kill('SIGKILL')
  }

  // Run Witnet wallet and load "ready" url
  public async runWallet(actions: Actions) {
    await sleep(3000)
    console.info('Running wallet...')
    this.webContents.send(SET_RUNNING_STATUS)
    await sleep(3000)

    const walletConfigurationPath = path.join(SHEIKAH_PATH, 'witnet.toml')

    console.info('... with witnet.toml from ' + walletConfigurationPath)
    if (!this.walletProcess) {
      this.walletProcess = cp.spawn(
        path.join(SHEIKAH_PATH, WITNET_FILE_NAME),
        ['-c', walletConfigurationPath, 'wallet', 'server'],
        {
          argv0: OS_ARCH === 'arm64' ? 'arch -x86_64' : undefined,
          env: {
            RUST_LOG: `witnet=${DEFAULT_WALLET_LOG_LEVEL}`,
            ...process.env,
          },
        },
      )
    }
    this.walletProcess?.stdout.on('data', async data => {
      console.info('stdout: ' + data.toString())
      this.webContents.send(SET_LOADED_STATUS, [{ isDefaultWallet: true }])
      await sleep(3000)
    })

    this.walletProcess?.stderr.on('data', function (data) {
      console.info('stderr: ' + data.toString())
    })

    this.walletProcess.on('exit', () => {
      actions.quitApp()
    })
  }
}

async function getLatestWitnetRustRelease(): Promise<string> {
  try {
    const result: AxiosResponse<any> = await axios.get(
      'https://api.github.com/repos/witnet/witnet-rust/releases/latest',
    )
    return (await result.data.tag_name) || ''
  } catch (err) {
    console.log(
      'There was an error getting the latest Witnet Rust Release name:',
      err,
    )
    return ''
  }
}

// Fetch the release information for the given system architecture and platform
async function fetchReleaseDownloadUrl(
  releaseUrl: string,
  arch: string,
  platform: string,
) {
  const result: AxiosResponse<GithubTagInfo> = await axios.get(releaseUrl)

  const release = result.data.assets.find(
    asset =>
      asset.browser_download_url.includes(arch === 'ia32' ? 'x86_64' : arch) &&
      asset.browser_download_url.includes(
        platform === 'win32' ? 'windows' : platform,
      ),
  )

  return release?.browser_download_url
}
