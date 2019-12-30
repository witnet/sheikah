<template>
  <div class="wallet-list">
    <p class="text">
      Select which wallet do you want to unlock
    </p>
    <ul class="list">
      <div class="wallets">
        <li v-for="wallet in wallets" :key="wallet.id">
          <router-link class="link" :to="`/welcome-back/unlock/${wallet.id}`">
            <Button data-test="local-wallet" class="option">
              <p class="name">{{ wallet.name || wallet.id.trim() }}</p>
              <font-awesome-icon class="angle" icon="angle-right" />
            </Button>
          </router-link>
        </li>
      </div>
      <li>
        <router-link class="link" to="/ftu/welcome">
          <Button data-test="create-wallet" class="option">
            <p class="name">Create import or recover a wallet</p>
            <font-awesome-icon class="angle" icon="angle-right" />
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
      overflow-y: auto;
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
      &:focus,
      &:hover {
        outline: none;
        cursor: pointer;
        border-color: $blue-6;
        color: $blue-6;
      }

      .name {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding: 0 16px 0 0;
      }

      .angle {
        align-self: center;
      }
    }
  }
}
</style>
