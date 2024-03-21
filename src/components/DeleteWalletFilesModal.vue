<template>
  <el-dialog
    v-model="isDeleteWalletFilesModalVisibleLocal"
    class="delete"
    :show-close="true"
    @close="close"
  >
    <template #header>
      <div class="title-container">
        <font-awesome-icon class="icon" icon="exclamation-triangle" />
        <p class="title">{{ $t('warning') }}</p>
      </div>
    </template>
    <p class="text">
      {{ $t('delete_files_confirmation_0') }}
    </p>
    <p class="text">
      {{ $t('delete_files_confirmation_1') }}
    </p>
    <p class="text">
      {{ $t('delete_files_confirmation_2') }}
    </p>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" plain @click="close">{{
          $t('cancel')
        }}</el-button>
        <el-button type="danger" @click="callDelete">{{
          $t('delete_wallet_files_action')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { sendClearWalletFiles } from '@/ipc/ipcMessages'

export default {
  name: 'DeleteConfirmation',
  data() {
    return {
      error: null,
      walletName: '',
    }
  },
  computed: {
    ...mapState({
      isDeleteWalletFilesModalVisible: state => {
        return state.uiInteractions.isDeleteWalletFilesModalVisible
      },
    }),
    ...mapGetters(['unlockedWallet']),
    validateDelete() {
      return this.walletName === this.unlockedWallet.name
    },
    isDeleteWalletFilesModalVisibleLocal: {
      set() {
        this.$emit('close')
      },
      get() {
        return this.isDeleteWalletFilesModalVisible
      },
    },
  },
  watch: {
    walletName() {
      this.clearDeleteWalletError()
    },
  },
  beforeUnmount() {
    this.error = null
  },
  methods: {
    deleteWalletFiles() {
      sendClearWalletFiles()
    },
    ...mapMutations({
      close: 'closeDeleteWalletFilesModal',
    }),
    clearDeleteWalletError() {
      this.error = null
    },
    callDelete() {
      this.deleteWalletFiles()
      this.close()
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.delete {
  .title-container {
    align-items: center;
    color: $red-2;
    display: flex;

    .title {
      color: $red-2;
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

    .input {
      margin: 8px 0;
    }

    .error {
      color: $red-2;
      font-size: 14px;
      margin-top: 8px;
    }

    .text {
      margin-bottom: 8px;

      .wallet-name {
        color: var(--primary-color);
        font-family: 'Roboto Mono';
      }
    }
  }
}
</style>
