import Big from 'big.js'
import cbor from 'cbor'
import { format, formatDistanceToNow } from 'date-fns'
import uuidv4 from 'uuid/v4'
import {
  WIT_UNIT,
  EDITOR_ALLOWED_PROTOCOLS,
  WALLET_EVENTS,
  HISTORY_UPDATE_TYPE,
  EDITOR_STAGES,
} from '@/constants'
import sheikahIcon from '@/resources/svg/sheikah-small.svg'
import { Radon } from 'witnet-radon-js'

// Create Notifications if notifications are supported
export function createNotification(notificationProps) {
  if (window.Notification) {
    Notification.requestPermission(permission => {
      return innerCreateNotification(notificationProps)
    })
  } else {
    console.err(
      'Notifications not supported. Printing notification here:',
      notificationProps,
    )
  }
}

// crop string to selected number of caracters
export function cropString(string, caracters, position) {
  if (string) {
    if (position === 'middle') {
      const middlePosition = Math.floor(caracters / 2)
      return string.length > caracters
        ? `${string.substring(0, middlePosition)}...${string.substring(
            string.length - middlePosition,
            string.length,
          )}`
        : string
    } else {
      return string.length > caracters
        ? `${string.substring(0, caracters)}...`
        : string
    }
  } else {
    return ''
  }
}

// get domain from a given url
export function getDomainFromUrl(url) {
  // add default domain if the url doesn't include it
  const fullUrl = EDITOR_ALLOWED_PROTOCOLS.find(domain =>
    url.includes(`${domain}://`),
  )
    ? url
    : `${EDITOR_ALLOWED_PROTOCOLS[0]}://${url}`
  const parts = fullUrl.split('/')
  const match =
    Array.isArray(parts) && parts[2]
      ? parts[2].match(/([\w-]+\.)*([\w-]+\.\w{2,6}$)/)
      : ''

  return match && match.length ? match[0] : ''
}

// Create Notifications with specified arguments
function innerCreateNotification(partialProps) {
  const notificationProps = {
    vibrate: [50, 100, 150],
    closeTimeout: 8000,
    icon: sheikahIcon,
    ...partialProps,
  }
  const notification = new Notification(
    notificationProps.title,
    notificationProps,
  )
  if (Number.isInteger(notificationProps.closeTimeout)) {
    setTimeout(() => {
      notification.close()
    }, notificationProps.closeTimeout)
  }
}

export function isSyncEvent(eventType) {
  return [
    WALLET_EVENTS.SYNC_FINISH,
    WALLET_EVENTS.SYNC_PROGRESS,
    WALLET_EVENTS.SYNC_START,
  ].find(syncEvent => syncEvent === eventType)
}

