<template>
  <NavigationCard
    ref="navCard"
    class="wallet-encryption"
    title="Decript your xprv"
    previous-text="Back"
    next-text="Next"
    :previous-step="prevStep"
    :next-step="nextStep"
    :disabled-next-button="disabledNextButton"
  >
    <p class="paragraph">
      Please, decrypt your xprv file with the password you used to export the file.
    </p>
    <div ref="confirm" class="form-row password">
      <el-input
        ref="password"
        v-model="password"
        class="password"
        data-test="password"
        placeholder="Password"
        show-password
        @keydown.enter.native="nextStep"
      />
      <div
        v-if="xprvError"
        data-test="password-error-alert"
        class="error"
      >
        {{ xprvError.message }}
      </div>
    </div>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'DecryptXprv',
  components: {
    NavigationCard,
  },
  data() {
    return {
      password: '',
      error: false,
      disabledNextButton: true,
    }
  },
  computed: {
    ...mapState({
      repeatedWallet: state => state.wallet.repeatedWallet,
      xprv: state => state.wallet.xprv,
      xprvError: state => {
        return state.wallet.errors.xprv
      },
      isXprvValid: state => state.wallet.isXprvValid,
      wallets: state => state.wallet.walletInfos,
      uploadFileError: state => state.wallet.errors.uploadFile,
      fileInfo: state => state.wallet.fileInfo,
    }),
  },
  beforeDestroy() {
    if (this.xprvError) {
      this.clearXprvInfo()
    }
  },
  methods: {
    ...mapMutations({
      setXprv: 'setXprv',
      setError: 'setError',
      clearError: 'clearError',
    }),
    ...mapActions({
      validateImportedWallet: 'validateImportedWallet',
    }),
    validateForm() {
      this.validatePassword({
        password: this.password,
      })
    },
    clearError() {
      this.$store.commit('clearError', { error: 'uploadFile' })
    },
    clearXprvInfo() {
      this.$store.commit('clearXprvInfo')
    },
    setError() {
      this.$store.commit('setError', {
        name: 'xprv',
        error: 'Validation Error',
        message: 'Upload a valid file',
      })
    },
    prevStep() {
      return this.$router.push('/ftu/import-xprv')
    },
    async nextStep() {
      await this.validateImportedWallet({ xprv: this.fileInfo, password: this.password })
      if (!this.xprvError) {
        this.setXprv({ result: this.fileInfo })
        if (this.repeatedWallet) {
          this.$router.push('/ftu/repeated-wallet')
        } else if (!this.xprvError) {
          this.$router.push(`/ftu/encryption-pass?xprv=true`)
        }
      } else {
        this.prevStep()
      }
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

.form-row {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 32px;

  &.password {
    display: flex;
    justify-content: space-between;
    max-width: none;
  }

  &.form-row:last-of-type {
    margin: 0;
  }

  .password {
    width: 100%;
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
