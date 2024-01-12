<template>
  <NavigationCard
    ref="navCard"
    class="wallet-encryption"
    :title="$t('decrypt_xprv')"
    :previous-text="$t('back')"
    :next-text="$t('next')"
    :previous-step="prevStep"
    :next-step="nextStep"
  >
    <p class="paragraph">
      {{ $t('decrypt_xprv_info') }}
    </p>
    <div ref="confirm" class="form-row password">
      <el-input
        ref="password"
        v-model="password"
        class="password"
        data-test="password"
        :placeholder="$t('password')"
        show-password
        @keydown.enter="nextStep"
      />
      <div v-if="xprvError" data-test="password-error-alert" class="error">
        {{ xprvError.message }}
      </div>
    </div>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard.vue'

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
  beforeUnmount() {
    if (this.xprvError) {
      this.clearXprvInfo()
    }
  },
  methods: {
    ...mapMutations({
      setXprv: 'setXprv',
      setError: 'setError',
      clearError: 'clearError',
      setBackupPassword: 'setBackupPassword',
      setBirthDate: 'setBirthDate',
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
        message: this.$t('xprv_validation_message'),
      })
    },
    prevStep() {
      return this.$router.push('/ftu/import-xprv')
    },
    async nextStep() {
      await this.validateImportedWallet({
        xprv: this.fileInfo.data.master_key,
        backupPassword: this.password,
      })
      if (!this.xprvError) {
        this.setXprv({ result: this.fileInfo.data.master_key })
        this.setBackupPassword({ result: this.password })
        this.setBirthDate({ result: this.fileInfo.data.birth_date })

        if (this.repeatedWallet) {
          this.$router.push('/ftu/repeated-wallet?xprv=true')
        } else if (!this.xprvError) {
          this.$router.push(`/ftu/wallet-description?xprv=true`)
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
