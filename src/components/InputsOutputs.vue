<template>
  <div class="inputs-outputs">
    <div class="box inputs">
      <p data-test="inputs-title" class="title">INPUTS</p>
      <div class="transaction" v-for="(input, index) in inputs" :key="index">
        <p data-test="inputs-index" class="index"># {{ index }}</p>
        <Amount class="amount" data-test="inputs-value" :amount="input.value" />
        <p data-test="inputs-address" class="address">{{ input.address }}</p>
      </div>
    </div>
    <div class="box outputs">
      <p data-test="output-title" class="title">OUTPUTS</p>
      <div class="transaction" v-for="(output, index) in outputs" :key="index">
        <p :data-test="`output-index-${index}`" class="index"># {{ index }}</p>
        <Amount class="amount" :amount="output.value" :data-test="`output-value-${index}`" />
        <p :data-test="`output-address-${index}`" class="address">{{ output.address }}</p>
      </div>
      <div class="transaction">
        <p data-test="fee-title" class="index">FEE</p>
        <Amount class="amount" :amount="fee" data-test="fee-amount" />
        <p class="address">{{ fee.address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Amount from '@/components/Amount.vue'

export default {
  name: 'Transaction',
  props: {
    currency: String,
    fee: Number,
    outputs: Array,
    inputs: Array,
  },
  components: {
    Amount,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.inputs-outputs {
  margin-top: 24px;
  background-color: $alt-grey-5;
  border: 1px solid $grey-4;
  display: grid;
  grid-template-columns: auto auto;
  .inputs {
    border-right: 1px solid $grey-4;
  }
  .box {
    padding: 16px 32px;
    .title {
      margin-bottom: 16px;
      color: $white;
      font-size: 10px;
      font-weight: bold;
    }
    .transaction {
      align-items: center;
      display: grid;
      grid-template-columns: [col1-start] 30px [col2-start] auto;
      grid-template-rows: [row1-start] auto [row2-start];
      margin-bottom: 8px;

      .index {
        grid-area: index;
        font-size: 13px;
        font-weight: 600;
        color: $white;
        grid-column: col1-start;
        grid-row: row1-start;
      }
      .amount {
        grid-column: col2-start;
        grid-row: row1-start;
        font-size: 13px;
        font-weight: 600;
        color: $white;
        .currency {
          font-size: 13px;
          color: $white;
        }
      }
      .address {
        font-size: 12px;
        font-style: italic;
        color: $white;
        grid-column: col2-start;
        grid-row: row2-start;
      }
    }
  }
}
</style>
