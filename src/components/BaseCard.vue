<template>
  <div class='card'>
    <div v-if="title" class='title'>
      <h5 class='card-title'>{{ title }}</h5>
    </div>
    <slot></slot>
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

<style lang='scss'>
  @import '@/styles/_colors.scss';
  @import '@/styles/theme.scss';

  .card {
    border: 1px solid #EEE;
    border-radius: 2px;
    box-shadow: $default-box-shadow;
    height: 550px;
    width: 600px;
    font-size: 16px;
  }

  .title {
    border-bottom: solid 1px $grey-4;
  }

</style>
