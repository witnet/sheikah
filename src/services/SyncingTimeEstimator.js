import { SYNCING_TIME_WINDOW_LENGTH } from '@/constants'

export default class SyncingTimeEstimator {
  constructor() {
    this.window = []
    this.previousTime = null
    this.size = SYNCING_TIME_WINDOW_LENGTH
    this.lastTime = null
    this.previousBlock = 0
  }

  start(startTime) {
    this.previousTime = startTime || Date.now()
  }

  hasStarted() {
    return !!this.previousTime
  }

  reset() {
    this.window = []
    this.previousTime = null
  }

  addSample({ currentBlock, lastBlock }) {
    if (this.previousTime) {
      const currentTimestamp = Date.now()

      const timeToCurrentBlock = currentTimestamp - this.previousTime
      const missingBlocks = lastBlock - currentBlock
      const timeToSync =
        (timeToCurrentBlock * missingBlocks) /
        (currentBlock - (this.previousBlock || 0))

      if (this.window.length === this.size) {
        this.window.shift()
      }
      if (timeToSync != Infinity && !isNaN(timeToSync)) {
        this.window.push(timeToSync)
      }

      this.previousTime = currentTimestamp
      this.previousBlock = currentBlock
    } else {
      console.log('[ERROR]: You have to call start before addSample')
    }
  }

  calculate() {
    if (this.window.length) {
      return this.window.reduce((acc, item) => acc + item) / this.window.length
    } else {
      console.log("[WARN]: You haven't added a sample")
      return 0
    }
  }
}
