<template>
  <div class="amount-container" data-test="amount" @click="callChangeUnit">
    <el-tooltip
      v-if="number.length > 19"
      :content="number"
      placement="right"
      effect="light"
    >
      <span>
        {{ cropString(number, 20) }}
      </span>
    </el-tooltip>
    <span v-else>
      {{ number }}
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
import { mapState, mapMutations } from 'vuex'
import { WIT_UNIT } from '@/constants'
import { standardizeWitUnits, cropString, formatNumber } from '@/utils'

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
    number() {
      return this.formatNumber(
        this.standardizeWitUnits(this.amount, this.unit, WIT_UNIT.NANO, 2),
      )
    },
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
    color: var(--text-medium-emphasis);
    font-weight: normal;
  }

  .keep-light {
    color: var(--text-dark-background);
    font-weight: normal;
  }
}
</style>
