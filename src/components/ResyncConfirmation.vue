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
      <p class="title">{{ $t('warning') }}</p>
    </div>

    <p class="text">
      {{ $t('resync_confirmation_0') }}
    </p>
    <p class="text">
      {{ $t('resync_confirmation_1') }}
    </p>
    <p class="text">
      {{ $t('resync_confirmation_2') }}
    </p>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="callResync">{{
        $t('resyncronize')
      }}</el-button>
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
