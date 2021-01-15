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

  minus(num) {
    return this.bigNumber.minus(num)
  }

  times(num) {
    return this.bigNumber.times(num)
  }

  toFixed() {
    return this.bigNumber.toFixed()
  }

  cmp(num) {
    return this.bigNumber.cmp(num)
  }
}
