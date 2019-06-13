<template>
  <div :class="active ? 'spinner': ''" />
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    active: Boolean,
  },
}
</script>

<style scoped lang="scss">
  @import '@/styles/_colors.scss';

  .spinner {
    animation: spin 1s infinite linear;
    border: 2px dotted $grey-5;
    border-radius: 100%;
    border-top: 3px solid $purple-6;
    height: 80px;
    width: 80px;
    z-index: 1;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

</style>
