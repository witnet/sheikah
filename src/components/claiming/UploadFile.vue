<template>
  <div>
    <NavigationCard
      data-test="import-file"
      class="wallet-disclaimer"
      title="Import claiming file"
      :previousStep="previousStep"
      :nextStep="nextStep"
      previousText="Back"
      nextText="Continue"
    >
      <p class="text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum cursus, consequat quam
        in, vestibulum erat. Duis ut diam fringilla, varius diam ac, ornare arcu.
      </p>
      <el-upload
        data-test="upload"
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
        :limit="2"
        :file-list="file"
        :on-exceed="handleExceed"
        :on-remove="clearClaimingInfo"
      >
        <i v-if="claimingFileInfo" class="el-icon-upload-success el-icon-circle-check" />
        <i v-else class="el-icon-upload"></i>
        <div class="el-upload__text">Drag your file here or <em>click to import</em></div>
        <div slot="tip" class="el-upload__tip">Only json files supported</div>
      </el-upload>
      <p v-if="uploadFileError" class="error" data-test="error">
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
      claimingFileInfo: state => state.wallet.claimingFileInfo,
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
        return this.$store.commit('clearError', { error: 'uploadFile' })
      }
      if (this.claimingFileInfo) {
        this.file = [this.claimingFileInfo]
      }
    },
  },
  methods: {
    clearError() {
      this.$store.commit('clearError', { error: this.uploadFileError.name })
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
    handleExceed(files, fileList) {
      this.$message.warning('The limit of files uploaded is 1')
    },
    handleUpload() {
      const getLast = array => array[array.length - 1]
      const uploadFiles = this.$refs.upload.uploadFiles
      // we allow upload 2 files but the first one will be overwritten getting last file
      // this trick is done because element-ui doesn't allow this behaviour:
      // https://github.com/ElemeFE/element/issues/17991
      const raw = getLast(uploadFiles).raw
      const reader = new FileReader()
      reader.onload = e => {
        // try to parse the json file content
        try {
          console.log('---', e.target.result)
          const fileInfo = JSON.parse(e.target.result)
          this.$store.commit('setClaimingInfo', { info: fileInfo })
        } catch (error) {
          console.log('Error parsing json', error)
        }
      }
      reader.readAsText(raw)
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
          error: 'Validation Error',
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
.el-icon-circle-check {
  font-size: 56px;
  color: #52c41a;
  margin: 40px 0 16px;
  line-height: 50px;
}

.text {
  margin-bottom: 24px;
}

.error {
  font-size: 14px;
  color: $red-0;
  margin-top: 8px;
}
</style>
