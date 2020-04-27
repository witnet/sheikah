<template>
  <div class="inputs-outputs">
    <div class="box inputs">
      <p data-test="inputs-title" class="title">INPUTS</p>
      <div class="tx" v-for="(input, index) in inputs" :key="input.address">
        <p data-test="inputs-index" class="index"># {{ index }}</p>
        <p data-test="inputs-value" class="amount">
          {{ input.value }}<span data-test="currency" class="currency"> {{ currency }} </span>
        </p>
        <p data-test="inputs-address" class="address">{{ input.address }}</p>
      </div>
    </div>
    <div class="box outputs">
      <p data-test="output-title" class="title">OUTPUTS</p>
      <div class="tx" v-for="(output, index) in outputs" :key="output.address">
        <p :data-test="`output-index-${index}`" class="index"># {{ index }}</p>
        <p :data-test="`output-value-${index}`" class="amount">
          {{ output.value }}<span data-test="currency" class="currency"> {{ currency }} </span>
        </p>
        <p :data-test="`output-address-${index}`" class="address">{{ output.address }}</p>
      </div>
      <div class="tx">
        <p data-test="fee-title" class="index">FEE</p>
        <p data-test="fee-amount" class="amount">
          {{ fee }}<span data-test="currency" class="currency"> {{ currency }} </span>
        </p>
        <p class="address">{{ fee.address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transaction',
  props: {
    currency: String,
    fee: Number,
    outputs: Array,
    inputs: Array,
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
    .tx {
      margin-bottom: 8px;
      display: grid;
      grid-template-columns: [col1-start] 30px [col2-start] auto;
      grid-template-rows: [row1-start] auto [row2-start];
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
