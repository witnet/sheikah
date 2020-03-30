<template>
  <NavigationCard
    data-test=""
    title="Unlock wallet"
    :nextStep="unlockWallet"
    nextText="Unlock"
    :disabledNextButton="false"
  >
    <div class="unlock-wallet">
      <div class="text">Insert a password to unlock wallet</div>
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
    </div>
  </NavigationCard>
</template>

<script>
import { mapState } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'UnlockWallet',
  data() {
    return {
      password: '',
      sent: false,
    }
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
  components: {
    NavigationCard,
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
    color: $red-1;
  }
}
</style>
