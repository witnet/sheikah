<template>
  <FrameOutside @click="hideDetails" @focus="hideDetails">
    <div class="border" :class="{ locked: timelocked }">
      <div class="transaction" @click="showDetails = !showDetails">
        <CustomIcon
          v-if="isPositive"
          data-test="negative-positive"
          class="icon"
          name="positive"
        />
        <CustomIcon
          v-else
          data-test="negative-positive"
          class="icon"
          name="negative"
        />
        <Amount
          :unit-dark="true"
          data-test="amount"
          class="amount"
          :class="[origin]"
          :amount="amount"
        />

        <div
          v-if="transactionType === 'value_transfer'"
          class="address-container"
          data-test="address-container"
        >
          <p data-test="origin" class="origin">{{
            origin === 'from' ? $t('from_id') : $t('to_id')
          }}</p>
          <p v-if="address === 'miner'" class="address">{{ $t('miner') }}</p>
          <Address v-else size="13px" :value="address" :without-link="true" />
        </div>
        <div
          v-if="transactionType === 'stake'"
          class="address-container"
          data-test="address-container"
        >
          <p class="address">{{ $t('stake') }}</p>
        </div>
        <div
          v-if="transactionType === 'unstake'"
          class="address-container"
          data-test="address-container"
        >
          <p class="address">{{ $t('unstake') }}</p>
        </div>
        <div
          v-else-if="transactionType === 'data_request'"
          class="address-container"
        >
          <p data-test="transaction-type" class="address">{{
            $t('data_request')
          }}</p>
        </div>
        <div v-else-if="transactionType === 'tally'" class="address-container">
          <p data-test="transaction-type" class="address">{{ $t('tally') }}</p>
        </div>
        <div v-if="transactionType === 'mint'" class="address-container">
          <p data-test="transaction-type" class="address">{{ $t('mint') }}</p>
        </div>

        <div v-if="confirmed">
          <p data-test="time-ago" class="date">{{ timeAgo }}</p>
        </div>
        <div v-else-if="!!Number(epoch)" data-test="pending-confirmation">
          <el-tooltip placement="bottom" effect="light">
            <template #content>
              <div class="info-message">
                {{ $t('pending_confirmation_tooltip') }}
              </div>
            </template>
            <p data-test="pending-confirmation" class="pending">{{
              $t('pending_confirmation')
            }}</p>
          </el-tooltip>
        </div>
        <div v-else>
          <el-tooltip placement="bottom" effect="light">
            <template #content>
              <div class="info-message">
                {{ $t('sending_tx_tooltip') }}
              </div>
            </template>
            <p data-test="sending-tx" class="pending">{{ $t('sending') }}</p>
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

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'

const showDetails: Ref<boolean> = ref(false)

const props = defineProps({
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
})

const hideDetails = () => (showDetails.value = false)
const isPositive = computed(() => props.type === 'POSITIVE')
const origin = computed(() => (isPositive.value ? 'from' : 'to'))
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
  grid-column-gap: 16px;
  grid-template-columns: max-content 180px 1fr 120px;
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
    color: var(--pending-state-color);
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
