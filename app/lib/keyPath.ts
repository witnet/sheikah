import * as _ from "lodash"
/**
 * Path levels
 * https://github.com/aesedepece/WIPs/blob/wip-adansdpc-hdwallets/wip-adansdpc-hdwallets.md#path-levels
 * 5 levels are defined in key tree paths:
 *     m / purpose' / coin_type' / account' / change / address_index
 *
 * Apostrophe in the path indicates that hardened derivation is used
 */
export class KeyPath {
  /** Hardened key index */
  static readonly hardenedKeyIndex = 0x80000000

  constructor(private path: Array<number> = []) {
  }
  /** Last child number */
  lastChildNumber(): number {
    return _.last(this.path) || 0
  }
  /** Path derivation */
  derive(number: number) {
    return new KeyPath(_.concat(this.path, number))
  }
  /** Key path to string */
  toString() {
    return _.map(this.path, KeyPath.childNumberToString).reduce((a, b) => `${a}/${b}`, "m")
  }

  /**
   * KeyPath from string
   * @param {string} path a string containing a list of integers separated by a '/'.
   *  May start with "/" or "m/". A single quote appended at the end means use the
   *  hardened version of the key index (e.g. m/44'/0'/0'/0)
   * @returns {KeyPath}
   */
  static fromString(path: string): KeyPath {
    const toNumber = (value: string): number => {
      const number = _.endsWith(value, "'") ?
          KeyPath.hardened(_.parseInt(value.slice(0, -1))) : _.parseInt(value)
      if (isNaN(number)) {throw Error("Invalid number")}

      return number
    }
    const path1 = _.trimStart(_.trimStart(path, "m"), "/")

    return path1.length === 0 ? new KeyPath() : new KeyPath(_.map(path1.split("/"), toNumber))
  }

  /**
   * String representation of child number
   * @param {number} childNumber
   * @returns {string}
   */
  static childNumberToString(childNumber: number) {
    return this
      .isHardened(childNumber) ? `${childNumber - KeyPath.hardenedKeyIndex}'` : `${childNumber}`
  }

  /**
   * Hardened
   * @param {number} index
   * @returns {number}
   */
  static hardened(index: number) {
    return KeyPath.hardenedKeyIndex + index
  }
  /** check if index belongs to hardened key path */
  /* tslint:disable-next-line: prefer-function-over-method */
  private static isHardened(index: number) {
    return index >= KeyPath.hardenedKeyIndex
  }
}