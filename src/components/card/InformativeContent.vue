<template>
  <div class="container">
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
}
.text-container {
  max-height: 200px;
  overflow-y: auto;
  margin-top: 40px;
  .text {
    padding-top: 16px;
    color: $font-color-light;
  }
}
.router-link {
  text-decoration: none;
}
</style>
