<template>
  <Card class="wallet-seed-type" data-test="header-1">
    <p class="text header">
      Create, import, or recover a wallet
    </p>
    <ul class="options">
      <li class="option">
        <el-button
          class="big"
          data-test="new-seed-option"
          @click="redirectTo('/ftu/disclaimer')"
          type="primary"
        >
          Create a new Witnet wallet
        </el-button>
      </li>
      <li class="option">
        <el-button class="big" ref="submit" @click="redirectTo('/ftu/disclaimer')" type="primary">
          Import a wallet from xpriv
        </el-button>
      </li>
      <li class="option">
        <el-button
          class="big"
          data-test="import-wallet"
          @click="redirectTo('/ftu/disclaimer')"
          type="primary"
        >
          Import a wallet from mnemonics
        </el-button>
      </li>
      <li class="option">
        <el-button class="big" data-test="back" @click="redirectTo('/welcome-back/wallet-list')">
          Back
        </el-button>
      </li>
    </ul>
  </Card>
</template>

<script>
import Card from '@/components/card/Card'

export default {
  name: 'WalletSeedTypeSelection',
  components: {
    Card,
  },
  methods: {
    redirectTo(path) {
      this.$router.push(path)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.wallet-seed-type {
  min-width: 500px;

  .text {
    margin-bottom: 32px;
    &.header {
      font-size: 20px;
    }
  }
  .options {
    .option {
      margin-bottom: 16px;
      &:last-of-type {
        margin-bottom: 0px;
      }
    }
  }
  .cancel-btn {
    text-align: right;
  }
  .create-wallet-text {
    color: $font-color-dark;
  }
}
</style>
