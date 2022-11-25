<template>
  <el-dialog
    class="wallet-description"
    v-model="isWalletDescriptionVisibleLocal"
    :show-close="true"
    @close="close"
  >
    <template #header class="title-container">
      <img class="avatar" :src="unlockedWallet.image" alt="avatar" />
      <p class="title">{{ unlockedWallet.name }}</p>
    </template>
    <p class="text">
      {{ walletDescription }}
    </p>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'DescriptionModal',
  computed: {
    ...mapGetters(['unlockedWallet']),
    ...mapState({
      walletDescription: state => state.wallet.description,
      isWalletDescriptionVisible: state =>
        state.uiInteractions.isWalletDescriptionVisible,
    }),
    isWalletDescriptionVisibleLocal: {
      get() {
        return this.isWalletDescriptionVisible
      },
      set() {
        this.close()
      }
    }
  },
  methods: {
    ...mapMutations({
      close: 'closeDescriptionModal',
    }),
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.wallet-description {
  .title-container {
    align-items: center;
    display: flex;

    .title {
      font-size: 32px;
      line-height: 1.5;
    }

    .avatar {
      margin-right: 16px;
      width: 36px;
    }
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
