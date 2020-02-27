<template>
  <div class="receive">
    <div>
      <div class="wrapper">
        <div data-test="last-address" id="last-generated-address" class="address">
          {{ lastAddress }}
        </div>
        <el-button
          data-test="copy-last-address"
          :type="copied ? 'success' : 'primary'"
          @click="copyAddress(lastAddressId)"
        >
          {{ text }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from '@/utils'

export default {
  name: 'receive',
  props: {
    lastAddress: String,
    modalShown: Boolean,
  },
  data() {
    return {
      label: '',
      copied: false,
      text: 'Copy',
      lastAddressId: 'last-generated-address',
    }
  },
  watch: {
    modalShown() {
      this.copied = false
      this.text = 'Copy'
    },
  },
  methods: {
    copyAddress(id) {
      copyToClipboard(id)
      this.text = 'Copied'
      this.copied = true
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
    padding: 24px;
    font-size: 18px;
  }
  .copy {
    font-size: 16px;

    &:hover {
      cursor: pointer;
    }
  }
  .copied {
    font-size: 16px;
    color: $green;

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
