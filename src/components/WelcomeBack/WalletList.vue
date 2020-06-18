<template>
  <Card class="wallet-list">
    <p class="text header">
      Unlock your wallet
    </p>
    <div class="list">
      <div class="row wallets">
        <Select v-model="currentWallet" type="big" :options="walletOptions" />
      </div>
      <div class="row" @keydown.enter.esc.prevent="unlock">
        <el-input
          v-model="password"
          v-focus
          class="big"
          data-test="password"
          placeholder="Please input password"
          show-password
          @keydown.enter.esc.prevent="unlock"
        />
        <p v-if="unlockWalletError" data-test="error-alert" class="error">
          Invalid password
        </p>
      </div>
      <div class="row" @keydown.enter.esc.prevent="unlock">
        <el-button
          ref="submit"
          class="big"
          data-test="unlock-wallet"
          type="primary"
          :disabled="disableButton"
          @click="unlock"
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
import { mapState, mapActions, mapMutations } from 'vuex'

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
  computed: {
    ...mapState({
      walletId: state => {
        return state.wallet.walletId
      },
      sessionId: state => state.wallet.sessionId,
      unlockWalletError: state => state.wallet.errors.unlockWallet,
      wallets: state => state.wallet.walletInfos,
    }),
    lastWalletOpen() {
      const savedIndex = localStorage.getItem('walletIndex')
      return savedIndex || 0
    },
    disableButton() {
      const passwordLength = this.password.split('').length
      if (!this.unlockWalletError && passwordLength >= 8) {
        return false
      } else {
        return true
      }
    },
    walletOptions() {
      return this.wallets.map((wallet, index) => {
        return {
          primaryText: `My personal Witnet Wallet #${index}`,
          value: wallet.id,
          img: `https://api.adorable.io/avatars/:${index}/`,
        }
      })
    },
  },
  watch: {
    wallets() {
      this.currentWallet = this.walletOptions[this.lastWalletOpen]
    },
    sessionId: function(newValue) {
      if (newValue) {
        this.updateView()
      }
    },
    password() {
      if (this.unlockWalletError) {
        this.clearError({ error: this.unlockWalletError.name })
      }
    },
  },
  mounted() {
    this.getWalletInfos()
  },
  methods: {
    ...mapActions({
      unlockWallet: 'unlockWallet',
      getWalletInfos: 'getWalletInfos',
    }),
    ...mapMutations({
      clearError: 'clearError',
    }),
    nextStep() {
      this.$router.push('/ftu/welcome')
    },
    unlock() {
      this.unlockWallet({
        walletId: this.currentWallet.value,
        password: this.password,
      })
      this.sent = true
    },
    updateView() {
      this.$router.push({ name: 'transactions', query: { id: this.sessionId } })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.wallet-list {
  min-width: 500px;

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
        margin-bottom: 0;
      }

      .error {
        color: $red-3;
        margin-top: 8px;
      }
    }

    .wallets {
      .wallet {
        margin-bottom: 16px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
