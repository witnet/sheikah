<template>
  <Fieldset :title="$t('balance')">
    <BalanceData
      :available="available"
      :locked="locked"
      :total="total"
      :unit="unit"
    />
    <BalanceButtons @receive="onReceive" @send="onSend" />

    <!-- Modal with Send form open when send button is clicked -->
    <SendValueTransfer v-if="isSendVisible" @close="isSendVisible = false" />
  </Fieldset>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import BalanceButtons from '@/components/BalanceButtons'
import BalanceData from '@/components/BalanceData'
import Fieldset from '@/components/Fieldset'
import SendValueTransfer from '@/components/SendValueTransfer'

// Show available, locked and total amount.
// It also includes buttons to trigger receive and send actions.
export default {
  name: 'Balance',
  components: {
    BalanceButtons,
    BalanceData,
    Fieldset,
    SendValueTransfer,
  },
  data() {
    return {
      isSendVisible: false,
    }
  },
  computed: {
    ...mapState({
      unit: state => state.wallet.unit,
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
  methods: {
    ...mapMutations({
      receiveTransactionClicked: 'receiveTransactionClicked',
    }),
    onReceive() {
      this.receiveTransactionClicked()
    },
    onSend() {
      this.isSendVisible = true
    },
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
