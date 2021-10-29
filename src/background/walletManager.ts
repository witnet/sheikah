import { LATEST_RELEASES_URL, SHEIKAH_PATH, VERSION_FILE_NAME, WITNET_FILE_NAME, WITNET_RUST_VERSION, WITNET_CONFIG_FILE_NAME, FILE_NAME, STATUS, URL_PUBLIC_WITNET_NODE, DEFAULT_WALLET_LOG_LEVEL, arch, platform, osArch } from "./constants"
import { AppManager } from "./appManager"
import semver from 'semver'
import path from 'path'
import fs from 'fs-extra'
import axios from 'axios'
import getVersionFromName from "./utils/getVersionFromName"
import overwriteWalletConfigFile from "./utils/overwriteWalletConfigFile"
import sleep from "./utils/sleep"
import cp from 'child_process'
import progress from 'progress-stream'
import tar from 'tar'
import util from 'util'
import stream from 'stream'

export class WalletManager {
  public app
  public isBeingUpdated
  public walletProcess

  constructor(appManager: AppManager) {
    this.app = appManager
    this.isBeingUpdated = false
    this.walletProcess = null
  }

  public run() {
    console.info(`Fetching release from: https://api.github.com/repos/witnet/witnet-rust/releases/tags/${WITNET_RUST_VERSION}`)
    const releaseUrl = `https://api.github.com/repos/witnet/witnet-rust/releases/tags/${WITNET_RUST_VERSION}`
  
    axios.get(releaseUrl).then(async result => {
      // Check if release supports os
      const release = result.data.assets.find(
        asset =>
          asset.browser_download_url.includes(
            arch === 'ia32' ? 'x86_64' : arch,
          ) &&
          asset.browser_download_url.includes(
            platform === 'win32' ? 'windows' : platform,
          ),
      )
      if (release) {
        const existWitnetFile = fs.existsSync(
          path.join(SHEIKAH_PATH, WITNET_FILE_NAME),
        )
        const existConfigFile = fs.existsSync(
          path.join(SHEIKAH_PATH, WITNET_CONFIG_FILE_NAME),
        )
        const existVersionFile = fs.existsSync(
          path.join(SHEIKAH_PATH, VERSION_FILE_NAME),
        )
        const existDirectory = fs.existsSync(SHEIKAH_PATH)
        const firstTimeUsage = !existDirectory && !existVersionFile && !existConfigFile && !existWitnetFile

        if (existDirectory) console.info("Witnet's wallet directory")
        if (existWitnetFile) console.info("Witnet's wallet file found")
        if (existConfigFile) console.info("Witnet's config file found")
        if (existVersionFile) console.info("Witnet's version file found")

        // first time usage, create sheikah directory for wallet
        if (firstTimeUsage) {
          console.info(
            "Sheikah's directory not found. Create a new one in: ",
            SHEIKAH_PATH,
          )
          fs.mkdirSync(SHEIKAH_PATH)
        }

        const releaseToDownload = this.getReleaseToDownload(release, existVersionFile)
        console.log('release to download----??', releaseToDownload)
        if (releaseToDownload) {
          this.app.sendDownloadingMessage()
          console.log('DOWNLOADING...')
          await sleep(2500)
          await this.downloadWalletRelease(releaseToDownload)
        } else {
          console.log('MAINTAIN SAME VERSION')
          this.app.sendDownloadedMessage()
          await sleep(3000)
        }
        if (!this.isBeingUpdated) {
          this.runWallet()
        }
      } else {
        this.app.setStatus(STATUS.OS_NOT_SUPPORTED)
        console.info('Your OS is not supported yet')
      }
    })
  }

  private getReleaseToDownload(release, existVersionFile) {
    const releaseUrl = release.browser_download_url

    if (existVersionFile) {
      try {
        const versionFile = fs.readFileSync(
          path.join(SHEIKAH_PATH, VERSION_FILE_NAME),
          'utf8',
        )
        const isCompatible = semver.satisfies(
          WITNET_RUST_VERSION,
          `~${getVersionFromName(versionFile)}`,
        )
        const isLatestVersion = versionFile === WITNET_RUST_VERSION
        console.log(getVersionFromName(versionFile), WITNET_RUST_VERSION, 'compatible!', isCompatible)
        console.log('release url', releaseUrl)
        return isCompatible && !isLatestVersion ? releaseUrl : null

      } catch (err) {
        return console.error(
          'An error occured trying to read version file',
          err,
        )
      }
    } else {
      return releaseUrl
    }
  }

  public updateStatus(status) {
    this.isBeingUpdated = status
  }

