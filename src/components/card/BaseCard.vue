<template>
  <div class="card-layout">
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
}
</script>

<style lang="scss" scoped>
.card-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
}
</style>
