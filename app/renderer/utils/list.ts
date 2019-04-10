// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const join = (list: Array<any>, separator = " "): string => list
  .filter(elem => elem)
  .join(separator)
