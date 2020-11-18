export default function formatMillisecondsDuration(milliseconds) {
  if (!milliseconds || Number.isNaN(milliseconds) || milliseconds <= 0) {
    return '00:00:00'
  }

  const seconds = Math.floor((milliseconds / 1000) % 60)
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
  const hours = Math.floor(milliseconds / (1000 * 60 * 60))

  const hoursMinutesSeconds = [hours, minutes, seconds]

  const isValidDuration = hoursMinutesSeconds.reduce(
    (err, val) => err || !Number.isInteger(val),
    false,
  )

  if (isValidDuration) {
    return '00:00:00'
  } else {
    return hoursMinutesSeconds
      .map(String)
      .map(str => str.padStart(2, '0'))
      .join(':')
  }
}
