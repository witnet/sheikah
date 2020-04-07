<template>
  <div class="wallet-list">
    <p class="text">
      Select which wallet do you want to unlock
    </p>
    <ul class="list">
      <div class="wallets">
        <li class="wallet" v-for="wallet in wallets" :key="wallet.id">
          <RedirectionOption
            type="forward"
            :link="`/welcome-back/unlock/${wallet.id}`"
            :name="wallet.name || wallet.id.trim()"
          />
        </li>
      </div>
      <li>
        <RedirectionOption
          data-test="create-wallet"
          type="forward"
          link="/ftu/welcome"
          name="Create import or recover a wallet"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import RedirectionOption from '@/components/RedirectionOption'

export default {
  name: 'WalletList',
  components: {
    RedirectionOption,
  },
  computed: {
    wallets() {
      return this.$store.state.wallet.walletInfos
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.wallet-list {
  .text {
    margin-bottom: 32px;
  }

  .list {
    height: 240px;

    .wallets {
      overflow-y: auto;
      height: 200px;
      margin-bottom: 24px;
      .wallet {
        margin-bottom: 16px;
        &:last-of-type {
          margin-bottom: 0px;
        }
      }
    }
  }
}
</style>
