<template>
  <Card class="wallet-list">
    <p class="text header">
      Unlock your wallet
    </p>
    <div class="list">
      <div class="row wallets">
        <Select v-model="currentWallet" :options="walletOptions" />
      </div>
      <div class="row" @keydown.enter.esc.prevent="unlock()">
        <el-input
          @keydown.enter.esc.prevent="unlock()"
          class="big"
          data-test="password"
          placeholder="Please input password"
          v-model="password"
          show-password
        />
        <p data-test="error-alert" v-if="unlockWalletError" class="error">
          Invalid password
        </p>
      </div>
      <div class="row" @keydown.enter.esc.prevent="unlock()">
        <el-button
          class="big"
          ref="submit"
          data-test="unlock-wallet"
          @click="unlock()"
          type="primary"
          :disabled="disableButton"
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
  created() {
    this.currentWallet = this.walletOptions[this.lastWalletOpen]
  },
  methods: {
    ...mapActions({
      unlockWallet: 'unlockWallet',
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
        this.clearError({ error: this.unlockWalletError.name })
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
        margin-bottom: 0px;
      }
      .error {
        margin-top: 8px;
        color: $red-3;
      }
    }
    .wallets {
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
