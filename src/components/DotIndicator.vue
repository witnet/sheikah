<template>
  <font-awesome-icon :class="setStatus(status)" icon="circle" />
</template>

<script>
export default {
  name: 'DotIndicator',
  props: {
    status: String,
  },
  methods: {
    setStatus(status) {
      if (status === 'synced') {
        return 'synced'
      } else {
        return 'error'
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.synced {
  color: $green-1;
}

.error {
  color: $red-2;
}
</style>
