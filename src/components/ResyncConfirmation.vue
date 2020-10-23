<template>
  <el-dialog
    class="resync"
    title="Warning"
    width="30%"
    :visible="true"
    :show-close="false"
    @close="close"
  >
    <div slot="title" class="title-container">
      <font-awesome-icon class="icon" icon="exclamation-triangle" />
      <p class="title">Warning</p>
    </div>

    <p class="text">
      Triggering a full wallet resynchronization will wipe all locally stored
      information about balances, movements, addresses and their metadata. This
      may help recovering wallets that end up in an inconsistent or corrupt
      state.
    </p>
    <p class="text">
      The process of resynchronizing may take several minutes or hours, and
      after it is complete, all your balances movements and addresses should be
      restored.
    </p>
    <p class="text">
      If the information in your wallet still looks inconsistent or corrupt
      after resynchronizing, it is recommended that you try to re-import your
      seed phrase from the "Create, import or recover a wallet" menu that
      appears in the main Sheikah unlock screen.
    </p>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">Cancel</el-button>
      <el-button type="primary" @click="callResync">Resynchronize</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'ResyncConfirmation',
  methods: {
    callResync() {
      this.resync()
      this.close()
    },
    ...mapActions(['resync']),
    ...mapMutations({
      close: 'closeResyncConfirmation',
    }),
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.resync {
  .title-container {
    align-items: center;
    color: $yellow-4;
    display: flex;

    .title {
      color: $yellow-4;
      font-size: 32px;
    }

    .icon {
      font-size: 36px;
      margin-right: 8px;
    }
  }

  .el-dialog__body {
    padding: 10px 20px;
    word-break: break-word;

    .text {
      margin-bottom: 8px;
    }
  }
}
</style>
