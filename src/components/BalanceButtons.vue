<template>
  <div class="group">
    <el-button
      ref="alt"
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
import { NETWORK_STATUS } from '@/constants'
export default {
  name: 'BalanceButtons',
  computed: {
    ...mapState({
      currentStatus: state => state.wallet.status.currentState,
    }),
  },
  methods: {
    ...mapMutations({
      setError: 'setError',
    }),
    onSend(e) {
      /**
       * Emitted when send button is clicked
       * @event send
       */
      if (this.currentStatus === NETWORK_STATUS.SYNCED) {
        this.$emit('send')
      } else {
        this.setError({
          name: 'syncing',
          error: this.$t('syncing_error'),
          message: this.$t('syncing_error_message'),
        })
        setTimeout(() => {
          e.target.blur()
        }, 2000)
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
