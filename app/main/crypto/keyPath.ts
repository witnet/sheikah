import { HARDENED_KEY_INDEX } from "./constants"
import { Errors } from "./errors"

export type KeyPath = Array<number>

/**
 * Path levels
 * https://github.com/aesedepece/WIPs/blob/wip-adansdpc-hdwallets/wip-adansdpc-hdwallets.md#path-levels
 * 5 levels are defined in key tree paths:
 *     m / purpose' / coin_type' / account' / change / address_index
 *
 * Apostrophe in the path indicates that hardened derivation is used
 */

/** Path derivation */
export const derive = (path: KeyPath, number: number): KeyPath => {
  return [...path, number]
}

/**
 * KeyPath from string
 * @param {string} path a string containing a list of integers separated by a '/'. May start with
 * "/" or "m/". A single quote appended at the end means use the hardened version of the key index
 * (e.g. m/44'/0'/0'/0)
 * @returns {KeyPath}
 */
export const fromString = (path: string): KeyPath => {
  const toNumber = (value: string): number => {
    const number = value.slice(-1) === "'"
      ? hardened(parseInt(value.slice(0, -1))) : parseInt(value)
    if (isNaN(number)) {
      throw Error(Errors.INVALID_PATH_NUMBER)
    }

    return number
  }
  // const path1 = _.trimStart(_.trimStart(path, "m"), "/")
  const path1 = path.replace(/^m*\/*/, "")

  return path1.length === 0 ? [] : path1.split("/").map(toNumber)
}

/** Key path to string */
export const toString = (path: KeyPath) => {
  // return _.map(path, childNumberToString).reduce((a, b) => `${a}/${b}`, "m")
  const stringPath = path.map(childNumberToString).join("/")

  return `m/${stringPath}`
}

/**
 * String representation of child number
 * @param {number} childNumber
 * @returns {string}
 */
export const childNumberToString = (childNumber: number) => {
  return isHardened(childNumber)
    ? `${childNumber - HARDENED_KEY_INDEX}'` : `${childNumber}`
}

export const lastChildNumber = (path: KeyPath): number => {
  return path[path.length - 1] || 0
}

/**
 * Hardened
 * @param {number} index
 * @returns {number}
 */
export const hardened = (index: number) => {
  return HARDENED_KEY_INDEX + index
}

/** check if index belongs to hardened key path */
export const isHardened = (index: number) => {
  return index >= HARDENED_KEY_INDEX
}
