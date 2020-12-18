<template>
  <div class="unit" @click="change">{{ unit }}</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppendUnit',
  computed: {
    ...mapState({
      unit: state => state.wallet.unit,
      prevUnit: state => state.wallet.prevUnit,
    }),
  },
  methods: {
    ...mapMutations(['changeUnit']),
    change() {
      this.changeUnit()
      this.$emit('change-unit', this.prevUnit, this.unit)
    },
  },
}
</script>

<style lang="scss" scoped>
.unit {
  cursor: pointer;
  user-select: none;
}
</style>
