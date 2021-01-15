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
          :unit-dark="true"
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

          <Address size="13px" :value="address" />
        </div>
        <div
          v-else-if="transactionType === 'data_request'"
          class="address-container"
        >
          <p data-test="transaction-type" class="address">{{
            this.$t('data_request')
          }}</p>
        </div>
        <div v-else-if="transactionType === 'tally'" class="address-container">
          <p data-test="transaction-type" class="address">{{
            this.$t('tally')
          }}</p>
        </div>
        <div v-if="transactionType === 'mint'" class="address-container">
          <p data-test="transaction-type" class="address">{{
            this.$t('mint')
          }}</p>
        </div>

        <div v-if="confirmed">
          <p data-test="time-ago" class="date">{{ timeAgo }}</p>
        </div>
        <div v-else-if="!!Number(epoch)">
          <el-tooltip placement="bottom" effect="light">
            <div slot="content" class="info-message">
              {{ $t('pending_confirmation_tooltip') }}
            </div>
            <p data-test="pending-confirmation" class="pending">{{
              this.$t('pending_confirmation')
            }}</p>
          </el-tooltip>
        </div>
        <div v-else>
          <el-tooltip placement="bottom" effect="light">
            <div slot="content" class="info-message">
              {{ $t('pending_confirmation_tooltip') }}
            </div>
            <p data-test="sending-tx" class="pending">{{
              this.$t('sending')
            }}</p>
          </el-tooltip>
        </div>
      </div>
      <div v-if="showDetails">
        <TransactionDetails
          :id="id"
          data-test="transaction-details"
          :transaction-type="transactionType"
          :block="block"
          :confirmed="confirmed"
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
          :genesis="address === 'genesis'"
          :unit="unit"
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
import Address from '@/components/Address.vue'

export default {
  name: 'Transaction',
  components: {
    Address,
    Amount,
    FrameOutside,
    InputsOutputs,
    TransactionDetails,
  },
  props: {
    unit: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    timelocked: {
      type: Boolean,
      required: true,
    },
    block: {
      type: String,
      required: true,
    },
    epoch: {
      type: String,
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
      type: String,
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
    confirmed: {
      type: Boolean,
      default: false,
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
    address: {
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
  border-bottom: var(--transaction-border);

  &.locked {
    opacity: 0.6;
  }
}

.transaction {
  align-items: center;
  cursor: pointer;
  display: grid;
  grid-column-gap: 24px;
  grid-template-columns: max-content 1fr auto max-content;
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
      color: var(--transactions-positive);
    }

    &.to {
      color: var(--transactions-negative);
    }

    .address-container {
      align-items: center;
      color: var(--text-medium-emphasis);
      display: flex;
      justify-content: center;

      .origin {
        color: var(--text-medium-emphasis);
        font-size: 12px;
        font-weight: 600;
        margin-right: 8px;
      }
    }
  }

  .address-container {
    align-items: center;
    color: var(--text-medium-emphasis);
    display: flex;
    justify-content: center;

    .origin {
      color: var(--text-medium-emphasis);
      font-size: 12px;
      font-weight: 600;
      margin-right: 8px;
    }

    .address {
      font-family: 'Roboto Mono';
      font-size: 13px;
    }
  }

  .date {
    color: var(--text-medium-emphasis);
    font-size: 12px;
    font-style: italic;
    font-weight: 600;
    min-width: 100px;
    text-align: right;
  }

  .pending {
    color: $yellow-4;
    font-size: 12px;
    font-style: italic;
    font-weight: 600;
    min-width: 100px;
    text-align: right;
  }

  .block {
    color: var(--text-medium-emphasis);
    font-size: 13px;
  }
}

.info-message {
  max-width: 250px;
}
</style>

<docs>
### Example

```jsx
  <Transaction
    unit="nanoWits"
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
    unit="nanoWits"
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
    unit="nanoWits"
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
