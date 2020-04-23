import cbor from 'cbor'
import { format } from 'date-fns'
import uuidv4 from 'uuid/v4'
import { WIT_UNIT } from '@/constants'

// Create Notifications if notifications are supported
export function createNotification(notificationProps) {
  if (window.Notification) {
    Notification.requestPermission(permission => innerCreateNotification(notificationProps))
  } else {
    console.log('Notifications not supported')
  }
}

// crop string to selected number of caracters
export function cropString(string, caracters, position) {
  if (position === 'middle') {
    const middlePosition = Math.floor(caracters / 2)
    return string.length > caracters
      ? `${string.substring(0, middlePosition)}...${string.substring(
          string.length - middlePosition,
          string.length
        )}`
      : string
  } else {
    return string.length > caracters ? `${string.substring(0, caracters)}...` : string
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
  if (unit === WIT_UNIT.NANO) {
    return amount.toString()
  } else {
    return (amount / Math.pow(10, units[unit])).toFixed(units[unit]).replace(/\.?0+$/, '')
  }
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

export function changeDateFormat(timestamp) {
  let date = new Date(timestamp)
  const formatedDate = date
    .toString()
    .split(' ')
    .splice(1, 4)
  const month = formatedDate[0].toUpperCase()
  const day = formatedDate[1]
  const year = formatedDate[2]
  const time = formatedDate[3]
  return `${month} ${day}, ${year} @ ${time}`
}

/// calculate the time passed from a given date
export function calculateTimeAgo(date) {
  const timestampLength = date.toString().length
  const d = timestampLength < 13 ? date + '000' : date

  const seconds = Math.floor((new Date() - d) / 1000)
  const years = Math.floor(seconds / 31536000)
  const months = Math.floor(seconds / 2592000)
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor(seconds / 60)

  if (years > 1) {
    return `${years} years ago`
  } else if (months > 1) {
    return `${months} months ago`
  } else if (days > 1) {
    return `${days} days ago`
  } else if (hours > 1) {
    return `${hours} hours ago`
  } else if (minutes > 1) {
    return `${minutes} minutes ago`
  } else {
    return `${Math.floor(seconds)} seconds ago`
  }
}

export function formatDateVerbose(date) {
  return format(date, 'MMM do yyy')
}

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

export function copyToClipboard(str) {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
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
