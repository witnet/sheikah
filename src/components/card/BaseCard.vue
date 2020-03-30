<template>
  <div class="card-layout">
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="alt-footer" />
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
}
</style>
