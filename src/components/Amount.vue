<template>
  <div class="amount-container" data-test="amount" @click="callChangeCurrency">
    <span>
      {{
        formatNumber(standardizeWitUnits(amount, currency, WIT_UNIT.NANO, 2))
      }}
    </span>
    <span
      data-test="currency"
      class="currency"
      :class="{ ['keep-dark']: currencyDark, ['keep-light']: currencyLight }"
    >
      {{ currency }}
    </span>
  </div>
</template>

<script>
import { WIT_UNIT } from '@/constants'
import { standardizeWitUnits, cropString, formatNumber } from '@/utils'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Amount',
  props: {
    amount: {
      type: [String, Number],
      required: true,
    },
    currencyLight: {
      type: Boolean,
      default: false,
    },
    currencyDark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      WIT_UNIT,
    }
  },
  computed: {
    ...mapState({
      currency: state => state.wallet.currency,
    }),
  },
  methods: {
    callChangeCurrency(e) {
      this.changeCurrency()
      e.stopPropagation()
    },
    standardizeWitUnits,
    formatNumber,
    cropString,
    ...mapMutations(['changeCurrency']),
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.amount-container {
  width: fit-content;

  .amount {
    cursor: pointer;
  }

  .currency {
    color: inherit;
    font-size: 13px;
    margin-left: 4px;
  }

  .keep-dark {
    color: $alt-grey-5;
    font-weight: normal;
  }

  .keep-light {
    color: $white;
    font-weight: normal;
  }
}
</style>
