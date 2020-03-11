<template>
  <NavigationCard
    :nextStep="nextStep"
    :previousStep="previousStep"
    data-test=""
    nextText="Next"
    previousText="Back"
    title="DownloadFile"
  >
    <div class="file-container">
      <a
        :href="dataStr"
        ref="download"
        download="claiming-information.json"
        style="display:none"
      ></a>
      <div class="file">
        <font-awesome-icon class="icon" icon="file" />
        <p class="name">claiming-information.json</p>
      </div>
      <el-button class="download-btn" data-test="download-claiming" @click="exportFile">
        Download File
      </el-button>
    </div>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import { mapState } from 'vuex'

export default {
  name: 'DownloadFile',
  components: {
    NavigationCard,
  },
  data() {
    return {
      subtitle: 'DownloadFile',
      texts: {},
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .file {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 34px;
    margin-bottom: 16px;
    .name {
      padding: 16px;
    }
  }
}
</style>
