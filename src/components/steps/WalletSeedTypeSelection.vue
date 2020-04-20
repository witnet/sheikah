<template>
  <NavigationCard
    data-test="header-1"
    class="wallet-disclaimer"
    title="Create, import, or recover a wallet"
  >
    <ul class="options">
      <li>
        <RedirectionOption
          type="forward"
          data-test="new-seed-option"
          link="/ftu/disclaimer"
          name="Create new seed phrase (RECOMMENDED)"
        />
      </li>
      <li>
        <RedirectionOption
          type="forward"
          link="/ftu/disclaimer"
          name="Create a wallet prefilled with sample data (RECOMMENDED)"
        />
      </li>
      <li>
        <RedirectionOption
          type="forward"
          link="/ftu/import-wallet"
          name="Import and advanced options"
        />
      </li>
      <li class="cancel-btn">
        <router-link to="/ftu/welcome">
          <el-button data-test="cancel-tx" type="text">
            Cancel
          </el-button>
        </router-link>
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
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.header {
  align-items: center;
  background: $purple-4;
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
  margin-top: 32px;
}
</style>
