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
      <strong>PLEASE NOTE:</strong> this password encrypts your Witnet wallet only on this computer.
      This is not your backup and you cannot restore your wallet with this password. Your seed
      phrase is still your ultimate backup.
    </p>
    <div class="form-row password">
      <PasswordInput label="Password" v-model="password" v-on:go-next="goNextInput" />
    </div>
    <div ref="confirm" class="form-row password">
      <PasswordInput
        ref="password"
        label="Confirm password"
        v-model="repeatPassword"
        v-on:go-next="nextStep"
      />
    </div>

    <p data-test="password-error-alert" v-if="createValidPasswordError" class="error">
      {{ createValidPasswordError.message }}
    </p>
  </NavigationCard>
</template>

<script>
import { mapState } from 'vuex'
import PasswordInput from '@/components/PasswordInput'
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
        password1: this.password,
        password2: this.repeatPassword,
      })
    },
    goNextInput() {
      this.$refs.password.$refs.passInput.focus()
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
        this.$router.push('/ftu/create-wallet')
      }
    },
    previousStep() {
      this.$router.push('/ftu/seed-validation')
    },
    clearError(errorName) {
      this.$store.commit('clearError', { error: errorName })
    },
  },
  computed: {
    ...mapState({
      mnemonics: state => state.wallet.mnemonics,
      createWalletError: state => state.wallet.errors.createWallet,
      createValidPasswordError: state => {
        return state.wallet.errors.createValidPassword
      },
      validatedPassword: state => state.wallet.validatedPassword,
    }),
  },
  components: {
    NavigationCard,
    PasswordInput,
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
  color: $red-0;
}

.paragraph {
  margin-top: 16px;
  margin-bottom: 40px;
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
}

.label {
  color: $font-color-light;
  width: 100px;
}

.password-input {
  width: 50%;
}
</style>
