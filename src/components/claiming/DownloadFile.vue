<template>
  <NavigationCard
    :nextStep="nextStep"
    :previousStep="previousStep"
    data-test=""
    nextText="Next"
    previousText="Back"
    title="DownloadFile"
  >
    <InformativeContent :subtitle="subtitle" :texts="texts" />
    <div class="file-container">
      <el-button
        type="primary"
        size="small"
        class="download-btn"
        data-test="download-claiming"
        @click="exportFile"
      >
        Click to download the file
      </el-button>
      <a
        :href="dataStr"
        ref="download"
        download="claiming-information.json"
        style="display:none"
      ></a>
      <div class="file">
        <p class="name">
          <i class="el-icon-document"></i>
          <span class="text"> claiming-information.json </span>
        </p>
      </div>
    </div>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import InformativeContent from '@/components/card/InformativeContent'
import { mapState } from 'vuex'

export default {
  name: 'DownloadFile',
  components: {
    NavigationCard,
    InformativeContent,
  },
  data() {
    return {
      subtitle: 'Download your claiming file,',
      texts: {
        0: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a pharetra sapien. Curabitur tortor quam, porttitor mattis pretium vel, tincidunt eget orci. Ut pretium ultrices libero, quis dignissim felis cursus vel. Vestibulum ipsum nulla, efficitur vitae finibus nec, gravida ut ipsum.',
      },
    }
  },
  computed: {
    ...mapState({
      claimingFileInfo: state => {
        return state.wallet.claimingFileInfo
      },
    }),
    dataStr() {
      const claimingFileInfo = this.$store.state.wallet.claimingFileInfo
      return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(claimingFileInfo))}`
    },
  },
  methods: {
    exportFile() {
      this.$refs.download.click()
    },
    nextStep() {
      this.$router.push('/claiming/countdown')
    },
    previousStep() {
      this.$router.push('/claiming/generate-addresses')
    },
  },
  beforeCreate() {
    this.$store.dispatch('getClaimingInfo')
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
.file-container {
  display: flex;
  justify-content: left;
  flex-direction: column;
  align-items: left;
  margin-left: 34px;
  .file {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: left;
    font-size: 34px;
    margin-bottom: 16px;
    color: #606266;
    .el-icon-document {
      margin-right: 8px;
      padding-left: 4px;
    }
    .name {
      border: 1px solid transparent;
      border-radius: 3px;
      margin: 16px 16px 16px 0px;
      font-size: 14px;
      &:hover {
        transition: color 0.3s;
        border: 1px solid #f5f7fa;
        background-color: #f5f7fa;
        .text {
          color: $blue-6;
        }
      }
    }
  }
  .download-btn {
    width: min-content;
  }
}
</style>
