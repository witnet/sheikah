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
        v-on:go-next="goNextStepButton"
      />
    </div>

    <p data-test="password-error-alert" v-if="error" class="error">{{ error }}</p>
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
      if (this.password.length < 8) {
        this.error = 'Password must be at least 8 characters'
        return false
      }

      if (this.password !== this.repeatPassword) {
        this.error = 'Passwords must match'
        return false
      }

      return true
    },
    goNextInput() {
      this.$refs.password.$refs.passInput.focus()
    },
    goNextStepButton() {
      this.$refs.navCard.$refs.next.$el.focus()
    },
    nextStep() {
      console.log('password', this.password)
      console.log('repeat password', this.repeatPassword)
      if (this.validateForm()) {
        console.log('0')
        this.showError = false
        this.$store.dispatch('createWallet', {
          sourceType: 'mnemonics',
          password: this.password,
          mnemonics: this.mnemonics,
        })
        console.log('1')
        this.$router.push('/ftu/create-wallet')
      } else {
        console.log('1')
        this.showError = true
      }
    },
    previousStep() {
      this.$router.push('/ftu/seed-validation')
    },
  },
  computed: {
    ...mapState({
      mnemonics: state => state.wallet.mnemonics,
    }),
  },
  components: {
    NavigationCard,
    PasswordInput,
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
