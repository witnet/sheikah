<template>
  <div>
    <div class="transaction-details">
      <p class="label">{{ $t('transaction_id') }}</p>
      <a data-test="id" :href="txUrl" target="_blank" class="info click">
        {{ id }}
        <font-awesome-icon class="external-link" icon="external-link-alt" />
      </a>
      <p class="label">{{ $t('block') }}</p>
      <a data-test="block" :href="blockUrl" target="_blank" class="info click">
        {{ block }}
        <font-awesome-icon class="external-link" icon="external-link-alt" />
      </a>
      <p class="label">{{ $t('epoch') }}</p>
      <p class="info">#{{ epoch }}</p>
      <p class="label">{{ $t('timestamp') }}</p>
      <p data-test="date" class="info">{{ date }}</p>
      <p class="label">{{ $t('status') }}</p>
      <p class="info">{{
        confirmed ? $t('confirmed') : $t('pending_confirmation')
      }}</p>
      <p class="label">{{ $t('timelocked') }}</p>
      <p data-test="timelocked" class="info">{{
        timelocked ? $t('yes') : $t('no')
      }}</p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
          witnesses
        "
        data-test="witnesses-title"
        class="label"
      >
        {{ $t('witnesses') }}
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
          witnesses
        "
        data-test="witnesses"
        class="info"
      >
        {{ witnesses.min }}<span class="light">{{ $t('as_minimum') }} </span>
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
          rewards
        "
        data-test="rewards-title"
        class="label"
      >
        {{ $t('rewards') }}
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
        <span class="light">{{ $t('per_witness') }} </span>+
        {{ rewards.miners }}
        <span class="light">{{ $t('total_miner_reward') }}</span>
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
          rounds
        "
        data-test="rounds-title"
        class="label"
      >
        {{ $t('rounds') }}
      </p>
      <p
        v-if="
          (transactionType === 'data_request' || transactionType === 'tally') &&
          rounds
        "
        data-test="rounds"
        class="info"
      >
        <span class="light">{{ $t('maximum') }}</span> {{ rounds.commit }}
        <span class="light">{{ $t('commit_rounds') }} </span>+
        {{ rounds.reveal }}
        <span class="light">{{ $t('reveal_rounds') }}</span>
      </p>
      <p
        v-if="transactionType === 'data_request' || transactionType === 'tally'"
        data-test="current-stage-title"
        class="label"
      >
        {{ $t('current_stage') }}
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
        {{ $t('reveals') }}
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
        {{ $t('final_result') }}
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
import { EXTERNAL_URL } from '@/constants'
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
  computed: {
    blockUrl() {
      return `${EXTERNAL_URL.WITNET_BLOCK_EXPLORER}/search/${this.block}`
    },
    txUrl() {
      return `${EXTERNAL_URL.WITNET_BLOCK_EXPLORER}/search/${this.id}`
    },
  },
  methods: {
    cropString,
    standardizeTransactionResult,
    ...mapActions(['notify']),
    toggleNotificationId(e) {
      copyToClipboard(e.target.innerText)
      this.notify({
        message: this.$t('tx_id_copied'),
        color: '#27ae60',
        icon: 'check',
      })
    },
    toggleNotificationBlock(e) {
      copyToClipboard(e.target.innerText)
      this.notify({
        message: this.$t('block_hash_copied'),
        color: '#27ae60',
        icon: 'check',
      })
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

    .external-link {
      color: var(--text-medium-emphasis);
      font-size: 10px;
      margin-left: 4px;
    }

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
