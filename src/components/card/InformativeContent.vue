<template>
  <div>
    <p class="subtitle">
      {{ subtitle }}
    </p>
    <div class="text-container">
      <p class="text" v-for="text in texts" :key="text">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformativeContent',
  props: {
    subtitle: String,
    texts: Object,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
.subtitle {
  color: $font-color-dark;
  padding-bottom: 24px;
}
.text-container {
  overflow-y: auto;
  .text {
    padding-bottom: 8px;
    color: $font-color-light;
    &:last-of-type {
      padding-bottom: 0px;
    }
  }
}
.router-link {
  text-decoration: none;
}
</style>
