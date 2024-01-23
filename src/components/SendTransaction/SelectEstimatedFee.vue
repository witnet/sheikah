<template>
  <div class="estimation-table">
    <div
      v-for="option in estimationOptions"
      :key="option.label"
      class="estimation"
      :class="{
        recommended: isRecommendedOption(option),
        selected: isSelectedFee(option),
        disabled: isDisabledFee(option),
      }"
      :data-test="`option-fee-${option.label}`"
      @click="selectFee(option)"
    >
      <p v-if="isRecommendedOption(option)" class="recommended-tag"
        >{{ $t('recommended') }}
      </p>
      <p class="label capitalize">{{ option.label }}</p>
      <Amount
        v-if="isTransactionGenerated(option)"
        class="priority"
        data-test="fee"
        :unit-dark="true"
        :disable-change="true"
        :amount="
          isDrTx ? option.transaction.fee : option.transaction.metadata.fee
        "
      />
      <p
        v-if="feeEstimationReportError && !isCustomFee(option)"
        class="error-message"
      >
        {{ feeEstimationReportError.message }}
      </p>
      <p v-else-if="isDisabledFee(option)" class="error-message">
        {{ option.transaction.error }}
      </p>
      <p v-if="isReportGenerated(option)" class="time">
        {{ getTimeDuration(option.report.time_to_block, locale) }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Amount from '@/components/Amount.vue'
import { getTimeDuration } from '@/utils'

export default {
  name: 'SelectEstimatedFee',
  components: {
    Amount,
  },
  props: {
    isDrTx: {
      type: Boolean,
      required: true,
    },
    estimationOptions: {
      type: Array,
      required: true,
    },
    selectedFee: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      recommendedOption: this.estimationOptions[2],
    }
  },
  computed: {
    ...mapState({
      locale: state => state.wallet.locale,
      feeEstimationReportError: state =>
        state.wallet.errors.getFeeEstimationReport,
    }),
  },
  watch: {
    selectedFee(fee) {
      if (this.isDisabledFee(fee)) {
        this.$emit('change', { label: 'custom' })
      }
    },
  },
  mounted() {
    if (this.feeEstimationReportError && this.selectedFee?.label !== 'custom') {
      this.$emit('change', { label: 'custom' })
    } else if (this.selectedFee?.label) {
      this.$emit('change', this.selectedFee)
    } else {
      this.$emit('change', this.recommendedOption)
    }
  },
  methods: {
    getTimeDuration,
    isSelectedFee(fee) {
      return fee.label === this.selectedFee?.label
    },
    isTransactionGenerated(option) {
      return option.transaction && !option.transaction.error
    },
    isReportGenerated(option) {
      return option.report && option.report.time_to_block
    },
    isRecommendedOption(fee) {
      return fee.label === this.recommendedOption.label
    },
    isCustomFee(fee) {
      return fee.label === 'custom'
    },
    isDisabledFee(fee) {
      return (
        (fee.transaction && fee.transaction.error) ||
        (this.feeEstimationReportError && !this.isCustomFee(fee))
      )
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
  width: 100%;

  .estimation {
    align-items: center;
    background: var(--select-box-background);
    border: var(--select-box-border);
    border-radius: 2px;
    cursor: pointer;
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 100px 1fr 200px;
    justify-content: space-between;
    padding: 0 16px;
    position: relative;

    .recommended-tag {
      background: var(--card-background);
      color: var(--select-box-label);
      font-size: 12px;
      left: 8px;
      padding: 0 4px;
      position: absolute;
      top: -14px;
    }

    .label {
      font-weight: 500;
      height: min-content;
      padding: 8px;
    }

    .priority {
      color: var(--text-medium-emphasis);
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
      justify-self: center;
      line-height: 1.4;
      padding: 4px 0;
      word-break: break-word;
    }

    &.selected {
      border: var(--select-box-active-border);

      .label {
        color: var(--select-box-active-color);
      }
    }

    &.disabled {
      border: var(--select-box-error-border);
      cursor: not-allowed;
    }
  }
}
</style>
