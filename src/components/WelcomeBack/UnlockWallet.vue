<template>
  <div class="unlock-wallet">
    <p class="text">Insert a password to unlock wallet</p>
    <div @keydown.enter.esc.prevent="unlockWallet">
      <PasswordInput
        data-test="password-input"
        label="Password"
        v-model="password"
        :error="'unlockWallet'"
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
import PasswordInput from '@/components/PasswordInput'

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
  },
  components: {
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
      margin-left: 8px;
      display: inline;
    }
  }
}
</style>
