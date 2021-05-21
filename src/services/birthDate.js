import { BIRTH_DATE_DELAY_DAYS, GENESIS_TIMESTAMP } from '@/constants'
import { subtractDaysToTimestamp, convertTimestampIntoEpoch } from '@/utils'

export function buildImportWalletBirthdate(birthDate) {
  if (!birthDate) {
    return null
  }

  const birthDateTimestamp = birthDate.getTime()
  // Delay user's date to avoid vagueness errors
  const delayedDate = new Date(
    subtractDaysToTimestamp(birthDateTimestamp, BIRTH_DATE_DELAY_DAYS),
  )

  if (
    !isValidBirthDate(birthDate) ||
    delayedDate.getTime() < GENESIS_TIMESTAMP
  ) {
    return null
  } else {
    return convertTimestampIntoEpoch(
      subtractDaysToTimestamp(birthDateTimestamp, BIRTH_DATE_DELAY_DAYS),
    )
  }
}

export function isValidBirthDate(date, actualDate = new Date()) {
  return date > new Date(GENESIS_TIMESTAMP) && date < actualDate
}