  private async decompressFileWin32(file) {
    tar.x({ file, sync: true })
      fs.copyFileSync(
        WITNET_FILE_NAME,
        path.join(SHEIKAH_PATH, WITNET_FILE_NAME),
      )
      fs.copyFileSync(
        'witnet.toml',
        path.join(SHEIKAH_PATH, WITNET_CONFIG_FILE_NAME),
      )
      await sleep(3000)

      overwriteWalletConfigFile({ sheikahPath: SHEIKAH_PATH, witnetConfigFileName: WITNET_CONFIG_FILE_NAME, publicNodeUrl: URL_PUBLIC_WITNET_NODE })

      fs.writeFileSync(path.join(SHEIKAH_PATH, VERSION_FILE_NAME), WITNET_RUST_VERSION)
  }

  private async decompressFileDarwin(file) {
    try {
      const currentCwd = process.cwd()
      process.chdir(SHEIKAH_PATH)
      cp.execSync(`tar -xvf ${file}`)
      process.chdir(currentCwd)

      await sleep(3000)
      overwriteWalletConfigFile({ sheikahPath: SHEIKAH_PATH, witnetConfigFileName: WITNET_CONFIG_FILE_NAME, publicNodeUrl: URL_PUBLIC_WITNET_NODE })

      fs.writeFileSync(
        path.join(SHEIKAH_PATH, VERSION_FILE_NAME),
        WITNET_RUST_VERSION,
      )
    } catch (err) {
      console.error(err)
    }
  }

  private async decompressRelease(file) {
    // Decompress tar.gz file
    if (platform === 'win32') {
      await this.decompressFileWin32(file)
    } else if (platform === 'darwin') {
      await this.decompressFileDarwin(file)
    } else {
      tar.x({ file, sync: true })
      fs.copyFileSync('witnet', path.join(SHEIKAH_PATH, WITNET_FILE_NAME))
      fs.copyFileSync(
        'witnet.toml',
        path.join(SHEIKAH_PATH, WITNET_CONFIG_FILE_NAME),
      )

      await sleep(3000)
      overwriteWalletConfigFile({ sheikahPath: SHEIKAH_PATH, witnetConfigFileName: WITNET_CONFIG_FILE_NAME, publicNodeUrl: URL_PUBLIC_WITNET_NODE })

      cp.execSync(`chmod 777 ${path.join(SHEIKAH_PATH, WITNET_FILE_NAME)}`)
      fs.writeFileSync(path.join(SHEIKAH_PATH, VERSION_FILE_NAME), WITNET_RUST_VERSION)
    }
  }

  private async handleResponse(response) {
    const file = path.join(SHEIKAH_PATH, FILE_NAME[platform])
    const str = progress({
      length: response.headers['content-length'],
      time: 100 /* ms */,
    })
    str.on('progress', (function(progress) {
      this.app.sendProgressMessage(progress)
    }).bind(this))
    const pipeline = util.promisify(stream.pipeline)
    // Promise equivalent for response.data.pipe(writeStream)
    await pipeline(response.data, str, fs.createWriteStream(file))
    console.info('witnet release downloaded succesfully')

    const existWitnetFile = fs.existsSync(
      path.join(SHEIKAH_PATH, WITNET_FILE_NAME),
    )
    // delete witnet file before decompress
    if (existWitnetFile) {
      fs.unlinkSync(path.join(SHEIKAH_PATH, WITNET_FILE_NAME))
    }

    console.info('Decompressing release...')
    await this.decompressRelease(file)
    // remove compressed file
    fs.unlinkSync(file)
  }

  public async downloadWalletRelease(releaseUrl) {
    this.app.setStatus(STATUS.WAIT)
    return new Promise<void>((resolve, reject) => {
      axios
        .get(releaseUrl, { responseType: 'stream' })
        .then(async response => {
          // TODO: delete version argument
          this.handleResponse(response)
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
        argv0: osArch === 'arm64' ? 'arch -x86_64' : null,
        env: {
          RUST_LOG: `witnet=${DEFAULT_WALLET_LOG_LEVEL}`,
          ...process.env,
        },
      },
    )
    this.walletProcess.stdout.on('data', async (data) => {
      console.info('stdout: ' + data.toString())
      this.app.sendloadedMessage()
      await sleep(3000)
      this.app.setStatus(STATUS.READY)
    })

    this.walletProcess.stderr.on('data', function(data) {
      console.info('stderr: ' + data.toString())
    })

    this.app.setWalletPid(this.walletProcess.pid)
  }
}