<template>
  <NavigationCard
    class="wallet-encryption"
    title="Encrypt your wallet with a password"
    previousText="Back"
    nextText="Next"
    :previousStep="previousStep"
    :nextStep="nextStep"
  >
    <p class="paragraph">
      <strong>PLEASE NOTE:</strong> this password encrypts your Witnet wallet only on this computer.
      This is not your backup and you cannot restore your wallet with this password. Your seed
      phrase is still your ultimate backup.
    </p>
    <div class="form-row">
      <label class="label">Password</label>
      <Input type="underlined" class="password-input" nativeType="password" v-model="password" />
    </div>
    <div class="form-row">
      <label class="label">Confirm password</label>
      <Input
        type="underlined"
        class="password-input"
        nativeType="password"
        v-model="repeatPassword"
      />
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </NavigationCard>
</template>

<script>
import { mapState } from 'vuex'

import Input from '@/components/Input'
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
    nextStep() {
      if (this.validateForm()) {
        this.showError = false
        this.$store.dispatch('createWallet', {
          sourceType: 'mnemonics',
          password: this.password,
          mnemonics: this.mnemonics,
        })
        this.$router.push('/ftu/create-wallet')
      } else {
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
    Input,
    NavigationCard,
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
}

.label {
  color: $font-color-light;
  width: 100px;
}

.password-input {
  width: 50%;
}
</style>
