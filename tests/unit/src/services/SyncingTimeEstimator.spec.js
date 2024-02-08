import SyncingTimeEstimator from '@/services/SyncingTimeEstimator'
import { SYNCING_TIME_WINDOW_LENGTH } from '@/constants'

describe('formatDuration', () => {
  describe('should start method initialize the estimator', () => {
    test('passing an argument', () => {
      const estimator = new SyncingTimeEstimator()

      estimator.start()

      expect(estimator.previousTime).toBeTruthy()
    })

    test('passing an argument', () => {
      const estimator = new SyncingTimeEstimator()
      const date = Date.now()

      estimator.start(date)

      expect(estimator.previousTime).toBe(date)
    })
  })

  describe('hasStarted method informs if the estimator has been started', () => {
    test('should return true when start method has been called', () => {
      const estimator = new SyncingTimeEstimator()
      const date = Date.now()

      estimator.start(date)

      expect(estimator.hasStarted()).toBe(true)
    })

    test('should return false when start method has been called', () => {
      const estimator = new SyncingTimeEstimator()

      expect(estimator.hasStarted()).toBe(false)
    })
  })

  describe('addSample method adds data to calculate how much time last sync previous blocks', () => {
    test('should add a sample if the estimator is initialized', () => {
      const estimator = new SyncingTimeEstimator()
      const date = Date.now()
      const sample = { currentBlock: 1, lastBlock: 100 }

      estimator.start(date)
      estimator.addSample(sample)

      expect(estimator.window.length).toBe(1)
    })

    test('should not add a sample if the estimator is initialized', () => {
      const estimator = new SyncingTimeEstimator()
      const sample = { currentBlock: 1, lastBlock: 100 }

      estimator.addSample(sample)

      expect(estimator.window.length).toBe(0)
    })

    test('should keep max size after add a greater number of more samples', () => {
      const estimator = new SyncingTimeEstimator()
      estimator.start()

      Array(SYNCING_TIME_WINDOW_LENGTH + 1)
        .fill(null)
        .forEach((item, index) => {
          estimator.addSample({
            currentBlock: index * 50,
            lastBlock: index * 50 + 50,
          })
        })

      expect(estimator.window.length).toBe(100)
    })

    test('should remove oldest value if size is reached', async () => {
      const estimator = new SyncingTimeEstimator()
      estimator.start()

      const mockWindow = Array(SYNCING_TIME_WINDOW_LENGTH + 1).fill(null)
      for (const index of mockWindow.keys()) {
        await sleep(index * 2)
        estimator.addSample({
          currentBlock: index * 50,
          lastBlock: index * 50 + 50,
        })
      }
      const oldestSample = estimator.window?.[0]
      console.log(oldestSample)
      estimator.addSample({ currentBlock: 101 * 50, lastBlock: 101 * 50 + 50 })
      console.log(estimator.window[0])
      expect(estimator.window[0] !== oldestSample).toBe(true)
    }, 30000)
  })

  describe('calculate method returns the average of the calculated samples', () => {
    test('should calculate the average if samples have been added', async () => {
      const estimator = new SyncingTimeEstimator()
      estimator.start()

      const mockWindow = Array(SYNCING_TIME_WINDOW_LENGTH + 1).fill(null)
      for (const index of mockWindow.keys()) {
        await sleep(index * 2)
        estimator.addSample({
          currentBlock: index * 50,
          lastBlock: index * 50 + 50,
        })
      }

      const average = estimator.calculate()

      expect(average).toBeTruthy()
    }, 30000)

    test('should return 0 if no samples have been added', () => {
      const estimator = new SyncingTimeEstimator()
      estimator.start()

      const average = estimator.calculate()

      expect(average).toBe(0)
    })
  })

  describe('reset method should clear the internal state of the estimator', () => {
    test('should clear window samples', () => {
      const estimator = new SyncingTimeEstimator()
      estimator.start()
      estimator.addSample({ currentBlock: 50, lastBlock: 100 })

      estimator.reset()

      expect(estimator.window.length).toBe(0)
    })

    test('should clear internal time counter', () => {
      const estimator = new SyncingTimeEstimator()
      estimator.start()

      estimator.reset()

      expect(estimator.previousTime).toBe(null)
    })
  })
})
