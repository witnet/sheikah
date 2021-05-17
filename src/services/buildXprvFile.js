export function buildXprvFile(masterKey, birthDate) {
  return `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify({
      master_key: masterKey,
      birth_date: birthDate || 0,
    }),
  )}`
}
