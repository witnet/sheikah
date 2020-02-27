<template>
  <div class="logs-container">
    <div class="row log" v-for="(log, index) in logs" :key="log.timestamp">
      <p v-show="errors[index] === false" class="column info">INFO</p>
      <p v-show="errors[index] === true" class="column error">ERROR</p>
      <div class="column message">{{ log.result }}</div>
      <p class="column time">{{ log.timestamp }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logs',
  data() {
    return {
      errors: [],
    }
  },
  props: {
    logs: Array,
  },
  methods: {
    checkResult() {
      this.errors = this.logs.map(log => log.result.includes('RadonError'))
    },
  },
  watch: {
    logs() {
      this.checkResult()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.logs-container {
  width: 100%;
  padding-top: 32px;
  height: 20vh;
  overflow-y: scroll;
  background-color: $black;
  .row {
    display: flex;
    justify-content: space-between;
    .column {
      min-width: 40px;
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .log {
    display: flex;
    margin-bottom: 8px;

    .time,
    .message {
      margin-right: 16px;
      justify-content: flex-start;
      color: #c5c2c2;
    }
    .error {
      height: min-content;
      background-color: $red-0;
      color: #fff;
      font-size: 12px;
      margin-right: 8px;
      border: 2px solid $red-0;
    }
    .info {
      height: min-content;
      background-color: #1a6cfb;
      color: #fff;
      font-size: 12px;
      margin-right: 8px;
      border: 1px solid #1a6cfb;
    }
    .time {
      margin-right: 8px;
    }
    &:hover {
      background-color: #252525;
    }
  }
}
</style>
