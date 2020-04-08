<template>
  <NavigationCard
    data-test="create-your-wallet"
    class="wallet-disclaimer"
    title="Create, import, or recover a wallet"
  >
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
        <el-button
          class="big"
          ref="submit"
          @click="redirectTo('/ftu/disclaimer')"
          type="primary"
        >
          Import a wallet from xpriv
        </el-button>
      </li>
      <li class="option">
        <el-button
          class="big"
          data-test="import-wallet"
          @click="redirectTo('/ftu/import-wallet')"
          type="primary"
        >
          Import a wallet from mnemonics
        </el-button>
      </li>
      <li class="option">
        <el-button
          class="big"
          data-test="back"
          @click="redirectTo('/ftu/welcome')"
        >
          Back
        </el-button>
      </li>
    </ul>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'WalletSeedTypeSelection',
  components: {
    NavigationCard,
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

.header {
  align-items: center;
  background: $sheikah-gradient;
  display: flex;
  font-size: 24px;
  font-weight: 100;
  height: 100px;
  padding: 0 24px;
  color: $white;
}

.cancel-btn {
  text-align: right;
}

.create-wallet-text {
  color: $font-color-dark;
}

.options {
  margin-top: 24px;
  .option {
    margin-bottom: 16px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
}
</style>
