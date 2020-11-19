import Big from 'big.js'

export default class BigNumber {
  constructor(num) {
    this.bigNumber = new Big(num)
    return this.bigNumber
  }

  pow(exponent) {
    return this.bigNumber.pow(exponent)
  }

  plus(num) {
    return this.bigNumber.plus(num)
  }

  times(num) {
    return this.bigNumber.times(num)
  }
}
