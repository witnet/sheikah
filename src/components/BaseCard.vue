<template>
<div class="card">
  <div v-if="title" class='title'>
    <p class='card-title'>{{ title }}</p>
  </div>
  <div class='content'>
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    title: String,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.card {
  .title {
    font-size: 16px;
    font-weight: 600;
    color: $grey-8;
    margin-bottom: 8px;
  }

  .content {
    border: 1px solid #EEE;
    border-radius: 2px;
    box-shadow: $default-box-shadow;
    font-size: 16px;
    padding: 32px;
  }
}
</style>
