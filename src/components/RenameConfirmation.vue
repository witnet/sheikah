<template>
  <el-dialog
    class="wallet-description"
    title="Wallet description"
    :visible="true"
    :show-close="false"
    @close="close"
  >
    <p slot="title" class="title"
      ><font-awesome-icon class="icon" icon="cog" />
      {{ $t('rename_confirmation_title') }}</p
    >
    <p class="text">
      {{ $t('rename_modal_description') }}
    </p>
    <p class="text">
      {{ $t('new_name') }}
    </p>
    <p class="new"> {{ name }} </p>
    <p class="text">
      {{ $t('new_description') }}
    </p>
    <p class="new"> {{ description }} </p>

    <div class="submit">
      <el-button
        tabindex="5"
        type="primary"
        data-test="export-btn"
        @click="renameWallet"
      >
        {{ $t('update_wallet_and_exit') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'RenameWalletModal',
  computed: {
    ...mapState({
      description: state => state.wallet.updatedDescription,
      name: state => state.wallet.updatedName,
    }),
  },
  methods: {
    renameWallet() {
      this.updateWallet()
      this.close()
      this.closeSession()
    },
    ...mapActions({
      updateWallet: 'updateWallet',
      closeSession: 'closeSession',
    }),
    ...mapMutations({
      close: 'closeRenameConfirmationModal',
    }),
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.wallet-description {
  .title {
    font-size: 32px;
    line-height: 1.5;
  }

  .submit {
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
  }

  .new {
    color: var(--text-low-emphasis);
    font-size: 16px;
    margin: 16px;
  }

  .el-dialog__body {
    max-height: 60vh;
    overflow: auto;
    padding: 10px 20px;
    word-break: break-word;

    .text {
      margin-bottom: 8px;
    }
  }
}
</style>
