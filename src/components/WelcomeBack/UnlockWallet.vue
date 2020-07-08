<template>
  <div class="unlock-wallet">
    <p class="text">Insert a password to unlock wallet</p>
    <div @keydown.enter.esc.prevent="unlock">
      <el-input
        v-model="password"
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
    <div class="container-btn">
      <el-button class="back-btn" type="text" @click="previousStep">
        Back
      </el-button>
      <div class="unlock-btn" @keydown.enter.esc.prevent="unlock">
        <el-button
          ref="submit"
          data-test="unlock-wallet"
          type="primary"
          @click="unlock"
        >
          Unlock
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UnlockWallet',
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
  },
  methods: {
    ...mapActions({
      unlockWallet: 'unlockWallet',
    }),
    previousStep() {
      this.$router.push('/welcome-back/wallet-list')
    },
    unlock() {
      this.unlockWallet({
        walletId: this.$route.params.id,
        password: this.password,
      })
      this.sent = true
    },
    updateView() {
      this.$router.push('/wallet/transactions')
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.unlock-wallet {
  display: flex;
  flex-direction: column;
  height: 300px;

  * {
    flex: 1 10px;
    margin: 32px;
    width: 300px;
  }

  .password-input {
    border: none;
    border-bottom: 1px solid rgb(92, 91, 91);
    color: $black;
    font-size: 16px;
    margin-bottom: 8px;
    padding: 8px;

    &:focus,
    &:hover {
      box-shadow: 0 1px 0 0 rgba(114, 113, 113, 0.75);
      outline: none;
    }

    &::placeholder {
      font-size: 16px;
    }
  }

  .error {
    color: $red-2;
    padding-top: 16px;
    position: absolute;
  }

  .text {
    font-size: 16px;
    margin-bottom: 32px;
  }

  .container-btn {
    text-align: right;

    .back-btn {
      margin-right: 8px;
    }

    .unlock-btn {
      display: inline;
      margin-left: 8px;
    }
  }
}
</style>
