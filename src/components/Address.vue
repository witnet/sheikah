<template>
  <p class="address" :style="{ fontSize: size }" data-test="address">
    {{ address }}
  </p>
</template>

<script>
import { cropString } from '@/utils'

export default {
  name: 'Address',
  props: {
    value: {
      type: String,
      default: '',
    },
    blind: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '12px',
    },
  },
  computed: {
    address() {
      return this.blind ? this.blindAddress : this.value
    },
    blindAddress() {
      return cropString(this.value, 36, 'middle')
    },
  },
}
</script>

<style scoped lang="scss">
.address {
  color: var(--text-medium-emphasis);
  font-family: 'Roboto Mono';
}
</style>
