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
  >
    <p class="text">
      Please import your xprv.
    </p>
    <FileUploader
      :error-message="xprvError ? xprvError.message : ''"
      :file="fileInfo ? fileInfo.info : null"
      :validate-file="validateXprv"
      accepted-format=".xprv"
      @clear-file="clearXprvInfo"
      @file-name="updateName"
      @file-validated="setFileInfo"
      @error-uploading-file="setError"
    >
      Drag your <span class="upload">xprv</span> file here or
      <span class="underline">click to import</span>
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
      if (error) {
        this.disabledNextButton = true
      } else {
        this.disabledNextButton = false
      }
    },
    fileInfo(info) {
      if (info && this.uploadFileError) {
        this.clearError()
      }
      if (info) {
        this.disabledNextButton = false
      } else {
        this.disabledNextButton = true
      }
    },
  },
  beforeDestroy() {
    if (this.xprvError) {
      this.clearError({ error: this.xprvError.name })
    }
  },
  created() {
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
      this.$store.commit('setXprvInfo', {
        info: this.normalizeFile(file),
      })
      this.clearError()
    },
    clearError() {
      this.$store.commit('clearError', { error: 'uploadFile' })
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
        info: {
          name: this.fileName,
          data: { file },
        },
      }
    },
    setError() {
      this.$store.commit('setError', {
        name: 'xprv',
        error: 'Validation Error',
        message: 'Upload a valid file',
      })
    },
    importFile() {
      this.$refs.fileInput.value = ''
      this.$refs.fileInput.click()
    },
    async validateXprv(fileInfo) {
      await this.validateImportedWallet({ xprv: fileInfo })
      if (!this.xprvError) {
        this.setXprv({ result: fileInfo })
        return true
      } else {
        return false
      }
    },
    async nextStep() {
      if (this.repeatedWallet) {
        this.$router.push('/ftu/repeated-wallet')
      } else if (!this.xprvError) {
        this.$router.push(`/ftu/encryption-pass?xprv=true`)
      }
    },
    previousStep() {
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
}

.seed {
  align-items: center;
  border: $input_big-border;
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
