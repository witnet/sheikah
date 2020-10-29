<template>
  <img :class="['status', statusClass]" :src="url" alt="avatar" />
</template>

<script>
export default {
  name: 'DotIndicator',
  props: {
    synced: Boolean,
    error: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: '',
    },
  },
  computed: {
    statusClass() {
      if (this.error) {
        return 'error'
      } else if (this.synced) {
        return 'synced'
      } else {
        return 'syncing'
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.status {
  border-radius: 4px;
  width: 30px;
}

.synced {
  border: 2px solid $green-5;
}

.error {
  border: 2px solid $red-3;
}

.syncing {
  border: 2px solid $yellow-4;
}
</style>
