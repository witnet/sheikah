<template>
  <div>
    <div class="transaction-details">
      <p class="label">{{ this.$t('transaction_id') }}</p>
      <p data-test="id" class="info click" @click="toggleNotificationId">{{
        id
      }}</p>
      <p class="label">{{ this.$t('block') }}</p>
      <p
        data-test="block"
        class="info click"
        @click="toggleNotificationBlock"
        >{{ block }}</p
      >
      <p class="label">{{ this.$t('epoch') }}</p>
      <p class="info">#{{ epoch }}</p>
      <p class="label">{{ this.$t('timestamp') }}</p>
      <p data-test="date" class="info">{{ date }}</p>
      <p class="label">{{ this.$t('status') }}</p>
      <p class="info">{{
        confirmed ? this.$t('confirmed') : this.$t('pending_confirmation')
      }}</p>
      <p class="label">{{ this.$t('timelocked') }}</p>
      <p data-test="timelocked" class="info">{{
        timelocked ? this.$t('yes') : this.$t('no')
      }}</p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            witnesses
        "
        data-test="witnesses-title"
        class="label"
      >
        {{ this.$t('witnesses') }}
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            witnesses
        "
        data-test="witnesses"
        class="info"
      >
        {{ witnesses.min
        }}<span class="light">{{ this.$t('as_minimum') }} </span>
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            rewards
        "
        data-test="rewards-title"
        class="label"
      >
        {{ this.$t('rewards') }}
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            rewards
        "
        data-test="rewards"
        class="info"
      >
        {{ rewards.witness }}
        <span class="light">{{ this.$t('per_witness') }} </span>+
        {{ rewards.miners }}
        <span class="light">{{ this.$t('total_miner_reward') }}</span>
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            rounds
        "
        data-test="rounds-title"
        class="label"
      >
        {{ this.$t('rounds') }}
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
            rounds
        "
        data-test="rounds"
        class="info"
      >
        <span class="light">{{ this.$t('maximum') }}</span> {{ rounds.commit }}
        <span class="light">{{ this.$t('commit_rounds') }} </span>+
        {{ rounds.reveal }}
        <span class="light">{{ this.$t('reveal_rounds') }}</span>
      </p>
      <p
        v-if="transactionType === 'data_request' || transactionType === 'tally'"
        data-test="current-stage-title"
        class="label"
      >
        {{ this.$t('current_stage') }}
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
        {{ this.$t('reveals') }}
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
        {{ this.$t('final_result') }}
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
    confirmed: {
      type: Boolean,
      default: false,
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
      this.notify({ message: this.$t('tx_id_copied') })
    },
    toggleNotificationBlock(e) {
      copyToClipboard(e.target.innerText)
      this.notify({ message: this.$t('block_hash_copied') })
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

  .label {
    color: var(--text-low-emphasis);
    font-size: 12px;
    font-weight: bold;
    justify-self: right;
  }

  .info {
    color: var(--text-medium-emphasis);
    font-size: 13px;
    justify-self: left;

    &.click {
      cursor: pointer;
    }

    .light {
      color: var(--text-medium-emphasis);
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
    }
  }
}
</style>
