<template>
  <div class="amount-container" data-test="amount" @click="callChangeCurrency">
    <el-tooltip
      v-if="standardizeWitUnits(amount, currency).length > 13"
      :content="'hola'"
      placement="bottom"
      effect="light"
    >
    <span>
      {{ cropString(standardizeWitUnits(amount, currency), 13, 'middle') }}
    </span>
    </el-tooltip>
    <span
      v-else
    >
      {{ standardizeWitUnits(amount, currency) }}
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
import { standardizeWitUnits, cropString} from '@/utils'
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
