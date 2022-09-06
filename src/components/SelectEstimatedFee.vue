<template>
  <div v-if="estimationOptions" class="estimation-table">
    <div
      v-for="option in estimationOptions"
      :key="option.primaryText"
      class="estimation"
      :class="{
        selected: isSelectedFee(option),
        disabled: isDisabledFee(option),
      }"
      @click="selectFee(option)"
    >
      <p class="label capitalize">{{ option.label }}</p>
      <Amount
        v-if="option.transaction && option.transaction.metadata"
        class="priority"
        data-test="fee"
        :unit-dark="true"
        :amount="option.transaction.metadata.fee"
      />
      <p v-if="isDisabledFee(option)" class="error-message">
        {{ $t('not_enough_balance') }}
      </p>
      <p v-if="option.report" class="time">
        {{ getFormatedTime(option) }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Amount from '@/components/Amount.vue'
import { getTimeFromBlock, convertToSnakeCase } from '@/utils'

export default {
  name: 'SelectEstimatedFee',
  components: {
    Amount,
  },
  props: {
    estimationOptions: {
      type: Array,
      required: true,
    },
    selectedFee: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      locale: state => state.wallet.locale,
    }),
  },
  watch: {
    estimationOptions() {
      this.$emit('change', this.estimationOptions[0])
    },
  },
  methods: {
    getTimeFromBlock,
    getFormatedTime(option) {
      const key = Object.keys(option.report.time_to_block)[0]
      return `${this.$t(convertToSnakeCase(key))} ${getTimeFromBlock(
        Object.values(option.report.time_to_block)[0],
        this.locale,
      )}`
    },
    isSelectedFee(fee) {
      return fee.label === this.selectedFee.label
    },
    isDisabledFee(fee) {
      return fee.report && !fee.transaction
    },
    selectFee(fee) {
      if (!this.isDisabledFee(fee)) {
        this.$emit('change', fee)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/scroll.scss';

.estimation-table {
  display: grid;
  grid-gap: 16px;

  .estimation {
    align-items: center;
    background: var(--card-background);
    border: var(--card-border);
    border-radius: 2px;
    cursor: pointer;
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 100px 1fr 200px;
    justify-content: space-between;
    padding: 0 16px;

    .label {
      font-weight: 500;
      height: min-content;
      padding: 8px;
    }

    .priority {
      font-weight: 500;
      justify-self: center;
    }

    .time {
      color: var(--text-medium-emphasis);
      font-size: 12px;
      font-style: italic;
      font-weight: 600;
      justify-self: flex-end;
    }

    .error-message {
      color: var(--error-color);
      font-size: 12px;
    }

    &.selected {
      border: var(--card-active-border);
    }

    &.disabled {
      border: var(--address-card-border-used);
      cursor: not-allowed;
    }
  }
}
</style>
