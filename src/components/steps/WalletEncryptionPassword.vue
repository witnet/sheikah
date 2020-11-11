<template>
  <NavigationCard
    ref="navCard"
    class="wallet-encryption"
    title="Encrypt your wallet with a password"
    previous-text="Back"
    next-text="Next"
    :previous-step="() => $router.push(previousRoute)"
    :next-step="nextStep"
    :disabled-next-button="disabledNextButton"
  >
    <PasswordValidation
      :error="createValidPasswordError"
      :opening="openingLine"
      :text="text"
      @enable-next-button="enableNextButton"
      @disable-next-button="disableNextButton"
      @validate="nextStep"
    />
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'
import PasswordValidation from '@/components/PasswordValidation'

export default {
  name: 'WalletEncryptionPassword',
  components: {
    NavigationCard,
    PasswordValidation,
  },
  data() {
    return {
      password: '',
      repeatedPassword: '',
      disabledNextButton: true,
      openingLine: 'PLEASE NOTE:',
      text:
        'this password encrypts your Witnet wallet only on this computer. This is not your backup and you cannot restore your wallet with this password. Your 12 word seed phrase is still your ultimate recovery method.',
    }
  },
  computed: {
    ...mapState({
      mnemonics: state => state.wallet.mnemonics,
      seed: state => state.wallet.seed,
      xprv: state => state.wallet.xprv,
      xprvBackupPassword: state => state.wallet.xprvBackupPassword,
      createWalletError: state => state.wallet.errors.createWallet,
      createValidPasswordError: state =>
        state.wallet.errors.createValidPassword,
      validatedPassword: state => state.wallet.validatedPassword,
      repeatedWallet: state => state.wallet.repeatedWallet,
    }),
    isImportingMnemonics() {
      return this.$route.query && this.$route.query.import
    },
    isImportingXprv() {
      return this.$route.query && this.$route.query.xprv
    },
    previousRoute() {
      if (this.isImportingMnemonics) {
        return `/ftu/import-wallet`
      } else if (this.isImportingXprv) {
        return `/ftu/import-xprv`
      } else {
        return `/ftu/seed-validation`
      }
    },
  },
  beforeDestroy() {
    if (this.createValidPasswordError) {
      this.clearError({ error: this.createValidPasswordError.name })
    }
  },
  methods: {
    ...mapMutations({
      validatePassword: 'validatePassword',
      clearError: 'clearError',
    }),
    ...mapActions({
      createWallet: 'createWallet',
    }),
    disableNextButton() {
      this.disabledNextButton = true
    },
    enableNextButton(password, repeatedPassword) {
      this.disabledNextButton = false
      this.password = password
      this.repeatedPassword = repeatedPassword
    },
    goNextInput() {
      this.$refs.password.focus()
    },
    nextStep() {
      this.validatePassword({
        password: this.password,
        repeatedPassword: this.repeatedPassword,
        showError: true,
      })
      if (this.validatedPassword) {
        if (this.createValidPasswordError) {
          this.clearError({ error: this.createValidPasswordError.name })
        }
        const sourceType = this.mnemonics || this.seed ? 'mnemonics' : 'xprv'
        const words = this.mnemonics || this.seed || this.xprv
        this.createWallet({
          sourceType,
          password: this.password,
          [sourceType]: words,
          backupPassword: this.xprvBackupPassword
            ? this.xprvBackupPassword
            : null,
        })
        this.$router.push('/ftu/create-wallet')
      }
    },
  },
}
</script>
