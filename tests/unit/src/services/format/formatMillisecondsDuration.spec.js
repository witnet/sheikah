import formatDuration from '@/services/format/formatMillisecondsDuration'

describe('formatMillisecondsDuration format seconds as hh:mm:ss', () => {
  test('should show seconds', () => {
    const ms = 59000

    expect(formatDuration(ms)).toBe('00:00:59')
  })

  test('should show minutes', () => {
    const ms = 126000

    expect(formatDuration(ms)).toBe('00:02:06')
  })

  test('should show hours if there is hour overflow', () => {
    const ms = 1000 * 60 * 60 * 2

    expect(formatDuration(ms)).toBe('02:00:00')
  })

  test('should show hours if there is hour overflow', () => {
    const ms = 1000 * 60 * 60 * 48

    expect(formatDuration(ms)).toBe('48:00:00')
  })

  test('should show 00:00:00 when input is negative', () => {
    const ms = -10

    expect(formatDuration(ms)).toBe('00:00:00')
  })

  test('should show 00:00:00 when input is not a number', () => {
    const ms = 'text'

    expect(formatDuration(ms)).toBe('00:00:00')
  })

  test('should show hour when input has decimals 20270393.538179483', () => {
    const ms = 20270393.538179483

    expect(formatDuration(ms)).toBe('05:37:50')
  })
})
