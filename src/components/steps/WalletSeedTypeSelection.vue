<template>
  <Card data-test="header-1" :width="600" :height="550" class="wallet-seed-type-selection">
    <template v-slot:header>
      <div class="header">
        Create your wallet
      </div>
    </template>

    <p class="create-wallet-text">
      We will now help you create a new local wallet.
    </p>
    <ul class="options">
      <li>
        <RedirectionOption
          data-test="new-seed-option"
          link="/ftu/disclaimer"
          name="Create new seed phrase (RECOMMENDED)"
        />
      </li>
      <li>
        <RedirectionOption
          link="/ftu/disclaimer"
          name="Create a wallet prefilled with sample data (RECOMMENDED)"
        />
      </li>
      <li>
        <RedirectionOption link="" name="Import and advanced options" />
      </li>
      <li>
        <RedirectionOption link="/ftu/welcome" name="Cancel" />
      </li>
    </ul>
  </Card>
</template>

<script>
import Card from '@/components/card/Card'
import RedirectionOption from '@/components/RedirectionOption'

export default {
  name: 'WalletSeedTypeSelection',
  components: {
    Card,
    RedirectionOption,
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

.create-wallet-text {
  color: $font-color-dark;
}

.options {
  margin-top: 32px;
}
</style>
