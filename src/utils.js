import cbor from 'cbor'
import uuidv4 from 'uuid/v4'
import ow from 'ow'
import { WIT_UNIT, CLAIMING_ADDRESS_MIN_WITS } from '@/constants'

// Create Notifications if notifications are supported
export function createNotification(notificationProps) {
  if (window.Notification) {
    Notification.requestPermission(permission => innerCreateNotification(notificationProps))
  } else {
    console.log('Notifications not supported')
  }
}

// Create Notifications with specified arguments
function innerCreateNotification(notificationProps) {
  const notification = new Notification(notificationProps.title, notificationProps)
  if (Number.isInteger(notificationProps.closeTimeout)) {
    setTimeout(() => {
      notification.close()
    }, notificationProps.closeTimeout)
  }
}

function encodeAggregationTally(stage) {
  return {
    filters: stage.filters.map(filter => {
      return Array.isArray(filter)
        ? { op: filter[0], args: filter.slice(1).length ? cbor.encode(filter.slice(1)) : [] }
        : { op: filter, args: [] }
    }),
    reducer: stage.reducer,
  }
}
// Convert the received amount of nanoWits into selected unit
export function standardizeWitUnits(amount, unit) {
  const units = {
    [`${WIT_UNIT.WIT}`]: 9,
    [`${WIT_UNIT.MICRO}`]: 3,
    [`${WIT_UNIT.NANO}`]: 0,
  }
  return (amount / Math.pow(10, units[unit])).toFixed(units[unit]).replace(/\.?0+$/, '')
}

export function encodeDataRequest(radRequest) {
  return {
    // TODO: Use only one timelock argument when the wallet standarize calls
    timeLock: radRequest.timelock,
    time_lock: radRequest.timelock,
    retrieve: radRequest.retrieve.map(retrieve => {
      return { ...retrieve, script: [...cbor.encode(retrieve.script)] }
    }),
    aggregate: encodeAggregationTally(radRequest.aggregate),
    tally: encodeAggregationTally(radRequest.tally),
  }
}
export function addToList(id, list = [], key) {
  if (isRepeated(id, list)) {
    return list[id][key]
  } else {
    return ''
  }
}
export function isRepeated(key, list) {
  return list && list[key]
}

// Split the first word of a camelCase string
export function standardizeOperatorName(name) {
  if (name != null) {
    const capitalLetterRegex = /[A-Z][a-z]+/g
    const matchedArray = (name.match(capitalLetterRegex) || []).splice(1)
    if (matchedArray.length) {
      matchedArray[0] = matchedArray[0].toLowerCase()
      const standardizedWord = matchedArray.join('')
      return standardizedWord
    } else {
      return name.toLowerCase()
    }
  }
}

export function match(value, options, result) {
  const search = options.find(x => x.options.includes(value))
  return search ? search.result : null
}

export function changeDateFormat(string, format) {
  let date = new Date(string)
  if (format === 'claiming') {
    const formatedDate = date
      .toString()
      .split(' ')
      .splice(1, 4)
    const month = formatedDate[0].toUpperCase()
    const day = formatedDate[1]
    const year = formatedDate[2]
    const time = formatedDate[3]
    return `${month} ${day}, ${year} @ ${time}`
  } else {
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    let year = date.getFullYear()
    if (month.length < 2) {
      month = '0' + month
    }
    if (day.length < 2) {
      day = '0' + day
    }
    return `${day}-${month}-${year}`
  }
}

// export function changeDateFormat(string) {
//   let date = new Date(string)
//   let month = '' + (date.getMonth() + 1)
//   let day = '' + date.getDate()
//   let year = date.getFullYear()

//   if (month.length < 2) {
//     month = '0' + month
//   }
//   if (day.length < 2) {
//     day = '0' + day
//   }
//   return `${day}-${month}-${year}`
// }

// TODO(#935): allow open links with electron.shell.openExternal
export async function openInExternalApp(url) {
  // if (process.env.IS_ELECTRON) {
  //     .then(electron => {
  // electron.shell.openExternal(url)
  //     })
  //     .catch(error => {
  //       throw Error(error)
  //     })
  // } else {
  window.location.href = url
}

export function generateId(random) {
  return random ? uuidv4(random) : uuidv4()
}

// check if contains the same elements
export function areSoftEqualArrays(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.reduce((acc, item) => (acc ? arr2.includes(item) : false), true) &&
    arr2.reduce((acc, item) => (acc ? arr1.includes(item) : false), true)
  )
}

