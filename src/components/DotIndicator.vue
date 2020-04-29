<template>
  <img :class="['status', synced ? 'synced' : 'syncing']" :src="url" alt="avatar" />
</template>

<script>

export default {
  name: 'DotIndicator',
  props: {
    synced: Boolean,
    url: String,
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.status {
  width: 30px;
  border-radius: 4px;
}
.synced {
  border: 2px solid $green-5;
}
.syncing {
  border: 2px solid $yellow-4;
}
</style>
