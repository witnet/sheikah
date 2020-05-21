<template>
  <FrameOutside @click="hideDetails" @focus="hideDetails">
    <div class="border">
      <div class="transaction" @click="showDetails = !showDetails">
        <img data-test="negative-positive" class="icon" :src="arrowIcon" alt="" />
        <Amount
          :keep="true"
          data-test="amount"
          class="amount"
          :class="[origin.toLowerCase()]"
          :amount="amount"
        />

        <div v-if="transactionType === 'value_transfer'" class="address-container">
          <p data-test="origin" class="origin">{{ origin }}</p>
          <p data-test="address" class="address">{{ address }}</p>
        </div>
        <div v-else-if="transactionType === 'data_request'" class="address-container">
          <p data-test="transaction-type" class="address">Data request</p>
        </div>
        <div v-if="transactionType === 'mint'" class="address-container">
          <p data-test="transaction-type" class="address">Mint</p>
        </div>

        <div class="">
          <p data-test="time-ago" class="date">{{ timeAgo }}</p>
        </div>
      </div>
      <div v-if="showDetails">
        <TransactionDetails
          data-test="transaction-details"
          :transactionType="transactionType"
          :id="id"
          :block="block"
          :date="date"
          :witnesses="witnesses"
          :rewards="rewards"
          :rounds="rounds"
          :state="state"
          :reveals="reveals"
          :result="result"
        />
        <InputsOutputs
          data-test="inputs-outputs"
          :fee="fee"
          :currency="currency"
          :inputs="inputs"
          :outputs="outputs"
        />
      </div>
    </div>
  </FrameOutside>
</template>

<script>
import FrameOutside from '@/components/FrameOutside'
import TransactionDetails from '@/components/TransactionDetails'
import InputsOutputs from '@/components/InputsOutputs'
import Amount from '@/components/Amount.vue'

export default {
  name: 'Transaction',
  components: {
    FrameOutside,
    TransactionDetails,
    InputsOutputs,
    Amount,
  },
  data() {
    return {
      showDetails: false,
    }
  },
  props: {
    currency: String,
    amount: [String, Number],
    block: [String, Number],
    date: String,
    timeAgo: String,
    label: String,
    fee: Number,
    id: String,
    outputs: Array,
    inputs: Array,
    type: String,
    witnesses: Object,
    rewards: Object,
    rounds: Object,
    state: String,
    reveals: Array,
    result: String,
    transactionType: String,
  },
  methods: {
    hideDetails() {
      this.showDetails = false
    },
  },
  computed: {
    address() {
      return this.inputs.length > 1 ? 'several addresses' : this.inputs[0].address
    },
    origin() {
      return this.type === 'POSITIVE' ? 'From' : 'To'
    },
    arrowIcon() {
      return this.type === 'POSITIVE'
        ? require('@/resources/svg/positive.svg')
        : require('@/resources/svg/negative.svg')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.border {
  border-bottom: 1px solid $grey-1;
}
.transaction {
  padding: 16px;
  display: grid;
  grid-template-columns: max-content max-content auto 100px;
  grid-column-gap: 24px;
  align-items: center;
  cursor: pointer;

  .amount,
  .address {
    display: flex;
    align-items: center;
  }

  .amount {
    font-size: 16px;
    font-weight: bold;
    display: block;
    &.from {
      color: $green-5;
    }

    &.to {
      color: $red-4;
    }
  }

  .address-container {
    align-items: center;
    display: flex;
    justify-content: center;
    color: $alt-grey-5;
    .origin {
      margin-right: 8px;
      font-size: 12px;
      color: $grey-4;
      font-weight: 600;
    }
    .address {
      font-size: 13px;
      font-style: italic;
    }
  }

  .date {
    font-size: 12px;
    color: $grey-4;
    font-weight: 600;
    font-style: italic;
    text-align: right;
  }

  .block {
    color: $alt-grey-5;
    font-size: 13px;
  }
}
</style>

<docs>
### Example

```jsx
  <Transaction
    currency="nanoWits"
    :amount="123"
    block="511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f"
    :border="false"
    date="JAN 19, 1970 @ 10:00:31"
    timeAgo="33 minutes ago"
    :fee="12"
    id="600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109"
    :outputs="[
        { value: '123', address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq' },
        { value: 499999999865, address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }
      ]"
    :inputs="[{ value: 500000000000, address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }]"
    type="POSITIVE"
    transactionType="value_transfer"
  />
```

```jsx
  <Transaction
    currency="nanoWits"
    :amount="123"
    block="511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f"
    :border="false"
    date="JAN 19, 1970 @ 10:00:31"
    timeAgo="33 minutes ago"
    :fee="12"
    id="600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109"
    :outputs="[
        { value: '123', address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq' },
        { value: 499999999865, address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }
      ]"
    :inputs="[{ value: 500000000000, address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }]"
    type="NEGATIVE"
    state="IN PROGRESS"
    transactionType="data_request"
  />
```

```jsx
  <Transaction
    currency="nanoWits"
    :amount="123"
    block="511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f"
    :border="false"
    date="JAN 19, 1970 @ 10:00:31"
    timeAgo="33 minutes ago"
    :fee="12"
    id="600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109"
    :outputs="[
        { value: '123', address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq' },
        { value: 499999999865, address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }
      ]"
    :inputs="[{ value: 500000000000, address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }]"
    type="NEGATIVE"
    state="IN PROGRESS"
    transactionType="data_request"
    :witnesses="{ min: 'min', backup: 'backup' }"
    :rewards="{ witness: 'reward', miners: 'reward' }"
    :rounds="{ commit: 'round', reveal: 'round' }"
    :reveals="[
        {
          in_consensus: true,
          address: 'address',
          result: 'result',
        },
        { in_consensus: false, address: 'address', result: 'result' }
      ]"
    result="RadonInteger(52)"
  />
```
</docs>
