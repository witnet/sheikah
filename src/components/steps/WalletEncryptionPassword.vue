<template>
  <NavigationCard
    ref="navCard"
    class="wallet-encryption"
    :title="$t('encrypt_wallet_password')"
    :previous-text="$t('back')"
    :next-text="$t('next')"
    :previous-step="() => $router.push(previousRoute)"
    :next-step="nextStep"
    :disabled-next-button="disabledNextButton"
  >
    <PasswordValidation
      :error="createValidPasswordError"
      :opening="openingLine"
      :text="text"
      @input-password="setPassword"
      @validate="nextStep"
    />
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard.vue'
import PasswordValidation from '@/components/PasswordValidation.vue'

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
      disabledNextButton: false,
      openingLine: this.$t('please_note').toUpperCase(),
      text: this.$t('encrypt_wallet_info'),
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
  beforeUnmount() {
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
    setPassword(password, repeatedPassword) {
      this.password = password
      this.repeatedPassword = repeatedPassword
    },
    goNextInput() {
      this.$refs.password.focus()
    },
    nextStep() {
      console.log('nextstep')
      this.validatePassword({
        password: this.password,
        repeatedPassword: this.repeatedPassword,
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
