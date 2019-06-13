<template>
  <BaseCard class="wallet-seed-type-selection">
    <div class="selection-container">
      <h5 class="selection-title">Create your Wallet</h5>
    </div>
    <div class="content-wallet">
    <p class="create-wallet-text">
      We will now help you create a new local wallet.
    </p>
    <ul class="options">
      <li>
        <router-link class="link" to="/ftu/disclaimer">
          <Button class="option create-wallet-option">
            Create new seed phrase
            <p class="recommended-text"> RECOMMENDED </p>
          </Button>
        </router-link>
      </li>
      <li>
        <router-link class="link" to="/ftu/disclaimer">
          <Button class="option create-wallet-option">
            Create a wallet prefilled with sample data
            <p class="recommended-text">
              RECOMMENDED
            </p>
          </Button>
        </router-link>
      </li>
      <li>
        <Button class="option create-wallet-option">
          Import and advanced options
        </Button>
      </li>
      <li>
        <router-link class="link" to="/ftu/welcome">
          <Button class="option create-wallet-option">
            Cancel
          </Button>
        </router-link>
      </li>
    </ul>
    </div>
  </BaseCard>
</template>

<script>
import Button from '@/components/Button'
import BaseCard from '@/components/BaseCard'

export default {
  name: 'WalletSeedTypeSelection',
  components: {
    Button,
    BaseCard,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.selection-container {
  align-items: center;
  background: $sheikah-gradient;
  border-bottom: solid 1px $grey-4;
  color: $grey-2;
  display: flex;
  flex-flow: row nowrap;
  font-size: $loading-modal-title-font-size;
  font-size: 19px;
  font-weight: 100;
  height: 100px;
}

.wallet-seed-type-selection .selection-container .selection-title {
  margin-left: 38px;
}

.content-wallet {
  padding: 40px;
}

.create-wallet-text {
  color: $font-color-dark;
}

.options {
  margin-top: 30px;
  .router-link-active {
    text-decoration: none;
  }
}

.link {
  text-decoration: none;
}

.create-wallet-option {
  margin: 10px;
  margin-left: 0;
  width: 500px;
}

.recommended-text {
  color: $grey-7;
}
</style>
