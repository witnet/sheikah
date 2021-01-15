<template>
  <div class="inputs-outputs">
    <div class="box inputs">
      <p data-test="inputs-title" class="title">{{
        this.$t('inputs').toUpperCase()
      }}</p>
      <div v-for="(input, index) in inputs" :key="index" class="transaction">
        <p data-test="inputs-index" class="index"># {{ index }}</p>
        <Amount class="amount" data-test="inputs-value" :amount="input.value" />
        <Address
          class="address"
          :value="input.address"
          size="11px"
          data-test="inputs-address"
        />
      </div>
    </div>
    <div class="box outputs">
      <p data-test="output-title" class="title">{{
        this.$t('outputs').toUpperCase()
      }}</p>
      <div v-for="output in outputs" :key="output.index" class="transaction">
        <p :data-test="`output-index-${output.index}`" class="index"
          ># {{ output.index }}</p
        >
        <Amount
          class="amount"
          :amount="output.value"
          :data-test="`output-value-${output.index}`"
        />
        <Address
          class="address"
          :value="output.address"
          size="11px"
          :data-test="`output-address-${output.index}`"
        />
        <p
          v-if="output.timelock !== 0"
          :data-test="`output-timelock-${output.index}`"
          class="timelock"
          >{{ changeDateFormat(Number(`${output.timelock}000`)) }}</p
        >
      </div>
      <div class="transaction">
        <p data-test="fee-title" class="index">{{
          this.$t('fee').toUpperCase()
        }}</p>
        <Amount class="amount" :amount="fee" data-test="fee-amount" />
        <Address class="address" :value="fee.address" size="11px" />
      </div>
    </div>
  </div>
</template>

<script>
import Amount from '@/components/Amount.vue'
import Address from '@/components/Address.vue'
import { changeDateFormat } from '@/utils'

export default {
  name: 'InputsOutputs',
  components: {
    Amount,
    Address,
  },
  props: {
    unit: {
      type: String,
      default: '',
    },
    fee: {
      type: String,
      default: '0',
    },
    outputs: {
      type: Array,
      default: () => [],
    },
    genesis: {
      type: Boolean,
      default: false,
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
  background-color: var(--transaction-details-background);
  border: var(--transaction-details-border);
  display: grid;
  grid-template-columns: auto auto;
  margin-top: 24px;

  .inputs {
    border-right: 1px solid var(--transaction-details-color);
  }

  .box {
    padding: 16px 32px;

    .title {
      color: var(--transaction-details-color);
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
        color: var(--transaction-details-color);
        font-size: 13px;
        font-weight: 600;
        grid-area: index;
        grid-column: col1-start;
        grid-row: row1-start;
      }

      .amount {
        color: var(--transaction-details-color);
        font-size: 13px;
        font-weight: 600;
        grid-column: col2-start;
        grid-row: row1-start;

        .unit {
          color: var(--transaction-details-color);
          font-size: 13px;
        }
      }

      .address {
        color: var(--transaction-details-color);
        grid-column: col2-start;
        grid-row: row2-start;
      }

      .timelock {
        color: var(--transaction-details-color);
        font-size: 12px;
        font-style: italic;
        grid-column: col2-start;
      }
    }
  }
}
</style>
