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
  ARCH: () => ARCH,
  DEFAULT_WALLET_LOG_LEVEL: () => DEFAULT_WALLET_LOG_LEVEL,
  DEVELOPMENT: () => DEVELOPMENT,
  OS_ARCH: () => OS_ARCH,
  PLATFORM: () => PLATFORM,
  RELEASE_BASE_URL: () => RELEASE_BASE_URL,
  SHEIKAH_PATH: () => SHEIKAH_PATH,
  SHEIKAH_PATH_BY_PLATFORM: () => SHEIKAH_PATH_BY_PLATFORM,
  STATUS_PATH: () => STATUS_PATH,
  Status: () => Status,
  URLS_PUBLIC_WITNET_NODES: () => URLS_PUBLIC_WITNET_NODES,
  VERSION_FILE_NAME: () => VERSION_FILE_NAME,
  WALLET_COMPRESS_FILE_NAME: () => WALLET_COMPRESS_FILE_NAME,
  WITNET_CONFIG_FILE_NAME: () => WITNET_CONFIG_FILE_NAME,
  WITNET_FILE_NAME: () => WITNET_FILE_NAME,
  WITNET_RUST_VERSION: () => WITNET_RUST_VERSION,
  osPlatform: () => osPlatform
});
module.exports = __toCommonJS(stdin_exports);
var import_os = __toESM(require("os"));
var import_path = __toESM(require("path"));
const OS_ARCH = import_os.default.arch();
const osPlatform = import_os.default.platform();
const supportedPlatforms = ["win32", "linux", "darwin"];
if (!supportedPlatforms.includes(osPlatform)) {
  throw new Error(`Platform ${osPlatform} not supported`);
}
const PLATFORM = osPlatform;
const ARCH = ["x64", "arm64"].includes(OS_ARCH) ? "x86_64" : OS_ARCH;
const DEVELOPMENT = process.env.NODE_ENV !== "production";
const URLS_PUBLIC_WITNET_NODES = [
  "20.120.248.2:21338",
  "20.126.70.77:21338",
  "52.166.178.145:21338",
  "20.103.108.57:21338"
];
const SHEIKAH_PATH_BY_PLATFORM = {
  darwin: import_path.default.join(import_os.default.homedir(), "Desktop", ".sheikah"),
  linux: import_path.default.join(import_os.default.homedir(), ".sheikah"),
  win32: import_path.default.join(import_os.default.homedir(), ".sheikah")
}[PLATFORM];
const VERSION_FILE_NAME = ".version";
const SHEIKAH_PATH = process.env.TRAVIS ? "" : SHEIKAH_PATH_BY_PLATFORM;
const WALLET_COMPRESS_FILE_NAME = {
  darwin: `witnet-${ARCH}-apple-${PLATFORM}.tar.gz`,
  linux: `release-${ARCH}-${PLATFORM}.tar.gz`,
  win32: `witnet-x86_64-pc-windows-msvc.tar.gz`
}[PLATFORM];
const WITNET_FILE_NAME = {
  win32: "witnet.exe",
  linux: "witnet",
  darwin: "witnet"
}[PLATFORM];
var Status = /* @__PURE__ */ ((Status2) => {
  Status2["OsNotSupported"] = "OS_NOT_SUPPORTED";
  Status2["Wait"] = "WAIT";
  Status2["Ready"] = "READY";
  return Status2;
})(Status || {});
const STATUS_PATH = {
  ["OS_NOT_SUPPORTED" /* OsNotSupported */]: "wallet-not-found",
  ["WAIT" /* Wait */]: "setup",
  ["READY" /* Ready */]: ""
};
const WITNET_CONFIG_FILE_NAME = "witnet.toml";
const WITNET_RUST_VERSION = "1.5.0";
const DEFAULT_WALLET_LOG_LEVEL = "error";
const RELEASE_BASE_URL = `https://api.github.com/repos/witnet/witnet-rust/releases/tags/`;
