export function match (value, options, result) {
  const search = options.find(x => x.options.includes(value))
  return search
    ? search.result
    : null
}
