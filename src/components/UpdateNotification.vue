<template>
  <div class="notification">
    <p class="text"
      >There is an available update. A new Sheikah version is being downloaded.
      This may take several minutes.</p
    >
  </div>
</template>

<script>
export default {
  name: 'UpdateNotification',
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.notification {
  background-color: $alt-grey-5;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding: 16px 16px;
  position: fixed;
  width: 100%;
  z-index: 20;

  .text {
    color: $white;
    font-size: 14px;
    margin-right: 16px;
  }
}
</style>
