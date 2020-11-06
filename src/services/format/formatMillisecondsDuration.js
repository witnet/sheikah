export default function formatMillisecondsDuration(milliseconds) {
  if (!milliseconds) {
    return '00:00:00'
  }

  const seconds = Math.floor((milliseconds / 1000) % 60)
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
  const hours = Math.floor(milliseconds / (1000 * 60 * 60))

  return [hours, minutes, seconds]
    .map(String)
    .map(str => str.padStart(2, '0'))
    .join(':')
}
