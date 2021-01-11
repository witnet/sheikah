<template>
  <div class="table">
    <p class="label">{{ this.$t('available') }}</p>
    <Amount :unit-light="true" class="amount" :amount="available" />
    <p class="label"
      >{{ this.$t('locked_balance_label') }}
      <el-tooltip trigger="hover" effect="light">
        <font-awesome-icon class="info" icon="info-circle" />
        <div slot="content" class="info-message">
          {{ this.$t('locked_balance_tooltip[0]') }}
          <a class="link" :href="balanceLockedUrl" target="_blank"
            >{{ this.$t('locked_balance_tooltip[1]') }}
            <font-awesome-icon
              class="external-link"
              icon="external-link-alt"/></a
          >.
        </div>
      </el-tooltip>
    </p>
    <Amount :unit-light="true" class="amount" :amount="locked" />
    <p class="label total">{{ this.$t('total_balance_label') }}</p>
    <Amount :unit-light="true" class="amount" :amount="total" />
  </div>
</template>

<script>
import { EXTERNAL_URL } from '@/constants'

import Amount from '@/components/Amount.vue'
/**
 * Show available, locked and total amount balances.
 */
export default {
  name: 'BalanceData',
  components: {
    Amount,
  },
  props: {
    /**
     * Specify in which unit display wits
     * @values wit, microWit, nanoWit
     */
    unit: {
      type: String,
      required: true,
    },
    /**
     * Available wits the user owns
     */
    available: {
      type: String,
      required: true,
    },
    /**
     * Locked wits that can't be spent yet
     */
    locked: {
      type: String,
      required: true,
    },
    /**
     * Total amount of wits: available + locked
     */
    total: {
      type: String,
      required: true,
    },
  },
  computed: {
    /**
     * External link to locked balances explanation
     */

    balanceLockedUrl() {
      return EXTERNAL_URL.BALANCE_LOCKED
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.info-message {
  color: var(--text-medium-emphasis);
  font-size: 13px;
  max-width: 250px;

  .link {
    color: var(--balance-link-color);
    text-decoration: underline;

    .external-link {
      font-size: 10px;
      margin-left: 4px;
    }
  }
}

.table {
  background-color: var(--balance-background);
  border-radius: 4px;
  box-shadow: var(--balance-box-shadow);
  display: grid;
  grid-template: auto auto auto / auto 1fr;
  margin-bottom: 10px;
  padding: 25px;
  row-gap: 12px;
  width: 100%;

  .label {
    color: var(--text-dark-background);
    font-size: 14px;

    &.total {
      font-size: 16px;
      font-weight: bold;
    }

    .info {
      color: var(--text-dark-background);
      font-size: 13px;
      margin-left: 4px;
    }
  }

  .amount {
    color: var(--text-dark-background);
    font-size: 16px;
    font-weight: bold;
    justify-self: end;
    width: max-content;

    .unit {
      font-size: 11px;
      font-weight: normal;
    }

    &.total {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>

<docs>
### Example

```jsx
  <BalanceData
    locked="10"
    available="40"
    total="50"
    unit="nanoWit"

    :style="{ width: '300px' }"
  />
```

</docs>
