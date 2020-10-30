<template>
  <div class="currency" @click="change">{{ currency }}</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppendCurrency',
  computed: {
    ...mapState({
      currency: state => state.wallet.currency,
      prevCurrency: state => state.wallet.prevCurrency,
    }),
  },
  methods: {
    ...mapMutations(['changeCurrency']),
    change() {
      this.changeCurrency()
      this.$emit('change-currency', this.prevCurrency, this.currency)
    },
  },
}
</script>

<style lang="scss" scoped>
.currency {
  cursor: pointer;
  user-select: none;
}
</style>
