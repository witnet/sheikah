<template>
  <div class="table">
    <p class="label">Available</p>
    <p class="amount">
      {{ available }} <span class="unit">{{ currency }}</span>
    </p>

    <p class="label">Locked</p>
    <p class="amount">
      {{ locked }} <span class="unit">{{ currency }}</span>
    </p>

    <p class="label total">Total</p>
    <p class="amount total">
      {{ total }} <span class="unit">{{ currency }}</span>
    </p>
  </div>
</template>

<script>
/**
 * Show available, locked and total amount balances.
 */
export default {
  name: 'BalanceData',
  props: {
    /**
     * Specify in which unit display wits
     * @values wit, microWit, nanoWit
     */
    currency: {
      type: String,
      requried: true,
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
  width: 100%;
  padding: 25px;
  background-color: $purple-5;
  border-radius: 4px;
  box-shadow: 0 4px 4px rgb(155, 181, 224, 0.1);

  display: grid;
  grid-template: auto auto auto / auto 1fr;
  row-gap: 15px;
  margin-bottom: 10px;
  .label {
    font-size: 14px;
    color: $white;

    &.total {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .amount {
    color: $white;
    justify-self: end;
    width: max-content;
    font-size: 14px;
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
    currency="nanoWit"

    :style="{ width: '300px' }"
  />
```

</docs>
