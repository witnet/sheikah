import {
  TYPES as RadonTypes,
  TYPESYSTEM as RadonTypeSystem,
} from '@/radon'

export function getLastOperator (request, stage, retrieveIndex) {
  const script = retrieveIndex
    ? this[stage][retrieveIndex].script
    : this[stage].script

  return script[script.length - 1]
}

export function getOperatorCode (operator) {
  return Array.isArray(operator) ? operator[0] : operator
}
export function getOutput (operatorCode) {
  return Object.entries(RadonTypeSystem).reduce((acc, array) => {
    if (Object.keys(array[1]).find(key => parseInt(key) === operatorCode)) {
      acc = RadonTypes[RadonTypeSystem[array[0]][operatorCode]]
    }
    return acc
  }, '')
}
