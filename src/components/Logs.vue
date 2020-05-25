<template>
  <div class="logs-container">
    <div v-for="(log, index) in logs" :key="log.timestamp" class="row log">
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
  props: {
    logs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      errors: [],
    }
  },
  watch: {
    logs() {
      this.checkResult()
    },
  },
  methods: {
    checkResult() {
      this.errors = this.logs.map(log => log.result.includes('RadonError'))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.logs-container {
  background-color: $black;
  height: 20vh;
  overflow-y: scroll;
  padding-top: 32px;
  width: 100%;

  .row {
    display: flex;
    justify-content: space-between;

    .column {
      align-items: center;
      display: flex;
      flex-direction: column;
      margin-left: 16px;
      min-width: 40px;
    }
  }

  .log {
    display: flex;
    margin-bottom: 8px;

    .time,
    .message {
      color: #c5c2c2;
      font-size: 14px;
      justify-content: flex-start;
      margin-right: 16px;
    }

    .error {
      background-color: $red-2;
      border: 2px solid $red-2;
      border-radius: 2px;
      color: $white;
      font-size: 10px;
      height: min-content;
      margin-right: 8px;
      padding: 2px 4px;
    }

    .info {
      background-color: $purple-4;
      border: 1px solid $purple-4;
      border-radius: 2px;
      color: $white;
      font-size: 10px;
      height: min-content;
      margin-right: 8px;
      padding: 2px 4px;
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
