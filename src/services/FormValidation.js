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
    } catch (err) {
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
