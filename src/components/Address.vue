<template>
  <div v-if="address" class="address container">
    <p
      v-if="withoutLink"
      class="address"
      :style="{ fontSize: size }"
      data-test="address"
    >
      {{ address }}
    </p>
    <a
      v-else
      data-test="address"
      :href="addressUrl"
      target="_blank"
      class="address"
      :style="{ fontSize: size }"
    >
      {{ address }}
      <font-awesome-icon class="external-link" icon="external-link-alt" />
    </a>
  </div>
</template>

<script>
import { cropString } from '@/utils'
import { EXTERNAL_URL } from '@/constants'

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
    withoutLink: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '12px',
    },
  },
  computed: {
    addressUrl() {
      return `${EXTERNAL_URL.WITNET_BLOCK_EXPLORER}/search/${this.value}`
    },
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
.container {
  align-items: center;
  display: flex;
}

.address {
  color: inherit;
  font-family: 'Roboto Mono';

  .external-link {
    color: inherit;
    font-size: 8px;
    margin-left: 4px;
  }
}
</style>
