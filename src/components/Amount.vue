<template>
  <span data-test="amount" @click="changeCurrency">
    {{ standardizeWitUnits(amount, currency) }}
    <span data-test="currency" class="currency" :class="{ ['keep-dark']: currencyDark, ['keep-light']: currencyLight }">
      {{ currency }}
    </span>
  </span>
</template>

<script>
import { standardizeWitUnits } from '@/utils'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Transaction',
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
    standardizeWitUnits,
    ...mapMutations(['changeCurrency'])
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

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
</style>
