<template>
  <div class="estimation-table">
    <div
      v-for="option in estimationOptions"
      :key="option.primaryText"
      class="estimation"
      :class="{
        selected: isSelectedFee(option),
        disabled: isDisabledFee(option),
      }"
      :data-test="`option-fee`"
      @click="selectFee(option)"
    >
      <p class="label capitalize">{{ option.label }}</p>
      <Amount
        v-if="option.transaction && !option.transaction.error"
        class="priority"
        data-test="fee"
        :unit-dark="true"
        :disable-change="true"
        :amount="
          isDrTx ? option.transaction.fee : option.transaction.metadata.fee
        "
      />
      <p v-if="isDisabledFee(option)" class="error-message">
        {{ option.transaction.error }}
      </p>
      <p v-if="option.report" class="time">
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
    getTimeDuration,
    isSelectedFee(fee) {
      return fee.label === this.selectedFee.label
    },
    isDisabledFee(fee) {
      return fee.transaction && fee.transaction.error
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
    background: var(--select-box-background);
    border: var(--select-box-border);
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
