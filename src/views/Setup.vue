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
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  .alert {
    background-color: $orange-0;
    width: 400px;

    .title {
      color: $orange-2;
      font-size: 18px;
      font-weight: bold;
      padding-bottom: 16px;
    }

    .description {
      color: $orange-2;
      font-size: 16px;
    }

    .link-container {
      background-color: $white;
      font-size: 14px;
      margin-top: 16px;
      padding: 8px;

      .link {
        color: $alt-grey-5;
        line-height: 1.5;
      }
    }
  }
}
</style>
