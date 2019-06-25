import msgpack5 from 'msgpack5'

const msgpack = msgpack5()

export function encodeDataRequest (radRequest) {
  return {
    not_before: radRequest.not_before,
    retrieve: radRequest.retrieve.map(retrieve => {
      return { ...retrieve, script: [...msgpack.encode(retrieve.script)] }
    }),

    aggregate: { script: [...msgpack.encode(radRequest.aggregate.script)] },
    consensus: { script: [...msgpack.encode(radRequest.consensus.script)] },
    deliver: radRequest.deliver,
  }
}

export function match (value, options, result) {
  const search = options.find(x => x.options.includes(value))
  return search
    ? search.result
    : null
}
