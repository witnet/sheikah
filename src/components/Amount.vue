<template>
  <span data-test="amount">
    {{ standardizeWitUnits(amount, currency) }}
    <span data-test="currency" class="currency" :class="{ keep: keep }">
      {{ currency }}
    </span>
  </span>
</template>

<script>
import { standardizeWitUnits } from '@/utils'
import { mapState } from 'vuex'

export default {
  name: 'Transaction',
  props: {
    amount: {
      type: Number,
      required: true,
    },
    keep: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    standardizeWitUnits,
  },
  computed: {
    ...mapState({
      currency: state => state.wallet.currency,
    }),
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
.currency {
  margin-left: 4px;
  color: inherit;
  font-size: 13px;
}

.keep {
  color: $alt-grey-5;
  font-weight: normal;
}
</style>
