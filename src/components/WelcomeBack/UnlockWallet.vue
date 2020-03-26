<template>
  <div class="unlock-wallet">
    <p class="text">Insert a password to unlock wallet</p>
    <div @keydown.enter.esc.prevent="unlockWallet">
      <el-input
        class="input"
        data-test="password-input"
        placeholder="Please input password"
        v-model="password"
        show-password
      />
      <p data-test="password-error-alert" v-if="unlockWalletError" class="error">
        Invalid password
      </p>
    </div>
    <div class="container-btn">
      <el-button class="back-btn" type="text" data-test="unlock-wallet" @click="previousStep">
        Back
      </el-button>
      <div class="unlock-btn" @keydown.enter.esc.prevent="unlockWallet">
        <el-button ref="submit" data-test="unlock-wallet" @click="unlockWallet" type="primary">
          Unlock
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UnlockWallet',
  data() {
    return {
      password: '',
      sent: false,
    }
  },
  methods: {
    previousStep() {
      this.$router.push('/welcome-back/wallet-list')
    },
    unlockWallet() {
      this.$store.dispatch('unlockWallet', {
        walletId: this.$route.params.id,
        password: this.password,
      })
      this.sent = true
    },
    updateView() {
      this.$router.push('/wallet/transactions')
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
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.text {
  margin-bottom: 32px;
  font-size: 16px;
}
.unlock-wallet {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

  .input {
    width: 100%;
  }
  .error {
    position: absolute;
    padding-top: 16px;
    color: $red-0;
  }
}
</style>
