<template>
  <div>
    <p class="subtitle">
      {{ subtitle }}
    </p>
    <div class="text-container">
      <p v-for="text in texts" :key="text" class="text">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformativeContent',
  props: {
    subtitle: {
      type: String,
      default: '',
    },
    texts: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.subtitle {
  color: var(--text-medium-emphasis);
  padding-bottom: 24px;
}

.text-container {
  overflow-y: auto;

  .text {
    color: var(--text-low-emphasis);
    padding-bottom: 8px;

    &:last-of-type {
      padding-bottom: 0;
    }
  }
}
</style>
