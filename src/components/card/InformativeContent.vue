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
<<<<<<< Updated upstream

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
=======
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
>>>>>>> Stashed changes
  }
}
.router-link {
  text-decoration: none;
}
</style>
