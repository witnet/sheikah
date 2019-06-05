<template>
  <div class="card">
    <div v-if="title" class="title">
      {{ title }}
    </div>
    <div class="simple">
      <slot>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'baseCard',
  props: {
    title: String,
  },
}
</script>
<style lang="scss">
  @import '@/styles/_colors.scss';
  @import '@/styles/theme.scss';

  .card {
    max-width: 60%;
  }

  .simple {
    box-shadow: $default-box-shadow;
  }

  .title {
    padding: $card-default-padding;
    border-bottom: solid 1px $grey-4;
  }

</style>
