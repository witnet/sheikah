import { TYPESYSTEM as RadonTypeSystem, TYPES as RadonTypes } from '@/radon'

export function getLastOperator(request, stage, retrieveIndex) {
  const script = retrieveIndex ? this[stage][retrieveIndex].script : this[stage].script

  return script[script.length - 1]
}

export function getOperatorCode(operator) {
  return Array.isArray(operator) ? operator[0] : operator
}

export function getTypeFromOperatorCode(operatorCode) {
  return Object.entries(RadonTypeSystem).reduce((acc, array) => {
    const hasSameType = Object.keys(array[1]).find(code => {
      return parseInt(code) === operatorCode
    })
    if (hasSameType) {
      acc = array[0]
    }
    return acc
  }, '')
}

export function getOutput(operatorCode) {
  operatorCode = Array.isArray(operatorCode) ? operatorCode[0] : operatorCode
  return Object.entries(RadonTypeSystem).reduce((acc, array) => {
    if (Object.keys(array[1]).find(key => parseInt(key) === operatorCode)) {
      acc = RadonTypes[RadonTypeSystem[array[0]][operatorCode]]
    }
    return acc
  }, '')
}

export function isValidScript() {
  return false
}
