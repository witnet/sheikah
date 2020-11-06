import formatDuration from '@/services/format/formatMillisecondsDuration'

describe('formatMillisecondsDuration format seconds as hh:mm:ss', () => {
  it('should show seconds', () => {
    const ms = 59000

    expect(formatDuration(ms)).toBe('00:00:59')
  })

  it('should show minutes', () => {
    const ms = 126000

    expect(formatDuration(ms)).toBe('00:02:06')
  })

  it('should show hours if there is hour overflow', () => {
    const ms = 1000 * 60 * 60 * 2

    expect(formatDuration(ms)).toBe('02:00:00')
  })

  it.only('should show hours if there is hour overflow', () => {
    const ms = 1000 * 60 * 60 * 48

    expect(formatDuration(ms)).toBe('48:00:00')
  })
})
