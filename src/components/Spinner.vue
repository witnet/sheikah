<template>
  <div :class="{ spinner: active }" />
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
  border: var(--spinner-border);
  border-radius: 100%;
  border-top: var(--spinner-border-active);
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
