import cbor from 'cbor'
import { shell } from 'electron'
import uuidv4 from 'uuid/v4'

export function encodeDataRequest(radRequest) {
  return {
    not_before: radRequest.not_before,
    retrieve: radRequest.retrieve.map(retrieve => {
      return { ...retrieve, script: [...cbor.encode(retrieve.script)] }
    }),

    aggregate: { script: [...cbor.encode(radRequest.aggregate.script)] },
    consensus: { script: [...cbor.encode(radRequest.consensus.script)] },
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
