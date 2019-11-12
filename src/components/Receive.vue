<template>
  <div class="receive">
    <div>
      <div class="wrapper">
        <div data-test="last-address" id="last-generated-address" class="address">
          {{ lastAddress }}
        </div>
        <div
          data-test="copy-last-address"
          :class="[copied ? 'copied' : 'copy']"
          @click="copyAddress(lastAddressId)"
        >
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from '@/utils'

export default {
  name: 'receive',
  props: {
    addresses: Array,
  },
  data() {
    return {
      label: '',
      copied: false,
      text: 'Copy',
      lastAddressId: 'last-generated-address',
    }
  },
  methods: {
    copyAddress(id) {
      copyToClipboard(id)
      this.text = 'Copied'
      this.copied = true
    },
  },
  computed: {
    lastAddress() {
      return this.addresses[0].address
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.wrapper {
  margin: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .address {
    padding: 20px;
  }
  .copy {
    font-size: 16px;

    &:hover {
      cursor: pointer;
    }
  }
  .copied {
    font-size: 16px;
    color: green;

    &:active :focus {
      outline: none;
      border: none;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
