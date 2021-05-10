<template>
  <el-dialog
    class="wallet-description"
    title="Wallet description"
    :visible="true"
    :show-close="false"
    @close="close"
  >
    <div slot="title" class="title-container">
      <img class="avatar" :src="unlockedWallet.image" alt="avatar" />
      <p class="title">{{ unlockedWallet.name }}</p>
    </div>
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
      walletDescription: state => state.wallet.unlockedWalletDescription,
    }),
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
