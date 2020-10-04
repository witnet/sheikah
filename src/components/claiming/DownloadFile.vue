<template>
  <NavigationCard
    data-test="download-file"
    title="Save your tokens claiming receipt"
    :next-step="nextStep"
    next-text="Continue"
    :disabled-next-button="disabledNextButton"
  >
    <p class="text">
      Claiming process complete! After the genesis event, scheduled for October
      14th, your tokens will appear on this wallet. Before you finish, export a
      receipt with details on the claiming process you just completed.
    </p>
    <div class="file-container">
      <el-button
        type="primary"
        size="small"
        class="download-btn"
        data-test="download-claiming"
        @click="exportFile"
      >
        Save my tokens claiming receipt...
      </el-button>
      <a
        ref="file"
        :href="exportFileLink"
        :download="`${email}-witnet-tokens-claim.json`"
        style="display:none"
      ></a>
      <div class="file">
        <p class="name">
          <i class="el-icon-document"></i>
          <span class="text">
            {{ cropString(`${email}-witnet-tokens-claim.json`, 50, 'middle') }}
          </span>
        </p>
      </div>
    </div>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import { mapState } from 'vuex'
import { cropString } from '@/utils'

export default {
  name: 'DownloadFile',
  components: {
    NavigationCard,
  },
  data() {
    return {
      subtitle: 'Download your claiming file,',
      disabledNextButton: true,
    }
  },
  computed: {
    ...mapState({
      claimingProcessCompleted: state => {
        return state.wallet.claimingProcessState
      },
      exportFileLink: state => {
        return state.wallet.exportFileLink
      },
      email: state => state.wallet.claimingFileInfo.info.data.emailAddress,
    }),
  },
  beforeCreate() {
    this.$store.dispatch('getClaimingInfo')
    this.$store.dispatch('saveCompletedProcess')
  },
  methods: {
    cropString,
    exportFile() {
      this.$refs.file.click()
      this.disabledNextButton = false
    },
    nextStep() {
      this.$router.push('/claiming/countdown')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.text {
  margin-bottom: 16px;
}

.file-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .file {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 34px;
    justify-content: center;

    .el-icon-document {
      margin-right: 8px;
      padding-left: 4px;
    }

    .name {
      border: 1px solid transparent;
      border-radius: 3px;
      font-size: 14px;
      margin: 16px 16px 0 0;

      &:hover {
        background-color: #f5f7fa;
        border: 1px solid #f5f7fa;
        transition: color 0.3s;

        .text {
          color: $purple-6;
        }
      }
    }
  }

  .download-btn {
    width: 300px;
  }
}
</style>
