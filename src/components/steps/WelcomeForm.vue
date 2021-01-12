<template>
  <div data-test="welcome-back" class="welcome-back">
    <div class="bar">
      <CustomIcon class-name="row sheikah-icon" name="sheikah-icon" />
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
    <Version />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CustomIcon from '@/components/CustomIcon'
import WalletSeedTypeSelection from '@/components/steps/WalletSeedTypeSelection'
import Version from '@/components/Version'

export default {
  name: 'Welcome',
  components: {
    WalletSeedTypeSelection,
    CustomIcon,
    Version,
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
  background-color: var(--app-background-color);
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  .bar {
    color: var(--text-medium-emphasis);
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
      color: var(--text-medium-emphasis);
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
