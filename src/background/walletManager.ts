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
  Status,
  URLS_PUBLIC_WITNET_NODES,
  DEFAULT_WALLET_LOG_LEVEL,
  ARCH,
  PLATFORM,
  OS_ARCH,
  RELEASE_URL,
} from './constants'
import { AppManager } from './appManager'
import getVersionFromName from './utils/getVersionFromName'
import overwriteWalletConfigFile from './utils/overwriteWalletConfigFile'
import sleep from './utils/sleep'

interface GithubReleaseAsset {
  // eslint-disable-next-line camelcase
  browser_download_url: string
}

interface GithubTagInfo {
  assets: Array<GithubReleaseAsset>
}

const decompressWallet = {
  win32: decompressWin32Wallet,
  darwin: decompressDarwinWallet,
  linux: decompressLinuxWallet,
}[PLATFORM]

export class WalletManager {
  public app: AppManager
  public isUpdating: boolean = false
  public walletProcess: cp.ChildProcessWithoutNullStreams | null = null
  private existDirectory: boolean
  private needToDownloadWallet: boolean = true

  constructor(appManager: AppManager) {
    this.app = appManager

    this.existDirectory = fs.existsSync(SHEIKAH_PATH)

    if (this.existDirectory) {
      try {
        const versionName = fs.readFileSync(
          path.join(SHEIKAH_PATH, VERSION_FILE_NAME),
          'utf8',
        )
        const installedVersion = getVersionFromName(versionName)
        const isLatestVersionInstalled =
          installedVersion === WITNET_RUST_VERSION
        const isCompatibleRelease = semver.satisfies(
          WITNET_RUST_VERSION,
          `~${installedVersion}`,
        )
        this.needToDownloadWallet =
          isCompatibleRelease && !isLatestVersionInstalled
      } catch (err) {
        console.error('An error occured trying to read version file', err)
      }
    }
  }

  //  Start running the wallet release and download it when is necessary
  public async run() {
    console.info(`Fetching release from: ${RELEASE_URL}`)

    const downloadUrl: string | undefined = await fetchReleaseDownloadUrl(
      RELEASE_URL,
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
        await this.downloadWallet(downloadUrl)
      } else {
        this.app.sendDownloadedMessage()
        await sleep(3000)
      }

      if (!this.isUpdating) {
        this.runWallet()
      }
    } else {
      this.app.setStatus(Status.OsNotSupported)
      console.info('Your OS is not supported yet')
    }
  }

  // Setter for isUpdating attribute
  public setIsUpdating(status: boolean) {
    this.isUpdating = status
  }

  // Download a wallet release from the url specified
  public async downloadWallet(releaseUrl: string) {
    this.app.sendDownloadingMessage()
    await sleep(2500)
    this.app.setStatus(Status.Wait)
    // FIXME: Remove promise and use async / await
    return new Promise<void>(resolve => {
      axios
        .get(releaseUrl, { responseType: 'stream' })
        .then(async response => {
          this.handleDownloadWalletResponse(response)
          resolve()
        })
        .catch(err => {
          console.error(
            'An error happened while trying to download the wallet',
            err,
          )
        })
    })
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
      this.app.sendProgressMessage(progress)
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
    decompressWallet(walletCompressPath)
    // remove compressed file
    fs.unlinkSync(walletCompressPath)
  }

  // Run Witnet wallet and load "ready" url
  public async runWallet() {
    await sleep(3000)
    console.info('Running wallet...')
    this.app.sendRunningMessage()
    await sleep(3000)

    const walletConfigurationPath = path.join(SHEIKAH_PATH, 'witnet.toml')

    console.info('... with witnet.toml from ' + walletConfigurationPath)
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
    this.walletProcess?.stdout.on('data', async data => {
      console.info('stdout: ' + data.toString())
      this.app.sendLoadedMessage()
      await sleep(3000)
      this.app.setStatus(Status.Ready)
    })

    this.walletProcess?.stderr.on('data', function (data) {
      console.info('stderr: ' + data.toString())
    })

    if (this.walletProcess.pid) {
      this.app.setWalletPid(this.walletProcess.pid)
    }
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

// Decompress downloaded wallet release on macOS
async function decompressDarwinWallet(file: string) {
  try {
    const currentCwd = process.cwd()
    process.chdir(SHEIKAH_PATH)
    cp.execSync(`tar -xvf ${file}`)
    process.chdir(currentCwd)

    await sleep(3000)
    overwriteWalletConfigFile({
      sheikahPath: SHEIKAH_PATH,
      witnetConfigFileName: WITNET_CONFIG_FILE_NAME,
      publicNodeUrls: URLS_PUBLIC_WITNET_NODES,
    })

    fs.writeFileSync(
      path.join(SHEIKAH_PATH, VERSION_FILE_NAME),
      WITNET_RUST_VERSION,
    )
  } catch (err) {
    console.error(err)
  }
}

// Decompress downloaded wallet release on windows
async function decompressWin32Wallet(file: string) {
  tar.x({ file, sync: true })
  fs.copyFileSync(WITNET_FILE_NAME, path.join(SHEIKAH_PATH, WITNET_FILE_NAME))
  fs.copyFileSync(
    'witnet.toml',
    path.join(SHEIKAH_PATH, WITNET_CONFIG_FILE_NAME),
  )
  await sleep(3000)

  overwriteWalletConfigFile({
    sheikahPath: SHEIKAH_PATH,
    witnetConfigFileName: WITNET_CONFIG_FILE_NAME,
    publicNodeUrls: URLS_PUBLIC_WITNET_NODES,
  })

  fs.writeFileSync(
    path.join(SHEIKAH_PATH, VERSION_FILE_NAME),
    WITNET_RUST_VERSION,
  )
}

// Decompress downloaded wallet release on linux
async function decompressLinuxWallet(file: string) {
  tar.x({ file, sync: true })
  fs.copyFileSync('witnet', path.join(SHEIKAH_PATH, WITNET_FILE_NAME))
  fs.copyFileSync(
    'witnet.toml',
    path.join(SHEIKAH_PATH, WITNET_CONFIG_FILE_NAME),
  )

  await sleep(3000)
  overwriteWalletConfigFile({
    sheikahPath: SHEIKAH_PATH,
    witnetConfigFileName: WITNET_CONFIG_FILE_NAME,
    publicNodeUrls: URLS_PUBLIC_WITNET_NODES,
  })

  cp.execSync(`chmod 777 ${path.join(SHEIKAH_PATH, WITNET_FILE_NAME)}`)
  fs.writeFileSync(
    path.join(SHEIKAH_PATH, VERSION_FILE_NAME),
    WITNET_RUST_VERSION,
  )
}
