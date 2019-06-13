<template>
  <BaseCard class="welcome-card" previousText="Back" nextText="Start">
    <div class='welcome-title-container'>
      <h5 class='welcome-title'>Hey Listen!</h5>
    </div>
    <div class="content">
      <p class="subtitle">
        This assistant will guide you through the process of creating your own Witnet wallet.
      </p>
      <p class="text-welcome">
        A wallet is an app that keeps your credentials safe and lets you interface with the
        Witnet blockchain in many ways: from transferring Wit to someone else to creating
        smart contracts.
      </p>
      <div class="container">
        <router-link class="router-link" to="/ftu/seed-type-selection">Let's do it</router-link>
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard'

export default {
  name: 'WelcomeForm',
  components: {
    BaseCard,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.welcome-card {
  height: 450px;
}

.welcome-title-container {
  align-items: center;
  background: $sheikah-gradient;
  border-bottom: solid 1px $grey-4;
  color: $grey-2;
  display: flex;
  flex-flow: row nowrap;
  font-size: $loading-modal-title-font-size;
  font-size: 19px;
  font-weight: 100;
  height: 100px;
}

.welcome-title {
  margin-left: 38px;
}

.content {
  padding: 40px;
}

.subtitle {
  color: $font-color-dark;
}

.container {
  margin-top: 80px;
}

.text-welcome {
  color: $font-color-light;
  margin-top: 40px;
}

.router-link {
  text-decoration: none;
}
</style>
