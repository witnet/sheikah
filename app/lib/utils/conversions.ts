/**
 * convert int32 to buffer
 * @param {number} int
 * @returns {Buffer}
 */
export const integerAsBuffer = (int: number) => {
  const bytes = []
  bytes.push((int >> 24) & 0xFF)
  bytes.push((int >> 16) & 0xFF)
  bytes.push((int >> 8) & 0xFF)
  bytes.push(int & 0xFF)

  return Buffer.from(bytes)
}
