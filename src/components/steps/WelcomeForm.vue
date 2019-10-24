<template>
  <Card class="welcome-card" :width="600" :height="440" previousText="Back" nextText="Start">
    <template v-slot:header>
      <div class="header">
        Ey, listen!
      </div>
    </template>

    <p class="subtitle">
      This assistant will guide you through the process of creating your own Witnet wallet.
    </p>
    <p class="text-welcome">
      A wallet is an app that keeps your credentials safe and lets you interface with the Witnet
      blockchain in many ways: from transferring Wit to someone else to creating smart contracts.
    </p>
    <div class="container">
      <router-link data-test="do-it" class="router-link" to="/ftu/seed-type-selection">Let's do it</router-link>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/card/Card'

export default {
  name: 'WelcomeForm',
  components: {
    Card,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.welcome-card {
  .header {
    align-items: center;
    background: $sheikah-gradient;
    display: flex;
    font-size: 24px;
    font-weight: 100;
    height: 100px;
    padding: 0 24px;
    color: $grey-0;
  }

  .subtitle {
    color: $font-color-dark;
  }

  .container {
    margin-top: 80px;
    text-align: right;
  }

  .text-welcome {
    color: $font-color-light;
    margin-top: 40px;
  }

  .router-link {
    text-decoration: none;
  }
}
</style>
