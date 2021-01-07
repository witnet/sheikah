<template>
  <img :class="['status', borderColor]" :src="src" alt="avatar" />
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    borderColor: {
      type: String,
      default: '',
      validator(value) {
        return value ? ['red', 'yellow', 'green'].includes(value) : true
      },
    },
    src: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.status {
  border-radius: 4px;
  width: 30px;

  &.green {
    border: var(--network-status-border-synced);
  }

  &.red {
    border: var(--network-status-border-error);
  }

  &.yellow {
    border: var(--network-status-border-syncing);
  }
}
</style>
