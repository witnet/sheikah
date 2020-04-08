<template>
  <NavigationCard
    class="wallet-encryption"
    title="Encrypt your wallet with a password"
    previousText="Back"
    nextText="Next"
    :previousStep="previousStep"
    :nextStep="nextStep"
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
        data-test="password-input"
        placeholder="Please input password"
        v-model="password"
        show-password
        @keydown.enter.native="goNextInput"
      ></el-input>
    </div>
    <div ref="confirm" class="form-row password">
      <p>Confirm your password</p>
      <el-input
        ref="password"
        @keydown.enter.native="nextStep"
        data-test="password-input"
        placeholder="Confirm password"
        v-model="repeatPassword"
        show-password
      ></el-input>
    </div>

    <p data-test="password-error-alert" v-if="createValidPasswordError" class="error">
      {{ createValidPasswordError.message }}
    </p>
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
    }
  },
  methods: {
    validateForm() {
      this.$store.commit('validatePassword', {
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
          this.clearError(this.createValidPasswordError.name)
        }
        const words = this.mnemonics || this.seed.result
        this.$store.dispatch('createWallet', {
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
    clearError(errorName) {
      this.$store.commit('clearError', { error: errorName })
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
      this.clearError(this.createValidPasswordError.name)
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.error {
  color: $red-1;
}

.paragraph {
  margin-bottom: 32px;
  .bold {
    font-weight: 700;
  }
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
    flex-flow: row wrap;
    justify-content: center;
  }
  &:last-of-type {
    margin-bottom: 0px;
  }
}

.label {
  color: $font-color-light;
  width: 100px;
}

.password-input {
  width: 50%;
}
</style>
