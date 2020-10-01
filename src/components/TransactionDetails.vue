<template>
  <div>
    <div class="transaction-details">
      <p class="label">Transaction ID</p>
      <p data-test="id" class="info click" @click="toggleNotificationId">{{
        id
      }}</p>
      <p class="label">Block</p>
      <p
        data-test="block"
        class="info click"
        @click="toggleNotificationBlock"
        >{{ block }}</p
      >
      <p class="label">Epoch</p>
      <p class="info">#{{ epoch }}</p>
      <p class="label">Timestamp</p>
      <p data-test="date" class="info">{{ date }}</p>
      <p class="label">Timelocked</p>
      <p data-test="timelocked" class="info">{{ timelocked ? 'Yes' : 'No' }}</p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            witnesses
        "
        data-test="witnesses-title"
        class="label"
      >
        Witnessess
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            witnesses
        "
        data-test="witnesses"
        class="info"
      >
        {{ witnesses.min }}<span class="light"> as a minimum</span>
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            rewards
        "
        data-test="rewards-title"
        class="label"
      >
        Rewards
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            rewards
        "
        data-test="rewards"
        class="info"
      >
        {{ rewards.witness }} <span class="light">for each witness </span>+
        {{ rewards.miners }}
        <span class="light">in total for miners</span>
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            rounds
        "
        data-test="rounds-title"
        class="label"
      >
        Rounds
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            rounds
        "
        data-test="rounds"
        class="info"
      >
        <span class="light">Maximum</span> {{ rounds.commit }}
        <span class="light">commit rounds </span>+
        {{ rounds.reveal }}
        <span class="light">reveal rounds</span>
      </p>
      <p
        v-if="transactionType === 'data_request' || transactionType === 'tally'"
        data-test="current-stage-title"
        class="label"
      >
        Current stage
      </p>
      <p
        v-if="transactionType === 'data_request' || transactionType === 'tally'"
        data-test="current-stage"
        class="info"
      >
        {{ state }}
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            reveals
        "
        data-test="reveals-title"
        class="label"
      >
        Reveals
      </p>
      <div
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            reveals
        "
        class="info"
      >
        <div
          v-for="(reveal, index) in reveals"
          :key="index"
          data-test="reveals"
          class="reveal"
        >
          <font-awesome-icon
            data-test="reveal-icon"
            :class="reveal.in_consensus ? 'consensed' : 'not-consensed'"
            icon="circle"
          />
          <div data-test="reveal-result" class="result">{{
            standardizeTransactionResult(reveal.value)
          }}</div>
        </div>
      </div>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            result
        "
        data-test="result-title"
        class="label"
      >
        Final result
      </p>
      <p
        v-if="transactionType === 'data_request' || transactionType === 'tally'"
        data-test="result"
        class="info"
        >{{ standardizeTransactionResult(result) }}</p
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  cropString,
  standardizeTransactionResult,
  copyToClipboard,
} from '@/utils'
import {
  TEXT_NOTIFICATION_COPY_BLOCK,
  TEXT_NOTIFICATION_COPY_TX,
} from '@/constants'

export default {
  name: 'TransactionDetails',
  props: {
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
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
    timelocked: {
      type: Boolean,
      required: true,
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
      default: null,
    },
    reveals: {
      type: Array,
      default: null,
    },
    result: {
      type: String,
      default: null,
    },
    transactionType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      toggleNotification: false,
      notificationMessage: '',
    }
  },
  methods: {
    cropString,
    standardizeTransactionResult,
    ...mapActions(['notify']),
    toggleNotificationId(e) {
      copyToClipboard(e.target.innerText)
      this.notify({ message: TEXT_NOTIFICATION_COPY_TX })
    },
    toggleNotificationBlock(e) {
      copyToClipboard(e.target.innerText)
      this.notify({ message: TEXT_NOTIFICATION_COPY_BLOCK })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.transaction-details {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto;
  justify-items: center;
  margin-top: 24px;

  .click {
    cursor: pointer;
  }

  .label {
    color: $grey-4;
    font-size: 12px;
    font-weight: bold;
    justify-self: right;
  }

  .info {
    color: $alt-grey-5;
    font-size: 13px;
    justify-self: left;

    .light {
      color: $grey-4;
    }

    .reveal {
      align-items: center;
      display: flex;
      margin-bottom: 8px;

      .consensed {
        color: $green-3;
        font-size: 10px;
        margin-right: 8px;
      }

      .not-consensed {
        color: $red-2;
        font-size: 10px;
        margin-right: 8px;
      }

      .address {
        color: $grey-4;
        margin-right: 8px;
      }
    }
  }
}
</style>
