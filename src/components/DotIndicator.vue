<template>
  <img :class="setStatus(status)" :src="url" alt="avatar" />
</template>

<script>
export default {
  name: 'DotIndicator',
  props: {
    status: String,
    url: String,
  },
  methods: {
    setStatus(status) {
      if (status === 'synced') {
        return 'synced'
      } else if (status === 'syncing') {
        return 'syncing'
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
  width: 30px;
  border: 2px solid $green-5;
  border-radius: 4px;
}

.syncing {
  width: 30px;
  border: 2px solid $yellow-4;
  border-radius: 4px;
}

.error {
  width: 30px;
  border: 2px solid $red-5;
  border-radius: 4px;
}
</style>
