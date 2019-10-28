import cbor from 'cbor'
import { shell } from 'electron'
import uuidv4 from 'uuid/v4'

export function encodeDataRequest(radRequest) {
  return {
    timelock: radRequest.timelock,
    retrieve: radRequest.retrieve.map(retrieve => {
      return { ...retrieve, script: [...cbor.encode(retrieve.script)] }
    }),
    aggregate: { script: [...cbor.encode(radRequest.aggregate.script)] },
    tally: { script: [...cbor.encode(radRequest.tally.script)] },
    deliver: radRequest.deliver,
  }
}

export function match(value, options, result) {
  const search = options.find(x => x.options.includes(value))
  return search ? search.result : null
}

export function openInExternalApp(url) {
  shell.openExternal(url)
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
