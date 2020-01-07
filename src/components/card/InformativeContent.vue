<template>
  <div class="container">
    <p class="subtitle">
      {{ subtitle }}
    </p>
    <p class="text">
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'InformativeContent',
  props: {
    subtitle: String,
    text: String,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.subtitle {
  color: $font-color-dark;
}

.container {
  margin-top: 80px;
}

.text {
  color: $font-color-light;
  margin-top: 40px;
}

.router-link {
  text-decoration: none;
}
</style>
