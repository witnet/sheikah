<template>
  <NavigationCard
    ref="navCard"
    class="wallet-encryption"
    title="Encrypt your wallet with a password"
    previousText="Back"
    nextText="Next"
    :previousStep="previousStep"
    :nextStep="nextStep"
    :disabledNextButton="disabledNextButton"
  >
    <p class="paragraph">
      <strong class="bold">PLEASE NOTE:</strong> this password encrypts your
      Witnet wallet only on this computer. This is not your backup and you
      cannot restore your wallet with this password. Your seed phrase is still
      your ultimate backup.
    </p>
    <div class="form-row password">
      <p>Create a password</p>
      <el-input
        v-model="password"
        v-focus
        class="password"
        data-test="password-input"
        placeholder="Please input password"
        show-password
      />
    </div>
    <div ref="confirm" class="form-row password">
      <p>Confirm your password</p>
      <div class="col">
        <el-input
          ref="password"
          v-model="repeatPassword"
          class="password"
          data-test="password-input"
          placeholder="Confirm password"
          show-password
          @keydown.enter.native="nextStep"
        />
        <div
          v-if="createValidPasswordError"
          data-test="password-error-alert"
          class="error"
        >
          {{ createValidPasswordError.message }}
        </div>
      </div>
    </div>
  </NavigationCard>
</template>

<script>
import { mapState } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'WalletEncryptionPassword',
  components: {
    NavigationCard,
  },
  data() {
    return {
      password: '',
      repeatPassword: '',
      error: false,
      disabledNextButton: true,
    }
  },
  computed: {
    ...mapState({
      mnemonics: state => state.wallet.mnemonics,
      createWalletError: state => state.wallet.errors.createWallet,
      createValidPasswordError: state =>
        state.wallet.errors.createValidPassword,
      validatedPassword: state => state.wallet.validatedPassword,
    }),
  },
  watch: {
    password() {
      if (this.createValidPasswordError) {
        this.clearError(this.createValidPasswordError.name)
      }
      if (this.password && this.repeatPassword) {
        this.disabledNextButton = false
      } else {
        this.disabledNextButton = true
      }
    },
    createValidPasswordError(error) {
      if (error) {
        this.disabledNextButton = true
      }
    },
    repeatPassword() {
      if (this.createValidPasswordError) {
        this.clearError(this.createValidPasswordError.name)
      }
      if (this.password && this.repeatPassword) {
        this.disabledNextButton = false
      } else {
        this.disabledNextButton = true
      }
    },
  },
  beforeDestroy() {
    if (this.createValidPasswordError) {
      this.clearError(this.createValidPasswordError.name)
    }
  },
  methods: {
    validateForm() {
      this.$store.commit('validatePassword', {
        password: this.password,
        repeatPassword: this.repeatPassword,
      })
    },
    nextStep() {
      this.validateForm()
      if (this.validatedPassword) {
        if (this.createValidPasswordError) {
          this.clearError(this.createValidPasswordError.name)
        }
        this.$store.dispatch('createWallet', {
          sourceType: 'mnemonics',
          password: this.password,
          mnemonics: this.mnemonics,
        })
        this.$router.push('/claiming/loading')
      }
    },
    previousStep() {
      this.$router.push('/claiming/seed-validation')
    },
    clearError(errorName) {
      this.$store.commit('clearError', { error: errorName })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.error {
  color: $red-2;
  font-size: 14px;
  margin-top: 16px;
  min-width: 270px;
}

.paragraph {
  margin-bottom: 32px;
}

.bold {
  font-weight: bold;
}

.form-row {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 32px;
  max-width: 500px;

  &.password {
    display: flex;
    justify-content: space-between;
    max-width: none;
  }

  &.form-row:last-of-type {
    margin: 0;
  }

  .password {
    width: 350px;
  }
}

.label {
  color: $font-color-light;
  width: 100px;
}
</style>
