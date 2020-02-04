import cbor from 'cbor'
import uuidv4 from 'uuid/v4'
import { WIT_UNIT } from '@/constants'

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
    const matchedArray = name.match(capitalLetterRegex).splice(1)
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

export function changeDateFormat(string) {
  let date = new Date(string)
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

export async function openInExternalApp(url) {
  if (process.env.IS_ELECTRON) {
    import('electron')
      .then(electron => {
        electron.shell.openExternal(url)
      })
      .catch(error => {
        throw Error(error)
      })
  } else {
    window.location.href = url
  }
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
