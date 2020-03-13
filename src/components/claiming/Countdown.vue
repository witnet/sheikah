<template>
  <div class="countdown">
    <div class="column">
      <p class="digit">{{ days }}</p>
      <p class="text">Days</p>
    </div>
    <div class="column">
      <p class="digit">{{ hours }}</p>
      <p class="text">Hours</p>
    </div>
    <div class="column">
      <p class="digit">{{ minutes }}</p>
      <p class="text">Minutes</p>
    </div>
    <div class="column">
      <p class="digit">{{ seconds }}</p>
      <p class="text">Seconds</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: [String, Date],
    },
  },
  data() {
    return {
      now: Math.trunc(new Date().getTime() / 1000),
    }
  },
  mounted() {
    window.setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000)
    }, 1000)
  },
  methods: {
    standardizeDigits(value) {
      if (value < 0) {
        return '00'
      }
      if (value.toString().length <= 1) {
        return `0${value}`
      }
      return value
    },
  },
  computed: {
    dateInMilliseconds() {
      return Math.trunc(Date.parse(this.date) / 1000)
    },
    seconds() {
      const seconds = (this.dateInMilliseconds - this.now) % 60
      return this.standardizeDigits(seconds)
    },
    minutes() {
      const minutes = Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60
      return this.standardizeDigits(minutes)
    },
    hours() {
      const hours = Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24
      return this.standardizeDigits(hours)
    },
    days() {
      const days = Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24)
      return this.standardizeDigits(days)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
.countdown {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  .column {
    display: flex;
    flex-direction: column;
    margin: 20px;
    font-weight: 700px;
    .text {
      color: $blue-6;
      margin-top: 24px;
      font-size: 20px;
      margin-bottom: 16px;
      text-align: center;
    }

    .digit {
      color: $font-color-light;
      font-size: 50px;
      font-weight: 700px;
      margin: 10px;
      text-align: center;
    }
  }
}
</style>
