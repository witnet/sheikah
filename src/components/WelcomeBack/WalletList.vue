<template>
  <Card class="wallet-list">
    <p class="text header">
      Unlock your wallet
    </p>
    <div class="list">
      <div class="row wallets">
        <Select v-model="currentWallet" :options="walletOptions" />
      </div>
      <div class="row" @keydown.enter.esc.prevent="unlockWallet">
        <el-input
          @keydown.enter.esc.prevent="unlockWallet"
          class="big"
          data-test="password-input"
          placeholder="Please input password"
          v-model="password"
          show-password
        />
      </div>
      <div class="row" @keydown.enter.esc.prevent="unlockWallet">
        <el-button
          class="big"
          ref="submit"
          data-test="unlock-wallet"
          @click="unlockWallet"
          type="primary"
        >
          Unlock
        </el-button>
      </div>
      <div class="row">
        <el-button data-test="create-wallet" type="text" @click="nextStep">
          Create import or recover a wallet ></el-button
        >
      </div>
    </div>
  </Card>
</template>

<script>
import Select from '@/components/Select'
import Card from '@/components/card/Card'
import { mapState } from 'vuex'

export default {
  name: 'WalletList',
  components: {
    Select,
    Card,
  },
  data() {
    return {
      currentWallet: {},
      password: '',
    }
  },
  created() {
    this.currentWallet = this.walletOptions[0]
  },
  methods: {
    nextStep() {
      this.$router.push('/ftu/welcome')
    },
    unlockWallet() {
      this.$store.dispatch('unlockWallet', {
        walletId: this.currentWallet.value,
        password: this.password,
      })
      this.sent = true
    },
    updateView() {
      this.$router.push('/wallet/transactions')
    },
  },
  watch: {
    sessionId: function(newValue) {
      if (newValue) {
        this.updateView()
      }
    },
    password() {
      if (this.unlockWalletError) {
        this.$store.commit('clearError', { error: this.unlockWalletError.name })
      }
    },
  },
  computed: {
    ...mapState({
      walletId: state => {
        return state.wallet.walletId
      },
      sessionId: state => state.wallet.sessionId,
      unlockWalletError: state => state.wallet.errors.unlockWallet,
    }),
    wallets() {
      return this.$store.state.wallet.walletInfos
    },
    walletOptions() {
      return this.wallets.map((wallet, index) => {
        return {
          primaryText: `My personal Witnet Wallet #${index}`,
          value: wallet.id,
          img: require('@/resources/svg/wallet-icon.svg'),
        }
      })
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
    &.header {
      font-size: 20px;
    }
  }

  .list {
    .row {
      margin-bottom: 16px;
      &:last-of-type {
        margin-bottom: 0px;
      }
    }
    .wallets {
      // overflow-y: auto;
      // height: 200px;
      margin-bottom: 24px;
      .wallet {
        margin-bottom: 16px;
        &:last-of-type {
          margin-bottom: 0px;
        }
      }
      .el-input {
        .el-input__inner {
          height: 60px;
        }
      }
    }
  }
}
</style>
