import { WIT_UNIT } from '@/constants'
import { isGrtMaxNumber, standardizeWitUnits } from '@/utils'
import i18n from '@/plugins/i18n'

export default class FormValidation {
  constructor({ unit, balance }) {
    this.unit = unit
    this.balance = balance
  }

  maxNumber = (rule, value, callback) => {
    if (isGrtMaxNumber(value, this.unit)) {
      callback(new Error(i18n.t('validate_max_number')))
    } else {
      callback()
    }
  }

  integerNanoWit = (rule, value, callback) => {
    const isNanoWit = this.unit === WIT_UNIT.NANO
    if (isNanoWit && !Number.isInteger(Number(value))) {
      callback(new Error(i18n.t('validate_integer_nano_wit')))
    } else {
      callback()
    }
  }

  minAmount = (rule, value, callback) => {
    const isNanoWit = this.unit === WIT_UNIT.NANO
    if (isNanoWit && value < 1) {
      callback(new Error(i18n.t('validate_min_amount')))
    } else {
      callback()
    }
  }

  isGrtThanBalance = (rule, value, callback) => {
    const validation =
      Number(standardizeWitUnits(value, WIT_UNIT.NANO, this.unit)) >
      this.balance
    if (validation) {
      callback(new Error(i18n.t('not_enough_balance')))
    } else {
      callback()
    }
  }

  isNumber = (rule, value, callback) => {
    if (!Number(value)) {
      callback(new Error(i18n.t('validate_number')))
    } else {
      callback()
    }
  }
}
