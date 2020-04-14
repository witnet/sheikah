<template>
  <NavigationCard
    class="wallet-encryption"
    title="Encrypt your wallet with a password"
    previousText="Back"
    nextText="Next"
    :previousStep="previousStep"
    :nextStep="nextStep"
    :disabledNextButton="disabledNextButton"
    ref="navCard"
  >
    <p class="paragraph">
      <span class="bold"> PLEASE NOTE: </span> this password encrypts your Witnet wallet only on
      this computer. This is not your backup and you cannot restore your wallet with this password.
      Your seed phrase is still your ultimate backup.
    </p>
    <div class="form-row password">
      <p>Create a password</p>
      <el-input
        class="password"
        data-test="password"
        placeholder="Please input password"
        v-model="password"
        show-password
      />
    </div>
    <div ref="confirm" class="form-row password">
      <p>Confirm your password</p>
      <div class="col">
        <el-input
          class="password"
          ref="password"
          @keydown.enter.native="nextStep"
          data-test="password"
          placeholder="Confirm password"
          v-model="repeatPassword"
          show-password
        />
        <div data-test="password-error-alert" v-if="createValidPasswordError" class="error">
          {{ createValidPasswordError.message }}
        </div>
      </div>
    </div>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'WalletEncryptionPassword',
  data() {
    return {
      password: '',
      repeatPassword: '',
      error: false,
      disabledNextButton: true,
    }
  },
  watch: {
    password() {
      if (this.createValidPasswordError) {
        this.clearError({ error: this.createValidPasswordError.name })
      }
      const passwordLength = this.password.split('').length
      const repeatedPasswordLength = this.repeatPassword.split('').length
      if (passwordLength >= 8 && repeatedPasswordLength >= 8) {
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
        this.clearError({ error: this.createValidPasswordError.name })
      }
      const passwordLength = this.password.split('').length
      const repeatedPasswordLength = this.repeatPassword.split('').length
      if (passwordLength >= 8 && repeatedPasswordLength >= 8) {
        this.disabledNextButton = false
      } else {
        this.disabledNextButton = true
      }
    },
  },
  methods: {
    ...mapMutations({
      validatePassword: 'validatePassword',
      clearError: 'clearError',
    }),
    ...mapActions({
      createWallet: 'createWallet',
    }),
    validateForm() {
      this.validatePassword({
        password: this.password,
        repeatPassword: this.repeatPassword,
      })
    },
    goNextInput() {
      this.$refs.password.focus()
    },
    nextStep() {
      this.validateForm()
      if (this.validatedPassword) {
        if (this.createValidPasswordError) {
          this.clearError({ error: this.createValidPasswordError.name })
        }
        const words = this.mnemonics || this.seed.result
        this.createWallet({
          sourceType: 'mnemonics',
          password: this.password,
          mnemonics: words,
        })
        this.$router.push('/ftu/create-wallet')
      }
    },
    previousStep() {
      if (this.mnemonics) {
        this.$router.push('/ftu/seed-validation')
      } else if (this.seed) {
        this.$router.push('/ftu/import-wallet')
      }
    },
  },
  computed: {
    ...mapState({
      mnemonics: state => state.wallet.mnemonics,
      seed: state => state.wallet.seed,
      createWalletError: state => state.wallet.errors.createWallet,
      createValidPasswordError: state => state.wallet.errors.createValidPassword,
      validatedPassword: state => state.wallet.validatedPassword,
    }),
  },
  components: {
    NavigationCard,
  },
  beforeDestroy() {
    if (this.createValidPasswordError) {
      this.clearError({ error: this.createValidPasswordError.name })
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.error {
  color: $red-2;
  font-size: 14px;
  min-width: 270px;
  margin-top: 16px;
}
.paragraph {
  margin-bottom: 32px;
}

.form-row {
  display: flex;
  max-width: 500px;
  flex-flow: row nowrap;
  margin-bottom: 32px;
  align-items: center;
  &.password {
    max-width: none;
    display: flex;
    justify-content: space-between;
  }
  &.form-row:last-of-type {
    margin: 0px;
  }
  .password {
    width: 350px;
  }
}
.bold {
  font-weight: bold;
}

.label {
  color: $font-color-light;
  width: 100px;
}
</style>
