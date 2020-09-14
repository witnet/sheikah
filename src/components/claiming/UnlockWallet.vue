<template>
  <NavigationCard
    data-test=""
    title="Unlock wallet"
    :next-step="unlockWallet"
    next-text="Unlock"
    :disabled-next-button="false"
  >
    <div class="unlock-wallet">
      <div class="text">Insert a password to unlock wallet</div>
      <div @keydown.enter.esc.prevent="unlockWallet">
        <el-input
          v-model="password"
          class="input"
          data-test="password-input"
          placeholder="Please input password"
          show-password
        />
        <p
          v-if="unlockWalletError"
          data-test="password-error-alert"
          class="error"
        >
          Invalid password
        </p>
      </div>
    </div>
  </NavigationCard>
</template>

<script>
import { mapState } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'UnlockWallet',
  components: {
    NavigationCard,
  },
  data() {
    return {
      password: '',
      sent: false,
    }
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
  methods: {
    unlockWallet() {
      this.$store.dispatch('unlockWallet', {
        walletId: this.$route.params.id,
        password: this.password,
      })
      this.sent = true
    },
    updateView() {
      this.$router.push('/claiming/countdown')
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.text {
  font-size: 16px;
  margin-bottom: 32px;
}

.unlock-wallet {
  align-items: left;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .input {
    width: 100%;
  }

  .error {
    color: $red-2;
    padding-top: 16px;
    position: absolute;
  }
}
</style>