function encodeAggregationTally(stage) {
  return {
    filters: stage.filters.map(filter => {
      return Array.isArray(filter)
        ? {
            op: filter[0],
            args: filter.slice(1).length
              ? [...cbor.encode(filter.map(Number).slice(1)).values()]
              : [],
          }
        : { op: filter, args: [] }
    }),
    reducer: stage.reducer,
  }
}
// Convert the received amount of nanoWits into selected unit
export function standardizeWitUnits(
  amount,
  outputCurrency,
  inputCurrency = WIT_UNIT.NANO,
) {
  // from input currency to output currency
  const witUnitConversor = {
    [`${WIT_UNIT.WIT}`]: {
      [`${WIT_UNIT.WIT}`]: 0,
      [`${WIT_UNIT.MICRO}`]: 6,
      [`${WIT_UNIT.NANO}`]: 9,
    },
    [`${WIT_UNIT.MICRO}`]: {
      [`${WIT_UNIT.WIT}`]: -6,
      [`${WIT_UNIT.MICRO}`]: 0,
      [`${WIT_UNIT.NANO}`]: 3,
    },
    [`${WIT_UNIT.NANO}`]: {
      [`${WIT_UNIT.WIT}`]: -9,
      [`${WIT_UNIT.MICRO}`]: -3,
      [`${WIT_UNIT.NANO}`]: 0,
    },
  }

  const num = Big(amount)
  const exponent = witUnitConversor[inputCurrency][outputCurrency]

  return num.times(Big(10).pow(exponent), 0).toFixed()
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

// Take the substring in between a string
export function selectInnerError(string) {
  if (string) {
    const substringInBetweenRegex = /(?<=Inner: `Some\()(.*)(?=\))/
    const matchedArray = string.match(substringInBetweenRegex)
    return matchedArray ? matchedArray[0] : string
  }
}

// Split the first word of a camelCase string
export function standardizeOperatorName(name) {
  if (name) {
    const capitalLetterRegex = /[A-Z][a-z]+/g
    const matchedArray = (name.match(capitalLetterRegex) || []).splice(1)
    if (matchedArray.length) {
      matchedArray[0] = matchedArray[0].toLowerCase()
      const standardizedWord = matchedArray.join('')
      return standardizedWord === 'parse' ? 'parseXml' : standardizedWord
    } else {
      return name.toLowerCase()
    }
  }
}
export function standardizeTransactionResult(name) {
  if (name) {
    const capitalLetterRegex = /[A-Z][a-z]+/g
    const matchedArray = (name.match(capitalLetterRegex) || []).splice(2)
    if (matchedArray.length) {
      const standardizedWord =
        matchedArray[0] +
        matchedArray[1] +
        '(' +
        matchedArray[2] +
        matchedArray[3] +
        ')'
      return standardizedWord
    } else {
      return name
    }
  }
}
// Split the last word of a camelCase string an return the first item
export function standardizeOutputType(name) {
  if (name) {
    const capitalLetterRegex = /(?=[A-Z][a-z]+$)/
    const arrayfromName = name.split(capitalLetterRegex)
    if (arrayfromName.length > 1) {
      arrayfromName[0] = arrayfromName[0].toLowerCase()
      return arrayfromName[0]
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
  const timestampLength = timestamp.toString().length
  const t = timestampLength < 13 ? timestamp + '000' : timestamp
  const date = new Date(Math.floor(t))
  // let date = new Date(timestamp)
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
  const currentDate = new Date(Number(d))
  return `${formatDistanceToNow(currentDate)} ago`
}

export function formatDateVerbose(date) {
  return format(date, 'MMM do yyyy')
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
  const listener = function(ev) {
    ev.preventDefault()
    ev.clipboardData.setData('text/plain', str)
  }
  document.addEventListener('copy', listener)
  document.execCommand('copy')
  document.removeEventListener('copy', listener)
}

// Get the native javascript type from the radon markup argument type
export function getNativeValueFromMarkupArgumentType(value, type) {
  if (type === 'number') {
    return Number(value)
  }
  if (type === 'boolean') {
    return value === 'true'
  }
  if (type === 'map') {
    try {
      return JSON.parse(value)
    } catch (error) {
      console.log('Error parsing json')
    }
  }
  return value
}

export function isValidRadRequest(dr) {
  try {
    const radon = new Radon(dr)
    return radon.getMarkup() && radon.getMir() && radon.getJs()
  } catch (e) {
    return false
  }
}

export function deleteKey(obj, key) {
  const newObj = { ...obj }

  delete newObj[key]

  return newObj
}
// Calculate the id or index of the element to focus. It receives the previous history checkpoint
export function calculateCurrentFocusAfterUndo(
  previousHistoryCheckpoint,
  markup,
  variables,
) {
  const { stage, type, scriptId, index, id } = previousHistoryCheckpoint
  const markupRetrieve = markup.retrieve

  if (
    type === HISTORY_UPDATE_TYPE.DELETE_OPERATOR ||
    type === HISTORY_UPDATE_TYPE.PUSH_OPERATOR
  ) {
    if (stage === EDITOR_STAGES.SCRIPTS) {
      const scriptIdIndex = markupRetrieve.findIndex(
        source => source.scriptId === scriptId,
      )
      const script = markupRetrieve[scriptIdIndex].script
      const lastOperator = script[script.length - 1]

      return lastOperator ? lastOperator.id : 'void'
    } else {
      const filters =
        markup[stage === 'aggregations' ? 'aggregate' : 'tally'].filters
      const lastOperator = filters[filters.length - 1]

      return lastOperator ? lastOperator.id : 'void'
    }
  } else if (type === HISTORY_UPDATE_TYPE.DELETE_SOURCE) {
    return index
  } else if (type === HISTORY_UPDATE_TYPE.ADD_SOURCE) {
    return markupRetrieve.length - 1
  } else if (type === HISTORY_UPDATE_TYPE.UPDATE_TEMPLATE) {
    return id
  } else if (type === HISTORY_UPDATE_TYPE.UPDATE_SOURCE) {
    return index
  } else if (type === HISTORY_UPDATE_TYPE.DELETE_VARIABLE) {
    return index
  } else if (type === HISTORY_UPDATE_TYPE.ADD_VARIABLE) {
    return variables && variables.length ? variables.length - 1 : 0
  } else if (type === HISTORY_UPDATE_TYPE.UPDATE_VARIABLE) {
    return index
  }
}

export function calculateCurrentFocusAfterRedo(
  currentHistoryCheckpoint,
  markup,
  variables,
) {
  const { type, stage, scriptId, index, id } = currentHistoryCheckpoint
  const markupRetrieve = markup.retrieve

  if (
    type === HISTORY_UPDATE_TYPE.DELETE_OPERATOR ||
    type === HISTORY_UPDATE_TYPE.PUSH_OPERATOR
  ) {
    if (stage === EDITOR_STAGES.SCRIPTS) {
      const index = markupRetrieve.findIndex(
        source => source.scriptId === scriptId,
      )
      const script = markupRetrieve[index].script
      const op = script[script.length - 1]

      return op ? op.id : 'void'
    } else {
      const filters =
        markup[stage === 'aggregations' ? 'aggregate' : 'tally'].filters
      const op = filters[filters.length - 1]

      return op ? op.id : 'void'
    }
  } else if (type === HISTORY_UPDATE_TYPE.DELETE_SOURCE) {
    return index
  } else if (type === HISTORY_UPDATE_TYPE.ADD_SOURCE) {
    return markupRetrieve.length - 1
  } else if (type === HISTORY_UPDATE_TYPE.UPDATE_TEMPLATE) {
    return id
  } else if (type === HISTORY_UPDATE_TYPE.UPDATE_SOURCE) {
    return index
  } else if (type === HISTORY_UPDATE_TYPE.DELETE_VARIABLE) {
    return index
  } else if (type === HISTORY_UPDATE_TYPE.ADD_VARIABLE) {
    return variables && variables.length ? variables.length - 1 : 0
  } else if (type === HISTORY_UPDATE_TYPE.UPDATE_VARIABLE) {
    return index
  }
}
