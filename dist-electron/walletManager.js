var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  WalletManager: () => WalletManager,
  default: () => sleep,
  getVersionFromName: () => getVersionFromName,
  overwriteWitnetNodeConfiguration: () => overwriteWitnetNodeConfiguration
});
module.exports = __toCommonJS(stdin_exports);
var import_path = __toESM(require("path"));
var import_child_process = __toESM(require("child_process"));
var import_util = __toESM(require("util"));
var import_stream = __toESM(require("stream"));
var import_semver = __toESM(require("semver"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_axios = __toESM(require("axios"));
var import_progress_stream = __toESM(require("progress-stream"));
var import_tar = __toESM(require("tar"));
var import_constants = require("./constants");
function getVersionFromName(name) {
  return import_semver.default.valid(import_semver.default.coerce(name));
}
function overwriteWitnetNodeConfiguration({
  sheikahPath,
  witnetConfigFileName,
  publicNodeUrls
}) {
  const replacement = `node_url = ${JSON.stringify(publicNodeUrls)}
`.replace("'", "").trim();
  const nodeUrlUntilCharacter = (character) => new RegExp("node_url =([^;]*)" + character);
  try {
    import_fs_extra.default.writeFileSync(
      import_path.default.join(sheikahPath, witnetConfigFileName),
      import_fs_extra.default.readFileSync(import_path.default.join(sheikahPath, witnetConfigFileName)).toString().replace(nodeUrlUntilCharacter('"'), replacement).replace(nodeUrlUntilCharacter("]"), replacement)
    );
  } catch (error) {
    console.log("Error overwriting configuration file", error);
  }
}
async function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
}
class WalletManager {
  constructor() {
    this.isUpdating = false;
    this.walletProcess = null;
    this.needToDownloadWallet = true;
    this.latestWitnetRustVersion = import_constants.WITNET_RUST_VERSION;
    this.witnetRustVersion = import_constants.WITNET_RUST_VERSION;
    this.decompressWallet = {
      win32: this.decompressWin32Wallet,
      darwin: this.decompressDarwinWallet,
      linux: this.decompressLinuxWallet
    }[import_constants.PLATFORM];
    this.existDirectory = import_fs_extra.default.existsSync(import_constants.SHEIKAH_PATH);
  }
  async run() {
    if (this.existDirectory) {
      try {
        const versionName = import_fs_extra.default.readFileSync(
          import_path.default.join(import_constants.SHEIKAH_PATH, import_constants.VERSION_FILE_NAME),
          "utf8"
        );
        const installedVersion = getVersionFromName(versionName);
        this.latestWitnetRustVersion = await getLatestWitnetRustRelease();
        const isLatestVersionInstalled = installedVersion === this.latestWitnetRustVersion;
        const isCompatibleRelease = import_semver.default.satisfies(
          this.latestWitnetRustVersion,
          `~${import_constants.WITNET_RUST_VERSION}`
        );
        this.needToDownloadWallet = isCompatibleRelease && !isLatestVersionInstalled;
        if (isLatestVersionInstalled) {
          console.info(
            `Latest wallet version ${this.latestWitnetRustVersion} already installed`
          );
        } else if (!this.needToDownloadWallet) {
          console.info(
            `Latest wallet version ${this.latestWitnetRustVersion} is not compatible with this version of sheikah, so it will not be installed`
          );
        }
      } catch (err) {
        console.error("An error occured trying to read version file", err);
      }
    }
    this.witnetRustVersion = this.needToDownloadWallet ? this.latestWitnetRustVersion : import_constants.WITNET_RUST_VERSION;
    const downloadUrl = await fetchReleaseDownloadUrl(
      `${import_constants.RELEASE_BASE_URL}${this.witnetRustVersion}`,
      import_constants.ARCH,
      import_constants.PLATFORM
    );
    if (downloadUrl) {
      if (!this.existDirectory) {
        console.info(
          "Sheikah's directory not found. Creating a new one in: ",
          import_constants.SHEIKAH_PATH
        );
        import_fs_extra.default.mkdirSync(import_constants.SHEIKAH_PATH);
      }
      if (this.needToDownloadWallet) {
        await this.downloadWallet(downloadUrl);
      } else {
        await sleep(3e3);
      }
      if (!this.isUpdating) {
        this.runWallet();
      }
    } else {
      console.info("Your OS is not supported yet");
    }
  }
  setIsUpdating(status) {
    this.isUpdating = status;
  }
  async downloadWallet(releaseUrl) {
    console.info(
      `Fetching release from: ${import_constants.RELEASE_BASE_URL}${this.witnetRustVersion}`
    );
    await sleep(2500);
    return new Promise((resolve) => {
      import_axios.default.get(releaseUrl, { responseType: "stream" }).then(async (response) => {
        this.handleDownloadWalletResponse(response);
        resolve();
      }).catch((err) => {
        console.error(
          "An error happened while trying to download the wallet",
          err
        );
      });
    });
  }
  async decompressDarwinWallet(file) {
    try {
      const currentCwd = process.cwd();
      process.chdir(import_constants.SHEIKAH_PATH);
      import_child_process.default.execSync(`tar -xvf ${file}`);
      process.chdir(currentCwd);
      await sleep(3e3);
      overwriteWitnetNodeConfiguration({
        sheikahPath: import_constants.SHEIKAH_PATH,
        witnetConfigFileName: import_constants.WITNET_CONFIG_FILE_NAME,
        publicNodeUrls: import_constants.URLS_PUBLIC_WITNET_NODES
      });
      import_fs_extra.default.writeFileSync(
        import_path.default.join(import_constants.SHEIKAH_PATH, import_constants.VERSION_FILE_NAME),
        this.witnetRustVersion
      );
    } catch (err) {
      console.error(err);
    }
  }
  async decompressWin32Wallet(file) {
    import_tar.default.x({ file, sync: true });
    import_fs_extra.default.copyFileSync(import_constants.WITNET_FILE_NAME, import_path.default.join(import_constants.SHEIKAH_PATH, import_constants.WITNET_FILE_NAME));
    import_fs_extra.default.copyFileSync(
      "witnet.toml",
      import_path.default.join(import_constants.SHEIKAH_PATH, import_constants.WITNET_CONFIG_FILE_NAME)
    );
    await sleep(3e3);
    overwriteWitnetNodeConfiguration({
      sheikahPath: import_constants.SHEIKAH_PATH,
      witnetConfigFileName: import_constants.WITNET_CONFIG_FILE_NAME,
      publicNodeUrls: import_constants.URLS_PUBLIC_WITNET_NODES
    });
    import_fs_extra.default.writeFileSync(
      import_path.default.join(import_constants.SHEIKAH_PATH, import_constants.VERSION_FILE_NAME),
      this.witnetRustVersion
    );
  }
  async decompressLinuxWallet(file) {
    import_tar.default.x({ file, sync: true });
    import_fs_extra.default.copyFileSync("witnet", import_path.default.join(import_constants.SHEIKAH_PATH, import_constants.WITNET_FILE_NAME));
    import_fs_extra.default.copyFileSync(
      "witnet.toml",
      import_path.default.join(import_constants.SHEIKAH_PATH, import_constants.WITNET_CONFIG_FILE_NAME)
    );
    await sleep(3e3);
    overwriteWitnetNodeConfiguration({
      sheikahPath: import_constants.SHEIKAH_PATH,
      witnetConfigFileName: import_constants.WITNET_CONFIG_FILE_NAME,
      publicNodeUrls: import_constants.URLS_PUBLIC_WITNET_NODES
    });
    import_child_process.default.execSync(`chmod 777 ${import_path.default.join(import_constants.SHEIKAH_PATH, import_constants.WITNET_FILE_NAME)}`);
    import_fs_extra.default.writeFileSync(
      import_path.default.join(import_constants.SHEIKAH_PATH, import_constants.VERSION_FILE_NAME),
      this.witnetRustVersion
    );
  }
  async handleDownloadWalletResponse(response) {
    const walletCompressPath = import_path.default.join(
      import_constants.SHEIKAH_PATH,
      import_constants.WALLET_COMPRESS_FILE_NAME
    );
    const str = (0, import_progress_stream.default)({
      length: response.headers["content-length"],
      time: 100
    });
    str.on("progress", (progress2) => {
    });
    const pipeline = import_util.default.promisify(import_stream.default.pipeline);
    await pipeline(response.data, str, import_fs_extra.default.createWriteStream(walletCompressPath));
    console.info("witnet release downloaded succesfully");
    console.log("walletcompresspath", walletCompressPath);
    const existWitnetFile = import_fs_extra.default.existsSync(
      import_path.default.join(import_constants.SHEIKAH_PATH, import_constants.WITNET_FILE_NAME)
    );
    if (existWitnetFile) {
      import_fs_extra.default.unlinkSync(import_path.default.join(import_constants.SHEIKAH_PATH, import_constants.WITNET_FILE_NAME));
    }
    console.info("Decompressing wallet release...");
    this.decompressWallet(walletCompressPath);
    import_fs_extra.default.unlinkSync(walletCompressPath);
  }
  async runWallet() {
    var _a, _b;
    await sleep(3e3);
    console.info("Running wallet...");
    await sleep(3e3);
    const walletConfigurationPath = import_path.default.join(import_constants.SHEIKAH_PATH, "witnet.toml");
    console.info("... with witnet.toml from " + walletConfigurationPath);
    this.walletProcess = import_child_process.default.spawn(
      import_path.default.join(import_constants.SHEIKAH_PATH, import_constants.WITNET_FILE_NAME),
      ["-c", walletConfigurationPath, "wallet", "server"],
      {
        argv0: import_constants.OS_ARCH === "arm64" ? "arch -x86_64" : void 0,
        env: {
          RUST_LOG: `witnet=${import_constants.DEFAULT_WALLET_LOG_LEVEL}`,
          ...process.env
        }
      }
    );
    (_a = this.walletProcess) == null ? void 0 : _a.stdout.on("data", async (data) => {
      console.info("stdout: " + data.toString());
      await sleep(3e3);
    });
    (_b = this.walletProcess) == null ? void 0 : _b.stderr.on("data", function(data) {
      console.info("stderr: " + data.toString());
    });
  }
}
async function getLatestWitnetRustRelease() {
  try {
    const result = await import_axios.default.get(
      "https://api.github.com/repos/witnet/witnet-rust/releases/latest"
    );
    return await result.data.tag_name || "";
  } catch (err) {
    console.log(
      "There was an error getting the latest Witnet Rust Release name:",
      err
    );
    return "";
  }
}
async function fetchReleaseDownloadUrl(releaseUrl, arch, platform) {
  const result = await import_axios.default.get(releaseUrl);
  const release = result.data.assets.find(
    (asset) => asset.browser_download_url.includes(arch === "ia32" ? "x86_64" : arch) && asset.browser_download_url.includes(
      platform === "win32" ? "windows" : platform
    )
  );
  return release == null ? void 0 : release.browser_download_url;
}
