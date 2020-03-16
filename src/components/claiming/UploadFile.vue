<template>
  <div>
    <NavigationCard
      data-test="header-2"
      class="wallet-disclaimer"
      title="Import claiming file"
      :previousStep="previousStep"
      :nextStep="nextStep"
      previousText="Back"
      nextText="Next"
    >
      <p class="text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum cursus, consequat quam
        in, vestibulum erat. Duis ut diam fringilla, varius diam ac, ornare arcu. Nulla facilisi.
        Praesent fermentum urna magna, et vehicula odio venenatis vitae.
      </p>
      <el-upload
        class="upload-container"
        ref="upload"
        accept="application/json"
        drag
        action=""
        :on-preview="downloadFile"
        :auto-upload="false"
        :multiple="false"
        :http-request="handleUpload"
        :on-change="handleUpload"
        :limit="1"
        :file-list="file"
        :on-exceed="handleExceed"
        :on-remove="clearClaimingInfo"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drag your file here or <em>click to upload</em></div>
        <div slot="tip" class="el-upload__tip">Only json files supported</div>
      </el-upload>
      <p v-if="uploadFileError" class="error">
        {{ uploadFileError.message }}
      </p>
      <a
        :href="dataStr"
        ref="download"
        download="claiming-information.json"
        style="display:none"
      ></a>
    </NavigationCard>
  </div>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import { mapState } from 'vuex'

export default {
  name: 'UploadFile',
  components: {
    NavigationCard,
  },
  data() {
    return {
      file: [],
      dialogVisible: false,
      disabled: false,
    }
  },
  computed: {
    ...mapState({
      uploadFileError: state => state.wallet.errors.uploadFile,
      claimingFileInfo: state => {
        return state.wallet.claimingFileInfo
      },
    }),
  },
  created() {
    if (this.claimingFileInfo) {
      this.file.push({ name: 'claiming-process.json' })
    }
  },
  watch: {
    claimingFileInfo() {
      if (this.claimingFileInfo && this.uploadFileError) {
        this.clearError(this.uploadFileError.name)
      }
      if (this.claimingFileInfo) {
        this.file = [this.claimingFileInfo]
      }
    },
  },
  methods: {
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
    handleExceed(files, fileList) {
      this.$message.warning('The limit of files uploaded is 1')
    },
    handleUpload() {
      const y = this.$refs.upload.uploadFiles[0].raw
      const reader = new FileReader()
      reader.onload = e => {
        const fileText = e.target.result
        try {
          const x = JSON.parse(fileText)
          this.$store.commit('setClaimingInfo', { info: x })
        } catch (error) {
          console.log('Error parsing json', error)
        }
        return false
      }
      reader.readAsText(y)
    },
    previousStep() {
      this.$router.push('/claiming/claiming-instructions')
    },
    nextStep() {
      if (this.claimingFileInfo) {
        this.$router.push('/claiming/file-information')
      } else {
        this.$store.commit('setError', {
          name: 'uploadFile',
          error: 'Uploading file',
          message: 'Upload a valid claiming file before continue',
        })
      }
    },
    importFile() {
      this.$refs.fileInput.click()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.text {
  margin-bottom: 8px;
}

.error {
  color: $red-0;
}
</style>
