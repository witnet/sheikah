<template>
  <NavigationCard
    class="wallet-encryption"
    title="Encrypt your wallet with a password"
    previousText="Back"
    nextText="Next"
    :previousStep="previousStep"
    :nextStep="nextStep"
  >
    <div class="content">
      <p class="paragraph">
        <strong>PLEASE NOTE:</strong> this password encrypts your Witnet wallet only on this
        computer. This is not your backup and you cannot restore your wallet with this password.
        Your seed phrase is still your ultimate backup.
      </p>
      <div class="form-row">
        <label class="label">Password</label>
        <input class="password-input" type="password" v-model="password">
      </div>
      <div class="form-row">
        <label class="label">Confirm password</label>
        <input class="password-input" type="password" v-model="repeatPassword">
      </div>

    </div>
    <p v-if="showError">Password must match</p>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/NavigationCard'

export default {
  name: 'WalletEncryptionPassword',
  data () {
    return {
      password: '',
      repeatPassword: '',
      showError: '',
    }
  },
  methods: {
    nextStep () {
      if (this.password === this.repeatPassword) {
        this.showError = false
        this.$store.dispatch('createWallet', { password: this.password, mnemonics: this.$store.state.mnemonics })
        this.$router.push('/ftu/create-wallet')
      } else {
        this.showError = true
      }
    },
    previousStep () {
      this.$router.push('/ftu/seed-validation')
    },
  },
  components: {
    NavigationCard,
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.content {
  padding: 40px;
}

.paragraph {
  margin-top: 10px;
  margin-bottom: 45px;
}

.form-row {
  display: flex;
  max-width: 500px;
  flex-flow: row nowrap;
  margin-bottom: 30px;
  align-items: center;
}

.label {
  color: $font-color-light;
  width: 100px;
}

.password-input {
  width: 100%;
}

</style>
