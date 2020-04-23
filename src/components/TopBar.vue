<template>
  <div class="top-bar">
    <slot name="tool"></slot>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    tabs: Array,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.top-bar {
  width: 100%;
  border-bottom: 1px solid $grey-1;
  display: flex;
  flex-flow: row wrap;
  height: 70px;
  justify-content: flex-end;
  padding-left: 24px;
  .tabs {
    display: flex;
    justify-content: flex-start;
    .link {
      color: $alt-grey-1;
      font-weight: bold;
      height: 70px;
      line-height: 25px;
      padding: 16px 24px;
      text-decoration: none;
      &.router-link-active {
        border-bottom: 2px solid $purple-4;
        color: $purple-4;
      }
    }
  }
}
</style>
