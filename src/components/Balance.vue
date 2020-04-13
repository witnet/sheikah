<template>
  <Fieldset title="Balance">
    <BalanceData :available="available" :locked="locked" :total="total" :currency="currency" />
    <BalanceButtons v-on:receive="onReceive" v-on:send="onSend" />

    <!-- Modal with Send form open when send button is clicked -->
    <Send v-if="isSendVisible" v-on:close="isSendVisible = false" />
  </Fieldset>
</template>

<script>
import { mapState } from 'vuex'

import BalanceButtons from '@/components/BalanceButtons'
import BalanceData from '@/components/BalanceData'
import Fieldset from '@/components/Fieldset'
import Send from '@/components/Send'

// Show available, locked and total amount.
// It also includes buttons to trigger receive and send actions.
export default {
  name: 'Balance',
  components: {
    BalanceButtons,
    BalanceData,
    Fieldset,
    Send,
  },
  data() {
    return {
      isSendVisible: false,
    }
  },
  methods: {
    onReceive() {},
    onSend() {
      this.isSendVisible = true
    },
  },
  computed: {
    ...mapState({
      currency: state => state.wallet.currency,
      balance: state => {
        return state.wallet.balance
      },
      available() {
        return this.balance.available || '0'
      },
      locked() {
        return this.balance.locked || '0'
      },
      total() {
        return this.balance.total || '0'
      },
    }),
  },
}
</script>

<docs>
Balance component. Show available, locked and total amount. It also includes buttons to trigger receive and send actions.

### Example

```jsx
  <Balance :style="{ width: '300px' }"/>
```

</docs>
