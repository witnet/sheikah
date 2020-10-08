<template>
  <div class="inputs-outputs">
    <div class="box inputs">
      <p data-test="inputs-title" class="title">INPUTS</p>
      <div v-for="(input, index) in inputs" :key="index" class="transaction">
        <p data-test="inputs-index" class="index"># {{ index }}</p>
        <Amount class="amount" data-test="inputs-value" :amount="input.value" />
        <p data-test="inputs-address" class="address">{{ input.address }}</p>
      </div>
    </div>
    <div class="box outputs">
      <p data-test="output-title" class="title">OUTPUTS</p>
      <div v-for="(output, index) in outputs" :key="index" class="transaction">
        <p :data-test="`output-index-${index}`" class="index"># {{ index }}</p>
        <Amount
          class="amount"
          :amount="output.value"
          :data-test="`output-value-${index}`"
        />
        <p :data-test="`output-address-${index}`" class="address">{{
          output.address
        }}</p>
        <p
          v-if="output.timelock !== 0"
          :data-test="`output-timelock-${index}`"
          class="timelock"
          >{{ changeDateFormat(Number(`${output.timelock}000`)) }}</p
        >
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
import { changeDateFormat } from '@/utils'

export default {
  name: 'InputsOutputs',
  components: {
    Amount,
  },
  props: {
    currency: {
      type: String,
      default: '',
    },
    fee: {
      type: Number,
      default: 0,
    },
    outputs: {
      type: Array,
      default: () => [],
    },
    inputs: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeDateFormat,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.inputs-outputs {
  background-color: $alt-grey-5;
  border: 1px solid $grey-4;
  display: grid;
  grid-template-columns: auto auto;
  margin-top: 24px;

  .inputs {
    border-right: 1px solid $grey-4;
  }

  .box {
    padding: 16px 32px;

    .title {
      color: $white;
      font-size: 10px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .transaction {
      align-items: center;
      display: grid;
      grid-template-columns: [col1-start] 40px [col2-start] auto;
      grid-template-rows: [row1-start] auto [row2-start] auto;
      margin-bottom: 8px;

      .index {
        color: $white;
        font-size: 13px;
        font-weight: 600;
        grid-area: index;
        grid-column: col1-start;
        grid-row: row1-start;
      }

      .amount {
        color: $white;
        font-size: 13px;
        font-weight: 600;
        grid-column: col2-start;
        grid-row: row1-start;

        .currency {
          color: $white;
          font-size: 13px;
        }
      }

      .address {
        color: $white;
        font-size: 12px;
        font-style: italic;
        grid-column: col2-start;
        grid-row: row2-start;
      }

      .timelock {
        color: $white;
        font-size: 12px;
        font-style: italic;
        grid-column: col2-start;
      }
    }
  }
}
</style>
