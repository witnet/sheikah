<template>
  <Card class="card" title="Resync wallet" :border="false" shadow="thin">
    <p class="text">
      <span class="bold">PLEASE NOTE: </span>Triggering a full wallet
      resynchronization will wipe all locally stored information about balances,
      movements, addresses and their metadata.</p
    >
    <div class="btn-container">
      <el-button
        :disabled="!isResyncButtonVisible"
        type="primary"
        class="resync"
        @click="$store.commit('showResyncConfirmation')"
      >
        <font-awesome-icon class="icon" icon="sync-alt" />
        Resync
      </el-button>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/card/Card.vue'
import { mapState } from 'vuex'
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
  }
}
</style>
