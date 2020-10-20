<template>
  <div class="group">
    <el-button
      type="primary"
      class="button"
      data-test="btn-send"
      @click="onSend"
      >Send</el-button
    >
    <el-button
      type="primary"
      class="button"
      data-test="btn-receive"
      @click="onReceive"
      >Receive</el-button
    >
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'BalanceButtons',
  computed: {
    ...mapState({
      synced: state => state.wallet.status.synced,
    }),
  },
  methods: {
    ...mapMutations({
      setError: 'setError',
    }),
    onSend() {
      /**
       * Emitted when send button is clicked
       * @event send
       */
      if (this.synced) {
        this.$emit('send')
      } else {
        this.setError({
          name: 'syncing',
          error: 'The node is not yet synced',
          message: 'Wait till the synchronization is finished',
        })
      }
    },
    onReceive() {
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
