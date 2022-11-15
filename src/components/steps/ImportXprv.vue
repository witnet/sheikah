<template>
  <NavigationCard
    ref="navCard"
    data-test="header-4"
    class="wallet-seed-validation"
    :title="$t('import_xprv')"
    :previous-text="$t('back')"
    :next-text="$t('next')"
    :previous-step="previousStep"
    :next-step="nextStep"
    :disabled-next-button="!fileInfo"
  >
    <p class="text">
      {{ $t('import_xprv_0') }}
    </p>
    <p class="text">
      {{ $t('import_xprv_1') }}
    </p>
    <p class="text">
      <span class="bold">{{ $t('please_note') }}</span>
      {{ $t('import_xprv_2') }}
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
      <i18n-t keypath="drag_xprv_0" tag="p">
        <span class="bold">xprv</span>
        <span class="bold">{{ $t('drag_xprv_1') }}</span>
      </i18n-t>
    </FileUploader>
  </NavigationCard>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import FileUploader from '@/components/FileUploader.vue'
import NavigationCard from '@/components/card/NavigationCard.vue'

export default {
  name: 'ImportXprv',
  components: {
    NavigationCard,
    FileUploader,
  },
  data() {
    return {
      seed: '',
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
  beforeUnmount() {
    if (this.xprvError) {
      this.clearError({ error: this.xprvError.name })
    }
  },
  created() {
    if (this.validateXprv(this.fileInfo)) {
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
      this.clearXprvError()
      this.fileName = name
    },
    setFileInfo(file) {
      this.$store.commit('setXprvInfo', this.normalizeFile(file))
    },
    clearXprvError() {
      if (this.xprvError) {
        this.clearError({ error: this.xprvError.name })
      }
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
        error: 'Validation Error',
        message: this.$t('xprv_validation_message'),
      })
    },
    importFile() {
      this.$refs.fileInput.value = ''
      this.$refs.fileInput.click()
    },
    validateXprv(fileInfo) {
      return fileInfo && !this.xprvError && fileInfo.master_key
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
}

.bold {
  font-weight: bold;
  margin-bottom: 10px;
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
  color: var(--error-color);
}

.paragraph {
  margin-top: 16px;
}
</style>
