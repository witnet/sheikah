<template>
  <div class="wallet-list">
    <p class="text">
      Select which wallet do you want to unlock
    </p>
    <ul class="list">
      <div class="wallets">
        <li v-for="wallet in wallets" :key="wallet.id">
          <router-link class="link" :to="`/welcome-back/unlock/${wallet.id}`">
            <Button class="option">
              {{ wallet.name }}
              <font-awesome-icon icon="angle-right" />
            </Button>
          </router-link>
        </li>
      </div>
      <li>
        <router-link class="link" to="/ftu/welcome">
          <Button class="option">
            Create import or recover a wallet
            <font-awesome-icon icon="angle-right" />
          </Button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'WalletList',
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
      overflow-y: scroll;
      height: 200px;
      margin-bottom: 24px;
    }

    .link {
      text-decoration: none;
    }

    .option {
      background: $white;
      border-radius: 3px;
      border: 1px solid $grey-0;
      color: $grey-5;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      height: 60px;
      justify-content: space-between;
      margin-bottom: 16px;
      padding: 0 24px;
      width: 100%;

      &:hover {
        border-color: $blue-6;
        color: $blue-6;
      }
    }
  }
}
</style>
