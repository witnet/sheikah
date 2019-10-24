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
        <router-link class="link" to="/ftu/disclaimer">
          <Button
            data-test="new-seed-option"
            :onClick="function() {}"
            class="option create-wallet-option"
          >
            Create new seed phrase
            <p class="recommended-text">RECOMMENDED</p>
          </Button>
        </router-link>
      </li>
      <li>
        <router-link class="link" to="/ftu/disclaimer">
          <Button :onClick="function() {}" class="option create-wallet-option">
            Create a wallet prefilled with sample data
            <p class="recommended-text">
              RECOMMENDED
            </p>
          </Button>
        </router-link>
      </li>
      <li>
        <Button :onClick="function() {}" class="option create-wallet-option">
          Import and advanced options
        </Button>
      </li>
      <li>
        <router-link class="link" to="/ftu/welcome">
          <Button :onClick="function() {}" class="option create-wallet-option">
            Cancel
          </Button>
        </router-link>
      </li>
    </ul>
  </Card>
</template>

<script>
import Button from '@/components/Button'
import Card from '@/components/card/Card'

export default {
  name: 'WalletSeedTypeSelection',
  components: {
    Button,
    Card,
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
  color: $grey-1;
}

.create-wallet-text {
  color: $font-color-dark;
}

.options {
  margin-top: 32px;

  .router-link-active {
    text-decoration: none;
  }
}

.link {
  text-decoration: none;
}

.create-wallet-option {
  margin: 16px 0;
  width: 100%;
}

.recommended-text {
  color: $grey-3;
}
</style>
