<template>
  <p class="info">
    <span data-test="index">{{ index + 1 }}.</span>
    <span class="description" data-test="description">{{ info }}</span>
  </p>
</template>

<script>
export default {
  name: 'ScriptInfo',
  props: {
    info: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.info {
  background-color: var(--script-operators-info-background);
  color: var(--text-medium-emphasis);
  display: grid;
  font-size: 13px;
  grid-template-columns: max-content 255px;
  opacity: 0.8;
  overflow-wrap: break-word;
  padding: 16px;

  .description {
    margin-left: 16px;
  }
}
</style>
