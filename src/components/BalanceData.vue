<template>
  <div class="table">
    <p class="label">Available</p>
    <p class="amount">
      {{ available }} <span class="currency">{{ currency }}</span>
    </p>

    <p class="label">Locked</p>
    <p class="amount">
      {{ locked }} <span class="currency">{{ currency }}</span>
    </p>

    <p class="label total">Total</p>
    <Amount :currencyLight="true" class="amount" :amount="total" />
  </div>
</template>

<script>
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
     * Specify in which currency display wits
     * @values wit, microWit, nanoWit
     */
    currency: {
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
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.table {
  background-color: $purple-5;
  border-radius: 4px;
  box-shadow: 0 4px 4px rgb(155, 181, 224, 0.1);
  display: grid;
  grid-template: auto auto auto / auto 1fr;
  margin-bottom: 10px;
  padding: 25px;
  row-gap: 15px;
  width: 100%;

  .label {
    color: $white;
    font-size: 14px;

    &.total {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .amount {
    color: $white;
    font-size: 16px;
    font-weight: bold;
    justify-self: end;
    width: max-content;

    .currency {
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
    currency="nanoWit"

    :style="{ width: '300px' }"
  />
```

</docs>
