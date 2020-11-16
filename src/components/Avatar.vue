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
    border: 2px solid $green-5;
  }

  &.red {
    border: 2px solid $red-3;
  }

  &.yellow {
    border: 2px solid $yellow-3;
  }
}
</style>
