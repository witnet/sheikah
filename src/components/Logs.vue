<template>
  <div class="logs-container">
    <div class="row log" v-for="(log, index) in logs" :key="log.timestamp">
      <div class="row">
        <div v-show="errors[index] === false" class="column info">INFO</div>
        <div v-show="errors[index] === true" class="column error">ERROR</div>
        <div class="column message">{{ log.result }}</div>
      </div>
      <div class="column time">{{ log.timestamp }}</div>
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
      font-size: 14px;
    }
    .error {
      height: min-content;
      padding: 2px 4px;
      background-color: $red-1;
      color: $white;
      font-size: 10px;
      margin-right: 8px;
      border-radius: 2px;
      border: 2px solid $red-1;
    }
    .info {
      height: min-content;
      padding: 2px 4px;
      background-color: $purple-6;
      color: $white;
      font-size: 10px;
      margin-right: 8px;
      border-radius: 2px;
      border: 1px solid $purple-6;
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
