<template>
  <div data-test="welcome-back" class="welcome-back">
    <div class="bar">
      <img class="row sheikah-icon" src="@/resources/svg/sheikah-icon.svg" />
      <p class="row title">Welcome back to Sheikah!</p>
      <p class="row subtitle">
        Sheikah keeps your Witnet wallet safe and helps you build, share and
        deploy data requests into the Witnet network.
      </p>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WelcomeBack',
  computed: {
    ...mapState({
      status: state => state.wallet.networkStatus,
    }),
  },
  watch: {
    status(status) {
      if (status === 'error') {
        this.$router.push('/wallet-not-found')
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.welcome-back {
  align-items: center;
  background-color: $alpha-purple;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  .bar {
    color: $alt-grey-5;
    display: flex;
    flex-direction: column;
    margin-right: 100px;
    padding: 20px;
    width: 400px;

    .row {
      margin-bottom: 24px;
      text-align: left;
    }

    .title {
      font-family: 'Raleway', sans-serif;
      font-size: 48px;
      font-weight: bold;
      line-height: inherit;
    }

    .sheikah-icon {
      width: 70px;
    }
  }
}
</style>
