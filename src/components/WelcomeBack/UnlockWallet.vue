<template>
  <div class="unlock-wallet">
    <p class="text">{{ $t('insert_password') }}</p>
    <div @keydown.enter.esc.prevent="unlock">
      <el-input
        v-model="password"
        data-test="password-input"
        :placeholder="$t('input_password')"
        show-password
      />
      <p
        v-if="unlockWalletError"
        data-test="password-error-alert"
        class="error"
      >
        {{ $t('invalid_password') }}
      </p>
    </div>
    <div class="container-btn">
      <el-link
        class="back-btn capitalize"
        data-test="unlock-wallet"
        @click="previousStep"
      >
        {{ $t('back') }}
      </el-link>
      <div class="unlock-btn" @keydown.enter.esc.prevent="unlock">
        <el-button
          ref="submit"
          class="capitalize"
          data-test="unlock-wallet"
          type="primary"
          @click="unlock"
        >
          {{ $t('unlock') }}
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
    sessionId: function (newValue) {
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
    border-bottom: 1px solid rgb(92 91 91);
    color: $black;
    font-size: 16px;
    margin-bottom: 8px;
    padding: 8px;

    &:focus,
    &:hover {
      box-shadow: 0 1px 0 0 rgb(114 113 113 / 75%);
      outline: none;
    }

    &::placeholder {
      font-size: 16px;
    }
  }

  .error {
    color: $red-2;
    font-size: 14px;
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
