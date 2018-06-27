export const join = (list: Array<any>, separator = " "): string => list
  .filter(elem => elem)
  .join(separator)