<template>
  <div class="currency" @click="changeCurrency">{{ currency }}</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppendCurrency',
  computed: {
    ...mapState({
      currency: state => state.wallet.currency,
    }),
  },
  methods: {
    ...mapMutations(['changeCurrency']),
  },
}
</script>

<style lang="scss" scoped>
.currency {
  cursor: pointer;
  user-select: none;
}
</style>
