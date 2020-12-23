<template>
  <div data-test="welcome-back" class="welcome-back">
    <div class="bar">
      <img class="row sheikah-icon" src="@/resources/svg/sheikah-icon.svg" />
      <p v-if="walletInfos && walletInfos.length" class="row title">{{
        this.$t('welcome_back')
      }}</p>
      <p v-else class="row title">{{ this.$t('welcome') }}</p>
      <p class="row subtitle">
        {{ this.$t('sheikah_description') }}
      </p>
      <div class="icon-container" @click="$router.push('/settings/general')">
        <font-awesome-icon icon="cog" class="icon" />
      </div>
    </div>
    <WalletSeedTypeSelection />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import WalletSeedTypeSelection from '@/components/steps/WalletSeedTypeSelection'

export default {
  name: 'Welcome',
  components: {
    WalletSeedTypeSelection,
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
  async created() {
    await this.getWalletInfos()
  },
  methods: {
    ...mapActions({
      getWalletInfos: 'getWalletInfos',
    }),
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

    .icon {
      color: $alt-grey-5;
      cursor: pointer;
      font-size: 20px;
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
