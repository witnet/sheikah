import { assertNever } from "app/common/utils"

export type dateAccuracy = "min" | "day"

/**
 * Function to pad a number with a leading zero if required to have 2 digits
 */
function padNumber(n: number) {
  return (n < 10)
    ? `0${n}`
    : n
}

/**
 *  Function to parse date to a human redable format
 *
 * @export
 * @param {Date} date
 * @param {dateAccuracy} accuracy
 * @param {boolean} [ordinal]
 * @returns
 */
export default function parseDate(date: Date, accuracy: dateAccuracy, ordinal?: boolean): string {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const min = date.getMinutes()
  const hour = date.getHours()
  const day = date.getDate()
  const ordinalSuffix = ordinal ? calculateOrdinalSuffix(day) : ""
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()
  let parsedDate = ""
  switch (accuracy) {
    case "min":
      parsedDate = `${month} ${day} at ${padNumber(hour)}:${padNumber(min)}`
      break
    case "day":
      parsedDate = `${month} ${day}${ordinalSuffix}, ${year}`
      break
    default:
      assertNever(accuracy)
  }

  return parsedDate
}

/**
 * Function to calculate ordinal suffix of month day
 *
 * @param {number} day
 * @returns
 */
function calculateOrdinalSuffix(day: number) {
  const mod = day % 10

  if (mod === 1 && day !== 11) {
    return "st"
  } else if (mod === 2 && day !== 12) {
    return "nd"
  } else if (mod === 3 && day !== 13) {
    return "rd"
  } else {
    return "th"
  }
}

export {
  parseDate
}