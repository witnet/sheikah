<template>
  <el-dialog
    class="delete"
    title="Warning"
    width="30%"
    :visible="true"
    :show-close="true"
    :close-on-click-modal="false"
    @close="close"
  >
    <div slot="title" class="title-container">
      <font-awesome-icon class="icon" icon="exclamation-triangle" />
      <p class="title">{{ $t('warning') }}</p>
    </div>

    <i18n-t keypath="delete_confirmation_0" tag="p" class="text">
      <span class="wallet-name">{{ unlockedWallet.name }}</span>
    </i18n-t>
    <p class="text">
      {{ $t('delete_confirmation_1') }}
    </p>
    <p class="text">
      {{ $t('delete_confirmation_2') }}
    </p>
    <el-input
      v-model="walletName"
      class="input"
      :placeholder="$t('wallet_name')"
      @keydown.enter.native="callDelete"
    />
    <p class="error">
      {{ error }}
    </p>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" plain @click="close">{{
        $t('cancel')
      }}</el-button>
      <el-button type="danger" @click="callDelete">{{
        $t('delete')
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'DeleteConfirmation',
  data() {
    return {
      error: null,
      walletName: '',
    }
  },
  computed: {
    ...mapGetters(['unlockedWallet']),
    validateDelete() {
      return this.walletName === this.unlockedWallet.name
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
    ...mapActions({
      deleteWallet: 'deleteWallet',
    }),
    ...mapMutations({
      close: 'closeDeleteWalletConfirmation',
    }),
    clearDeleteWalletError() {
      this.error = null
    },
    callDelete() {
      if (this.validateDelete) {
        this.deleteWallet()
        this.close()
      } else {
        this.error = this.$t('error_validating_delete')
      }
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
