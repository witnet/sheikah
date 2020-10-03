<template>
  <div>
    <NavigationCard
      data-test="import-file"
      class="wallet-disclaimer"
      title="Import your Participant Proof File"
      :previous-step="previousStep"
      :next-step="nextStep"
      :disabled-next-button="disabledNextButton"
      previous-text="Back"
      next-text="Continue"
    >
      <p class="text">
        You must have received an email from the Witnet Foundation with a
        <em>Participant Proof File</em>
        attached to it. If you cannot find it in your inbox, please double check
        your SPAM folder, if there is no sign of it anywhere, please contact
        <a class="link" href="mailto:genesis@witnet.foundation"
          >genesis@witnet.foundation</a
        >.
      </p>
      <FileUploader
        :error-message="uploadFileError ? uploadFileError.message : ''"
        :file="claimingFileInfo ? claimingFileInfo.info : null"
        :validate-file="validateClaimingImportFile"
        accepted-format=".json"
        @clear-file="clearClaimingInfo"
        @file-name="updateName"
        @file-validated="setFileInfo"
        @error-uploading-file="setError"
      >
        Drag your <span class="upload">participant_proof.json</span> file here
        or
        <span class="underline">click to import</span>
      </FileUploader>
    </NavigationCard>
  </div>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import FileUploader from '@/components/FileUploader'
import { mapState } from 'vuex'
import { validateClaimingImportFile } from '@/utils'
export default {
  name: 'UploadFile',
  components: {
    NavigationCard,
    FileUploader,
  },
  data() {
    return {
      showDelete: false,
      fileName: '',
      disabledNextButton: true,
    }
  },
  computed: {
    ...mapState({
      uploadFileError: state => state.wallet.errors.uploadFile,
      claimingFileInfo: state => state.wallet.claimingFileInfo,
    }),
  },
  watch: {
    uploadFileError(error) {
      if (error) {
        this.disabledNextButton = true
      } else {
        this.disabledNextButton = false
      }
    },
    claimingFileInfo(info) {
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
  created() {
    if (this.claimingFileInfo) {
      this.disabledNextButton = false
    }
  },
  methods: {
    validateClaimingImportFile,
    updateName(name) {
      this.fileName = name
    },
    setFileInfo(file) {
      this.$store.commit('setClaimingInfo', {
        info: this.normalizeFile(file),
      })
      this.clearError()
    },
    previousStep() {
      this.$router.push('/claiming/claiming-instructions')
    },
    nextStep() {
      this.$router.push('/claiming/vesting')
    },
    clearError() {
      this.$store.commit('clearError', { error: 'uploadFile' })
    },
    clearClaimingInfo() {
      this.$store.commit('clearClaimingInfo')
    },
    dataStr() {
      const claimingFileInfo = this.$store.state.wallet.claimingFileInfo
      return `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(claimingFileInfo),
      )}`
    },
    downloadFile() {
      this.$refs.download.click()
    },
    normalizeFile(file) {
      return {
        info: {
          name: this.fileName,
          data: {
            emailAddress: file.data.email_address,
            name: file.data.name,
            source: file.data.source,
            usd: file.data.usd,
            wit: file.data.wit,
            genesisDate: file.data.genesis_date * 10 ** 3,
            vesting: {
              delay: file.data.vesting.delay,
              cliff: file.data.vesting.cliff,
              installmentLength: file.data.vesting.installment_length,
              installmentWits: file.data.vesting.installment_wits,
            },
          },
          signature: file.signature,
        },
      }
    },
    setError() {
      this.$store.commit('setError', {
        name: 'uploadFile',
        error: 'Validation Error',
        message: 'Upload a valid claiming file',
      })
    },
    importFile() {
      this.$refs.fileInput.value = ''
      this.$refs.fileInput.click()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.paragraph {
  font-size: 16px;
  margin-bottom: 16px;
  padding: 0 8px;
}

.format-warning {
  color: $grey-3;
  font-size: 12px;
  margin-top: 8px;
}

.file {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 34px;
  height: min-content;
  justify-content: space-between;
  margin-top: 16px;

  .el-icon-document {
    margin-right: 8px;
    padding-left: 4px;
  }

  .name {
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 14px;
  }

  &:hover {
    background-color: #f5f7fa;
    border-radius: 4px;
    transition: color 0.3s;

    .text {
      color: $purple-6;
    }
  }

  .file-icon {
    font-size: 14px;
    padding-right: 8px;
  }

  .el-icon-upload-success {
    color: #52c41a;
  }
}

.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.icon {
  color: $grey-3;
  font-size: 40px;
  padding-bottom: 8px;
}

.text {
  margin-bottom: 24px;

  em {
    font-style: italic;
  }

  .link {
    color: inherit;
    text-decoration: underline;
  }
}

.error {
  color: $red-2;
  font-size: 14px;
  margin-top: 8px;
}
</style>
