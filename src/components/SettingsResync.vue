<template>
  <Card class="card" :title="$t('resync_wallet')" :border="false" shadow="thin">
    <p class="text">
      <span class="bold">{{ $t('please_note').toUpperCase() }}</span>
      {{ $t('resynchronization_info') }}
    </p>
    <div class="btn-container">
      <el-button
        :disabled="!isResyncButtonVisible"
        data-test="resync-button"
        type="primary"
        class="resync"
        @click="showResyncConfirmation"
      >
        {{ $t('resync') }}
      </el-button>
    </div>
  </Card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Card from '@/components/card/Card.vue'
import { NETWORK_STATUS } from '@/constants'

export default {
  name: 'SettingsOptionCurrenty',
  components: { Card },
  computed: {
    ...mapState({
      status: state => state.wallet.status,
      isNodeSynced: state => state.wallet.status.isNodeSynced,
    }),
    isResyncButtonVisible() {
      return (
        this.status.currentState === NETWORK_STATUS.SYNCED ||
        (this.status.currentState === NETWORK_STATUS.SYNC_ERROR &&
          this.isNodeSynced)
      )
    },
  },
  methods: {
    ...mapMutations({
      showResyncConfirmation: 'showResyncConfirmation',
    }),
  },
}
</script>

<style lang="scss" scoped>
.card {
  .bold {
    font-weight: bold;
  }

  .btn-container {
    margin-top: 32px;
    text-align: right;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
