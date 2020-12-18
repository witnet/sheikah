<template>
  <div class="amount-container" data-test="amount" @click="callChangeUnit">
    <span>
      {{ formatNumber(standardizeWitUnits(amount, unit, WIT_UNIT.NANO, 2)) }}
    </span>
    <span
      data-test="unit"
      class="unit"
      :class="{ ['keep-dark']: unitDark, ['keep-light']: unitLight }"
    >
      {{ unit }}
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
    unitLight: {
      type: Boolean,
      default: false,
    },
    unitDark: {
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
      unit: state => state.wallet.unit,
    }),
  },
  methods: {
    callChangeUnit(e) {
      this.changeUnit()
      e.stopPropagation()
    },
    standardizeWitUnits,
    formatNumber,
    cropString,
    ...mapMutations(['changeUnit']),
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

  .unit {
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
