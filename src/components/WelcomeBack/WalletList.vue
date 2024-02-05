<template>
  <Card class="wallet-list">
    <p class="text header">
      {{ $t('unlock_wallet') }}
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
          :placeholder="$t('input_password')"
          show-password
          @keydown.enter.esc.prevent="unlock"
        />
        <p v-if="unlockWalletError" data-test="error-alert" class="error">
          {{ $t('invalid_password') }}
        </p>
      </div>
      <div class="row" @keydown.enter.esc.prevent="unlock">
        <el-button
          ref="submit"
          class="big capitalize"
          data-test="unlock-wallet"
          type="primary"
          :disabled="disableButton"
          @click="unlock"
        >
          {{ $t('unlock') }}
        </el-button>
      </div>
      <div class="row">
        <el-link data-test="create-wallet" @click="nextStep">
          {{ $t('create_wallet') }}
          ></el-link
        >
      </div>
    </div>
  </Card>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Select from '@/components/Select.vue'
import Card from '@/components/card/Card.vue'

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
      localStorage: state => state.wallet.localStorage,
    }),
    getWalletIndex() {
      return this.localStorage.getWalletIndex()
    },
    lastWalletOpen() {
      return this.getWalletIndex || 0
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
      return this.wallets.map(wallet => {
        return {
          primaryText: wallet.name,
          value: wallet.id,
          img: wallet.image,
        }
      })
    },
  },
  watch: {
    sessionId: function (newValue) {
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
    this.currentWallet = this.walletOptions[this.lastWalletOpen]
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
        color: $red-2;
        font-size: 14px;
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