export function formatSectionApiErrorsByRoute(routeName, errorsMap, apiErrors) {
  const errorMessages = {
    getTransactionsError: 'An error occurred retrieving your transactions',
    createVTTError: 'An error occurred creating a Value Transfer Transaction',
    tryDataRequestError: 'An error occurred trying your data request',
    deployDataRequestError: 'An error occurred deploying a data request',
  }
  return Object.entries(errorsMap)
    .filter(entry => entry[0] === routeName)
    .filter(entry => entry[1].find(errorName => !!apiErrors[errorName]))
    .map(entry => [...entry[1]])
    .reduce((acc, errorNames) => [...acc, ...errorNames], [])
    .map(errorName => ({
      name: errorName,
      message: errorMessages[errorName],
      description: `
      ${apiErrors[errorName].message}.
      ${JSON.stringify(apiErrors[errorName].data)}
      `,
    }))
}

export function copyToClipboard(id) {
  let textToCopy = document.getElementById(id)
  let currentRange
  if (document.getSelection().rangeCount > 0) {
    currentRange = document.getSelection().getRangeAt(0)
    window.getSelection().removeRange(currentRange)
  } else {
    currentRange = false
  }
  let CopyRange = document.createRange()
  CopyRange.selectNode(textToCopy)
  window.getSelection().addRange(CopyRange)
  document.execCommand('copy')
  window.getSelection().removeRange(CopyRange)
  if (currentRange) {
    window.getSelection().addRange(currentRange)
  }
}

// Get the native javascript type from the radon markup argument type
export function getNativeValueFromMarkupArgumentType(value, type) {
  if (type === 'number') {
    return Number(value)
  }
  if (type === 'boolean') {
    return value === 'true'
  }
  return value
}

// calculate the number of addresses and its amount according to the amount of wits passed
export function groupAmountByUnlockedDate(amount) {
  if (amount === 0) return []
  const ceil = precision => x => Math.ceil(x / precision) * precision
  // round the amount of wits for convenience and deniability
  const roundedAmount =
    amount % CLAIMING_ADDRESS_MIN_WITS === 0 ? amount : ceil(CLAIMING_ADDRESS_MIN_WITS)(amount)

  return (roundedAmount / CLAIMING_ADDRESS_MIN_WITS)
    .toString()
    .split('')
    .map(Number)
    .reverse()
    .map((x, exp) => {
      return new Array(x).fill(50 * 10 ** exp)
    })
    .reduce((a, b) => [...a, ...b])
}

export function createExportClaimingFileLink(importedFile, addresses, disclaimers) {
  return `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify({
      email_address: importedFile.data.emailAddress,
      name: importedFile.data.name,
      addresses,
      disclaimers: disclaimers,
      signature: importedFile.signature,
    })
  )}`
}

export function buildClaimingAddresses(amountByUnlockedDate, vesting, addresses) {
  return amountByUnlockedDate
    .map((amount, index) => {
      let timelock = Math.floor(vesting[index].date.getTime() / 1000)
      return amount.map(wits => {
        return {
          address: addresses.shift(),
          amount: wits,
          timelock,
        }
      })
    })
    .reduce((acc, arr) => [...acc, ...arr])
}

export async function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}

// validate imported file structure
export function validateClaimingImportFile(importedFile) {
  return ow.isValid(
    importedFile,
    // imported file schema
    ow.object.exactShape({
      data: {
        email_address: ow.string,
        name: ow.string,
        usd: ow.number,
        wit: ow.number,
        genesis_date: ow.number,
        vesting: {
          delay: ow.number,
          cliff: ow.number,
          installment_length: ow.number,
          installment_wits: ow.number,
        },
      },
      signature: ow.string,
    })
  )
}

export function calculateVesting(vestingInfo, amount, genesisDate) {
  const { delay, installmentLength, cliff, installmentWits } = vestingInfo
  const numberOfSteps = Math.ceil(amount / installmentWits)
  return Array(numberOfSteps)
    .fill(0)
    .map((_, index) => {
      let date = new Date(genesisDate)
      date.setSeconds(date.getSeconds() + delay + cliff + installmentLength * index)
      let currentAmount = amount >= installmentWits ? installmentWits : amount
      amount -= installmentWits
      return {
        date: date,
        amount: currentAmount,
      }
    })
}
