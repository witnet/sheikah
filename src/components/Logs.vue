<template>
  <div class="logs-container">
    <div v-for="log in results" :key="log.timestamp" class="log">
      <p class="time">{{ log.timestamp }}</p>
      <p class="message">{{ log.result }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logs',
  props: {
    logs: Array,
  },
  computed: {
    results() {
      return this.logs
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.logs-container {
  width: 100%;
  height: 20vh;
  padding-top: 32px;
  overflow-y: scroll;
  background-color: $black;
  .log {
    padding-left: 50px;
    display: flex;

    .time,
    .message {
      color: lightcoral;
    }

    .time {
      margin-right: 8px;
    }
  }
  & :hover {
    background-color: $grey-7;
  }
}
</style>
