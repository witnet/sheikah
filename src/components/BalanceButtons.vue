<template>
  <div class="group">
    <el-button @click="onSend" type="primary" class="button" data-test="btn-send">Send</el-button>
    <el-button @click="onReceive" type="primary" class="button" data-test="btn-receive"
      >Receive</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'BalanceButtons',
  methods: {
    onSend() {
      /**
       * Emitted when send button is clicked
       * @event send
       */
      this.$emit('send')
    },
    onReceive() {
      this.$store.dispatch('generateAddress', { label: '' })
      /**
       * Emitted when send button is clicked
       * @event receive
       */
      this.$emit('receive')
    },
  },
}
</script>

<style scoped lang="scss">
.group {
  display: grid;
  grid-template: auto / 1fr 1fr;

  .button {
    box-shadow: 0 4px 4px rgb(155, 181, 224, 0.1);
  }
}
</style>

<docs>
### Example

```jsx
  <BalanceButtons
    :style="{ width: '300px' }"
  />
```

</docs>
