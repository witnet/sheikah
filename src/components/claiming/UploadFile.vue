<template>
  <div>
    <NavigationCard
      data-test="import-file"
      class="wallet-disclaimer"
      title="Import claiming file"
      :previousStep="previousStep"
      :nextStep="nextStep"
      :disabledNextButton="disabledNextButton"
      previousText="Back"
      nextText="Continue"
    >
      <p class="text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum cursus, consequat quam
        in, vestibulum erat. Duis ut diam fringilla, varius diam ac, ornare arcu.
      </p>
      <FileUploader
        :errorMessage="uploadFileError ? uploadFileError.message : ''"
        :file="claimingFileInfo ? claimingFileInfo.info : null"
        v-on:clear-file="clearClaimingInfo"
        :validateFile="validateClaimingImportFile"
        acceptedFormat=".json"
        v-on:file-name="updateName"
        v-on:file-validated="setFileInfo"
        v-on:error-uploading-file="setError"
      >
        Drag your <span class="upload">participant_proof.json</span> file here or
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
      return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(claimingFileInfo))}`
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
          source: file.source,
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
  margin-bottom: 16px;
  font-size: 16px;
  padding: 0 8px;
}
.format-warning {
  margin-top: 8px;
  color: $grey-3;
  font-size: 12px;
}
.file {
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  font-size: 34px;
  margin-top: 16px;
  height: min-content;
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
    transition: color 0.3s;
    border-radius: 4px;
    background-color: #f5f7fa;
    .text {
      color: $purple-6;
    }
  }
  .file-icon {
    padding-right: 8px;
    font-size: 14px;
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
  transform: translateY(-10px);
  opacity: 0;
}
.icon {
  color: $grey-3;
  font-size: 40px;
  padding-bottom: 8px;
}
.text {
  margin-bottom: 24px;
}
.error {
  font-size: 14px;
  color: $red-1;
  margin-top: 8px;
}
</style>
