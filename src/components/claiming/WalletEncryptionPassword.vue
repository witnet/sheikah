<template>
  <NavigationCard
    ref="navCard"
    data-test="password"
    class="wallet-encryption"
    title="Encrypt your wallet with a password"
    previousText="Back"
    nextText="Continue"
    :previousStep="previousStep"
    :nextStep="nextStep"
    :disabledNextButton="disabledNextButton"
  >
    <p class="paragraph">
      <strong>PLEASE NOTE:</strong> this password encrypts your Witnet wallet only on this computer.
      This is not your backup and you cannot restore your wallet with this password. Your seed
      phrase is still your ultimate backup.
    </p>
    <div class="form-row password">
      <p>Create a password</p>
      <el-input
        v-model="password"
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
        <div v-if="createValidPasswordError" data-test="password-error-alert" class="error">
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
  computed: {
    ...mapState({
      mnemonics: state => state.wallet.mnemonics,
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
      this.clearError(this.createValidPasswordError.name)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.error {
  color: $red-1;
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

.label {
  color: $font-color-light;
  width: 100px;
}
</style>
