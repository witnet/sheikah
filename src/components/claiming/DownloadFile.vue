<template>
  <NavigationCard data-test="download-file" title="Download file">
    <p class="text bold">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum cursus, consequat quam
      in, vestibulum erat. Duis ut diam fringilla, varius diam ac, ornare arcu.
    </p>
    <Countdown :date="checkTokenGenerationEventDate" />
    <div class="file-container">
      <el-button
        type="primary"
        size="small"
        class="download-btn"
        data-test="download-claiming"
        @click="exportFile"
      >
        Click to export the file
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
import Countdown from '@/components/claiming/Countdown'
import { createExportClaimingFile } from '@/utils'
import { mapState } from 'vuex'

export default {
  name: 'DownloadFile',
  components: {
    NavigationCard,
    Countdown,
  },
  data() {
    return {
      subtitle: 'Download your claiming file,',
    }
  },
  computed: {
    ...mapState({
      claimingAddresses: state => {
        return state.wallet.claimingAddresses
      },
      claimingFileInfo: state => {
        return state.wallet.claimingFileInfo
      },
      addresses: state => {
        return state.wallet.addresses
      },
      disclaimers: state => {
        return state.wallet.disclaimers
      },
      claimingProcessCompleted: state => {
        return state.wallet.claimingProcessState
      },
      checkTokenGenerationEventDate: state => {
        return state.wallet.checkTokenGenerationEventDate
      },
    }),
    dataStr() {
      const claimingFileInfo = this.$store.state.wallet.claimingFileInfo
      return `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(
          createExportClaimingFile(claimingFileInfo, this.claimingAddresses, this.disclaimers)
        )
      )}`
    },
  },
  methods: {
    exportFile() {
      this.$refs.download.click()
    },
    previousStep() {
      this.$router.push('/claiming/generate-addresses')
    },
  },
  beforeCreate() {
    this.$store.dispatch('saveCompletedProcess')
    this.$store.dispatch('getClaimingInfo')
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
.text {
  margin-bottom: 8px;

  &.bold {
    font-weight: bold;
    margin-bottom: 16px;
  }
}
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
    .el-icon-document {
      margin-right: 8px;
      padding-left: 4px;
    }
    .name {
      border: 1px solid transparent;
      border-radius: 3px;
      margin: 16px 16px 0px 0px;
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
