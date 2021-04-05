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
        <font-awesome-icon class="icon" icon="sync-alt" />
        {{ $t('resync') }}
      </el-button>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/card/Card.vue'
import { mapState, mapMutations } from 'vuex'

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
        this.status.currentState === this.$t('synced') ||
        (this.status.currentState === this.$t('sync_error') &&
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
  }
}
</style>
