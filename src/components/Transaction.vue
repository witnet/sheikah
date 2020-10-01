<template>
  <FrameOutside @click="hideDetails" @focus="hideDetails">
    <div class="border" :class="{ locked: timelocked }">
      <div class="transaction" @click="showDetails = !showDetails">
        <img
          data-test="negative-positive"
          class="icon"
          :src="arrowIcon"
          alt=""
        />
        <Amount
          :currency-dark="true"
          data-test="amount"
          class="amount"
          :class="[origin.toLowerCase()]"
          :amount="amount"
        />

        <div
          v-if="transactionType === 'value_transfer'"
          class="address-container"
        >
          <p data-test="origin" class="origin">{{ origin }}</p>
          <p data-test="address" class="address">{{ address }}</p>
        </div>
        <div
          v-else-if="transactionType === 'data_request'"
          class="address-container"
        >
          <p data-test="transaction-type" class="address">Data request</p>
        </div>
        <div v-else-if="transactionType === 'tally'" class="address-container">
          <p data-test="transaction-type" class="address">Tally</p>
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
          :id="id"
          data-test="transaction-details"
          :transaction-type="transactionType"
          :block="block"
          :epoch="epoch"
          :date="date"
          :witnesses="witnesses"
          :rewards="rewards"
          :rounds="rounds"
          :state="state"
          :reveals="reveals.length ? reveals : null"
          :result="result"
          :timelocked="timelocked"
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
  props: {
    currency: {
      type: String,
      required: true,
    },
    amount: {
      type: [String, Number],
      required: true,
    },
    timelocked: {
      type: Boolean,
      required: true,
    },
    block: {
      type: [String, Number],
      required: true,
    },
    epoch: {
      type: [String, Number],
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    timeAgo: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    fee: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    outputs: {
      type: Array,
      required: true,
    },
    inputs: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: '',
    },
    witnesses: {
      type: Object,
      default: null,
    },
    rewards: {
      type: Object,
      default: null,
    },
    rounds: {
      type: Object,
      default: null,
    },
    state: {
      type: String,
      default: '',
    },
    reveals: {
      type: Array,
      default: null,
    },
    result: {
      type: String,
      default: '',
    },
    transactionType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showDetails: false,
    }
  },
  computed: {
    address() {
      if (this.type === 'POSITIVE') {
        if (
          this.inputs.length > 1 &&
          this.inputs.some(input => input.address !== this.inputs[0].address)
        ) {
          return 'several addresses'
        } else if (this.inputs.length > 0) {
          return this.inputs[0].address
        } else {
          // this.inputs.length == 0: assume this is a genesis transaction
          return 'genesis'
        }
      } else {
        // We are assumming that the first output is the address where we are
        // sending and the second is for the change. So if there are more than 2,
        // there are several addresses
        return this.outputs.length > 2
          ? 'several addresses'
          : this.outputs[0].address
      }
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
  methods: {
    hideDetails() {
      this.showDetails = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.border {
  border-bottom: 1px solid $grey-1;

  &.locked {
    opacity: 0.6;
  }
}

.transaction {
  align-items: center;
  cursor: pointer;
  display: grid;
  grid-column-gap: 24px;
  grid-template-columns: max-content 210px auto max-content;
  padding: 16px;

  .amount,
  .address {
    align-items: center;
    display: flex;
  }

  .amount {
    display: block;
    font-size: 16px;
    font-weight: bold;

    &.from {
      color: $green-5;
    }

    &.to {
      color: $red-4;
    }
  }

  .address-container {
    align-items: center;
    color: $alt-grey-5;
    display: flex;
    justify-content: center;

    .origin {
      color: $grey-4;
      font-size: 12px;
      font-weight: 600;
      margin-right: 8px;
    }

    .address {
      font-size: 13px;
      font-style: italic;
    }
  }

  .date {
    color: $grey-4;
    font-size: 12px;
    font-style: italic;
    font-weight: 600;
    min-width: 100px;
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
    :timelocked="false"
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
    :timelocked="false"
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
    :timelocked="false"
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
