<template>
  <NavigationCard data-test="" title="Unlock wallet" :nextStep="unlockWallet" nextText="Unlock">
    <div class="text">Insert a password to unlock wallet</div>
    <div class="unlock-wallet">
      <div @keydown.enter.esc.prevent="unlockWallet">
        <el-input
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
      this.$router.push('/claiming/download-file')
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
  align-items: center;

  .password-input {
    border: none;
    border-bottom: 1px solid rgb(92, 91, 91);
    font-size: 16px;
    padding: 8px;
    margin-bottom: 8px;
    color: $black;

    &:focus,
    &:hover {
      outline: none;
      box-shadow: 0px 1px 0px 0px rgba(114, 113, 113, 0.75);
    }
    &::placeholder {
      font-size: 16px;
    }
  }
  .error {
    position: absolute;
    padding-top: 16px;
    color: $red-0;
  }
}
</style>
