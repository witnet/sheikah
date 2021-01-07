<template>
  <NavigationCard
    ref="navCard"
    data-test="header-4"
    class="wallet-seed-validation"
    title="Import your xprv file"
    previous-text="Back"
    next-text="Next"
    :previous-step="previousStep"
    :next-step="nextStep"
    :disabled-next-button="!fileInfo"
  >
    <p class="text">
      {{ this.$t('import_xprv[0]') }}
    </p>
    <p class="text">
      {{ this.$t('import_xprv[1]') }}
    </p>
    <p class="text">
      <span class="bold">{{ this.$t('please_note') }}</span>
      {{ this.$t('import_xprv[2]') }}
    </p>
    <FileUploader
      :error-message="xprvError ? xprvError.message : ''"
      :file="fileInfo ? fileInfo : null"
      :validate-file="validateXprv"
      accepted-format=".json"
      @clear-file="clearXprvInfo"
      @file-name="updateName"
      @file-validated="setFileInfo"
      @error-uploading-file="setError"
    >
      {{ this.$t('drag_xprv[0]') }} <span class="upload">xprv</span>
      {{ this.$t('drag_xprv[1]') }}
      <span class="underline">{{ this.$t('drag_xprv[2]') }}</span>
    </FileUploader>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import FileUploader from '@/components/FileUploader'
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'ImportXprv',
  components: {
    NavigationCard,
    FileUploader,
  },
  data() {
    return {
      seed: '',
      showError: '',
      error: '',
      showDelete: false,
      fileName: '',
      disabledNextButton: true,
    }
  },
  computed: {
    ...mapState({
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
  watch: {
    xprv() {
      if (this.xprvError) {
        this.clearError({ error: this.xprvError.name })
      }
    },
    uploadFileError(error) {
      this.disabledNextButton = !!error
    },
    fileInfo(info) {
      if (info && this.uploadFileError) {
        this.clearError()
      }
      this.disabledNextButton = !info
    },
  },
  beforeDestroy() {
    if (this.xprvError) {
      this.clearError({ error: this.xprvError.name })
    }
  },
  created() {
    this.validateXprv(this.fileInfo)
    if (this.fileInfo) {
      this.disabledNextButton = false
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
    updateName(name) {
      this.fileName = name
    },
    setFileInfo(file) {
      this.$store.commit('setXprvInfo', this.normalizeFile(file))
      this.clearError()
    },
    clearError() {
      this.$store.commit('clearError', { error: 'xprv' })
    },
    clearXprvInfo() {
      this.$store.commit('clearXprvInfo')
    },
    dataStr() {
      const fileInfo = this.$store.state.wallet.fileInfo
      return `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(fileInfo),
      )}`
    },
    downloadFile() {
      this.$refs.download.click()
    },
    normalizeFile(file) {
      return {
        name: this.fileName,
        data: file,
      }
    },
    setError() {
      this.$store.commit('setError', {
        name: 'xprv',
        error: this.$t('validation_error'),
        message: this.$t('xprv_validation_message'),
      })
    },
    importFile() {
      this.$refs.fileInput.value = ''
      this.$refs.fileInput.click()
    },
    async validateXprv(fileInfo) {
      if (!this.xprvError) {
        return true
      } else {
        return false
      }
    },
    nextStep() {
      this.$router.push(`/ftu/decrypt-xprv`)
    },
    previousStep() {
      if (this.xprvError) {
        this.clearError({ error: this.xprvError.name })
      }
      this.$router.push('/ftu/welcome')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.text {
  padding-bottom: 16px;

  .bold {
    font-weight: 600;
  }
}

.seed {
  align-items: center;
  border: var(--seed-big-border);
  border-radius: $input_big-border-radius;
  box-sizing: border-box;
  color: $input_big-color;
  display: inline-flex;
  font-size: 22px;
  line-break: auto;
  line-height: 1.5em;
  margin: 24px 0;
  padding: 16px;
  width: 100%;
}

.match-error {
  color: $red-2;
}

.paragraph {
  margin-top: 16px;
}
</style>
