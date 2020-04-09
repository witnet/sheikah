<template>
  <div data-test="welcome-back" class="welcome-back">
    <div class="bar">
      <img class="row sheikah-icon" src="@/resources/svg/sheikah-icon.svg" />
      <p v-if="walletInfos.length" class="row title">Welcome back to Sheikah!</p>
      <p v-else class="row title">Welcome to Sheikah!</p>
      <p class="row subtitle">
        Sheikah keeps your Witnet wallet safe and helps you build, share and deploy data requests
        into the Witnet network.
      </p>
      <a target="_blank" class="row link" type="text">
        Discover more features >
      </a>
    </div>
    <WalletSeedTypeSelection />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WalletSeedTypeSelection from '@/components/steps/WalletSeedTypeSelection'

export default {
  name: 'Welcome',
  components: {
    WalletSeedTypeSelection,
  },
  created() {
    this.$store.dispatch('getWalletInfos')
  },
  computed: {
    ...mapState({
      status: state => state.wallet.networkStatus,
      walletInfos: state => state.wallet.walletInfos,
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
  background-color: $alpha-purple;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .bar {
    color: $alt-grey-5;
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin-right: 100px;
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
