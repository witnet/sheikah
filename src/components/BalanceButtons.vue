<template>
  <div class="group">
    <el-button
      ref="alt"
      type="primary"
      class="button"
      data-test="btn-send"
      @click="onSend"
      >{{ $t('send') }}</el-button
    >
    <el-button
      type="primary"
      class="button"
      data-test="btn-receive"
      @click="onReceive"
      >{{ $t('receive') }}</el-button
    >
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
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
      if (this.currentStatus === this.$t('synced')) {
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
    box-shadow: var(--balance-box-shadow);
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
