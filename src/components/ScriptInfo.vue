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
  background-color: $yellow-0;
  opacity: 40%;
  padding: 16px;
  display: grid;
  grid-template-columns: max-content auto;
  color: $grey-4;
  font-size: 13px;
  .description {
    margin-left: 16px;
  }
}
</style>
