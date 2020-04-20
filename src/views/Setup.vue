<template>
  <div class="container">
    <Card class="setup">
      <div>
        <p>We are preparing Sheikah</p>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/card/Card.vue'

export default {
  name: 'WalletNotFound',
  components: { Card },
  methods: {},
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .alert {
    background-color: $orange-0;
    width: 400px;
    .title {
      color: $orange-1;
      font-weight: bold;
      font-size: 18px;
      padding-bottom: 16px;
    }
    .description {
      color: $orange-1;
      font-size: 16px;
    }
    .link-container {
      font-size: 14px;
      margin-top: 16px;
      padding: 8px;
      background-color: $white;
      .link {
        line-height: 1.5;
        color: $alt-grey-5;
      }
    }
  }
}
</style>
