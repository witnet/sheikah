<template>
  <div class="receive">
    <div>
      <div class="wrapper">
        <div id="last-generated-address" class="address">
          {{ addresses[addresses.length - 1].address }}
        </div>
        <div :class="[copied ? 'copied' : 'copy']" @click="copyAddress()">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'receive',
  beforeCreate() {
    this.$store.dispatch('getAddresses')
  },
  data() {
    return {
      label: '',
      copied: false,
      text: 'Copy',
    }
  },
  methods: {
    copyAddress() {
      var textToCopy = document.getElementById('last-generated-address')
      var currentRange
      if (document.getSelection().rangeCount > 0) {
        currentRange = document.getSelection().getRangeAt(0)
        window.getSelection().removeRange(currentRange)
      } else {
        currentRange = false
      }
      var CopyRange = document.createRange()
      CopyRange.selectNode(textToCopy)
      window.getSelection().addRange(CopyRange)
      document.execCommand('copy')
      window.getSelection().removeRange(CopyRange)
      if (currentRange) {
        window.getSelection().addRange(currentRange)
      }
      this.text = 'Copied'
      this.copied = true
    },
    generateAddress() {
      this.$store.dispatch('generateAddress', {
        label: this.label,
      })
    },
  },
  computed: {
    addresses() {
      return this.$store.state.wallet.addresses
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
