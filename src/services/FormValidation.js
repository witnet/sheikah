import { WIT_UNIT } from '@/constants'
import { isGrtMaxNumber, standardizeWitUnits } from '@/utils'
import i18n from '@/plugins/i18n'
import BigNumber from '@/utils/BigNumber'
const { t } = i18n.global

export default class FormValidation {
  constructor({ unit, balance, feeType }) {
    this.unit = unit
    this.feeType = feeType
    this.balance = balance
  }

  maxNumber = (rule, value, callback) => {
    if (isGrtMaxNumber(value, this.unit)) {
      callback(new Error(t('validate_max_number')))
    } else {
      callback()
    }
  }

  integerNanoWitFee = (rule, value, callback) => {
    const isNanoWit = this.unit === WIT_UNIT.NANO
    if (
      isNanoWit &&
      this.feeType?.key === 'absolute' &&
      !Number.isInteger(Number(value))
    ) {
      callback(new Error(t('validate_integer_nano_wit')))
    } else {
      callback()
    }
  }

  integerNanoWit = (rule, value, callback) => {
    const isNanoWit = this.unit === WIT_UNIT.NANO
    if (isNanoWit && !Number.isInteger(Number(value))) {
      callback(new Error(t('validate_integer_nano_wit')))
    } else {
      callback()
    }
  }

  minAmount = (rule, value, callback) => {
    const nanoWits = Number(
      standardizeWitUnits(value, WIT_UNIT.NANO, this.unit),
    )
    if (nanoWits < 1) {
      callback(new Error(t('validate_min_amount')))
    } else {
      callback()
    }
  }

  decimalsValidated = value => {
    if (!new RegExp(/^\d+\.?\d{1,9}$/).test(value)) {
      return false
    } else {
      return true
    }
  }

  hasDecimals = value => {
    return value && value.includes('.')
  }

  amountValidated = value => {
    const splitted = value.split('.')
    console.log(splitted)
    if (value.split('.').length != 2 || value.split('.')[1] === '') {
      false
    } else {
      return true
    }
  }

  isDecimalAmountValid = (rule, value, callback) => {
    const witAmount = standardizeWitUnits(value, WIT_UNIT.WIT, this.unit)
    // Check if the amount has decimals
    if (this.hasDecimals(witAmount)) {
      // Check if the decimal amount is valid
      if (!this.amountValidated(witAmount))
        callback(new Error(t('amount_error')))
      // Check if the amount has more than nine decimals
      if (!this.decimalsValidated(witAmount)) {
        callback(new Error(t('decimals_error')))
      }
      callback()
    } else {
      callback()
    }
  }

  isGrtThanBalance = (rule, value, callback) => {
    const validation =
      Number(standardizeWitUnits(value, WIT_UNIT.NANO, this.unit)) >
      this.balance
    if (validation) {
      callback(new Error(t('not_enough_balance')))
    } else {
      callback()
    }
  }

  isNumber = (rule, value, callback) => {
    // Allow using commas in numbers in form despite big.js does not support it
    try {
      new BigNumber(value.replace(',', '.'))
      callback()
    } catch {
      callback(new Error(t('validate_number')))
    }
  }

  minConsensusPercentage = (rule, value, callback) => {
    if (value < 51) {
      callback(new Error(t('create_dr_form_error_min_consensus_percentage')))
    } else {
      callback()
    }
  }

  maxConsensusPercentage = (rule, value, callback) => {
    if (value > 100) {
      callback(new Error(t('create_dr_form_error_max_consensus_percentage')))
    } else {
      callback()
    }
  }

  minCollateralAmount = (rule, value, callback) => {
    const isLessThanMin =
      Number(standardizeWitUnits(value, WIT_UNIT.WIT, WIT_UNIT.WIT)) < 1
    if (isLessThanMin) {
      callback(new Error(t('create_dr_form_error_min_collateral')))
    } else {
      callback()
    }
  }
}
