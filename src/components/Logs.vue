<template>
  <div class="logs-container">
    <div class="log">
      Log
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logs',
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.logs-container {
  width: 100%;
  height: 20vh;
  overflow-y: scroll;
  background-color: $black;
  text-align: center;
  text-justify: center;
  .log {
    color: red;
    padding-left: 50px;
    display: block;
    display: flex;
    justify-items: left;
  }
}
</style>
