<template>
  <NavigationCard
    data-test="create-your-wallet"
    class="wallet-disclaimer"
    title="Create your wallet"
    :previousStep="previousStep"
    previousText="Back"
    nextText="I will be careful, I promise!"
  >
    <p class="create-wallet-text">
      We will now help you create a new local wallet.
    </p>
    <ul class="options">
      <li class="option">
        <RedirectionOption
          type="forward"
          data-test="new-seed-option"
          link="/ftu/disclaimer"
          name="Create new seed phrase (RECOMMENDED)"
        />
      </li>
      <li class="option">
        <RedirectionOption
          type="forward"
          link="/ftu/disclaimer"
          name="Create a wallet prefilled with sample data (RECOMMENDED)"
        />
      </li>
      <li class="option">
        <RedirectionOption
          type="forward"
          link="/ftu/import-wallet"
          name="Import and advanced options"
        />
      </li>
    </ul>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import RedirectionOption from '@/components/RedirectionOption'

export default {
  name: 'WalletSeedTypeSelection',
  components: {
    NavigationCard,
    RedirectionOption,
  },
  methods: {
    previousStep() {
      this.$router.push('/ftu/welcome')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.header {
  align-items: center;
  background: $purple-6;
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
