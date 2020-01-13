<template>
  <div class="unlock-wallet">
    <p class="text">Insert a password to unlock wallet</p>
    <div @keydown.enter.esc.prevent="unlockWallet">
      <PasswordInput label="Password" v-model="password" />
    </div>
    <div class="container-btn">
      <Button class="back-btn" data-test="unlock-wallet" :onClick="previousStep" type="default">
        Back
      </Button>
      <div class="unlock-btn" @keydown.enter.esc.prevent="unlockWallet">
        <Button ref="submit" data-test="unlock-wallet" :onClick="unlockWallet" type="primary">
          Unlock
        </Button>
      </div>
    </div>
    <p v-if="showError">Invalid password</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Button from '@/components/Button'
import PasswordInput from '@/components/PasswordInput'

export default {
  name: 'UnlockWallet',
  data() {
    return {
      password: '',
      showError: false,
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
      this.showError = false
      this.$router.push('/wallet/transactions')
    },
  },
  computed: {
    ...mapState({
      walletId: state => {
        return state.wallet.walletId
      },
      sessionId: state => state.wallet.sessionId,
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
    Button,
    PasswordInput,
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.unlock-wallet {
  height: 300px;
  display: flex;
  flex-direction: column;

  & > * {
    flex: 1 10px;
    margin: 32px;
    width: 300px;
  }
  .password-input {
    border: none;
    border-bottom: 1px solid rgb(92, 91, 91);
    font-size: 16px;
    padding: 8px;
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
  .text {
    margin-bottom: 32px;
    font-size: 16px;
  }
  .container-btn {
    text-align: right;
    .back-btn {
      margin-right: 8px;
    }
    .unlock-btn {
      display: inline;
    }
  }
}
</style>
