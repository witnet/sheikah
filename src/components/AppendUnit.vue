<template>
  <div class="unit" :class="{ static: staticUnit }" @click="change">
    {{ staticUnit || unit }}
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppendUnit',
  props: {
    blockUnit: {
      type: Boolean,
      default: false,
    },
    staticUnit: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState({
      unit: state => state.wallet.unit,
      prevUnit: state => state.wallet.prevUnit,
    }),
  },
  methods: {
    ...mapMutations(['changeUnit']),
    change() {
      if (!this.staticUnit) {
        this.changeUnit()
        this.$emit('change-unit', this.prevUnit, this.unit)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.unit {
  cursor: pointer;
  user-select: none;

  &.static {
    cursor: auto;
  }
}
</style>
