<template>
  <p class="version">{{ version }}</p>
</template>

<script>
export default {
  name: 'Version',
  computed: {
    version() {
      // eslint-disable-next-line no-undef
      return `v${__APP_VERSION__ || 0}`
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.version {
  bottom: 8px;
  color: var(--version-color);
  font-family: 'Roboto Mono';
  font-size: 12px;
  font-weight: medium;
  position: fixed;
  right: 16px;
}
</style>
