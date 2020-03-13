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
      <InformativeContent :subtitle="subtitle" :texts="texts" />
      <el-upload
        class="upload-container"
        ref="upload"
        accept="application/json"
        drag
        action=""
        :auto-upload="false"
        :multiple="false"
        :http-request="handleUpload"
        :on-change="handleUpload"
        :limit="1"
        :on-exceed="handleExceed"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
        <div slot="tip" class="el-upload__tip">Only application/json files supported</div>
      </el-upload>
    </NavigationCard>
  </div>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import InformativeContent from '@/components/card/InformativeContent'

export default {
  name: 'UploadFile',
  components: {
    NavigationCard,
    InformativeContent,
  },
  data() {
    return {
      file: {},
      subtitle: 'Import your claiming file,',
      texts: {
        0: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a pharetra sapien.',
      },
      dialogVisible: false,
      disabled: false,
      uploaded: false,
    }
  },
  methods: {
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
          this.uploaded = true
        } catch (error) {
          console.log('Error parsing json', error)
        }
        return false
      }
      reader.readAsText(y)
    },
    previousStep() {
      if (this.uploaded) {
        this.uploaded = false
      } else {
        this.$router.push('/claiming/claiming-instructions')
      }
    },
    nextStep() {
      if (this.uploaded) {
        this.$router.push('/claiming/file-information')
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

.paragraph {
  margin-bottom: 16px;
  font-size: 16px;
  padding: 0 8px;
}
</style>
