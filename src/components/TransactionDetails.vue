<template>
  <div>
    <div class="transaction-details">
      <p class="label">Transaction ID</p>
      <p data-test="id" class="info">{{ id }}</p>
      <p class="label">Block</p>
      <p data-test="block" class="info">{{ block }}</p>
      <p class="label">Timestamp</p>
      <p data-test="date" class="info">{{ date }}</p>
      <p
        data-test="witnesses-title"
        v-if="transactionType === 'data_request' && witnesses"
        class="label"
      >
        Witnessess
      </p>
      <p data-test="witnesses" v-if="transactionType === 'data_request' && witnesses" class="info">
        {{ witnesses.min }}<span class="light"> as a minimum, with </span>{{ witnesses.backup }}
        <span class="light">as backup</span>
      </p>
      <p
        data-test="rewards-title"
        v-if="transactionType === 'data_request' && rewards"
        class="label"
      >
        Rewards
      </p>
      <p data-test="rewards" v-if="transactionType === 'data_request' && rewards" class="info">
        {{ rewards.witness }} <span class="light">for each witness </span>+ {{ rewards.miners }}
        <span class="light">in total for miners</span>
      </p>
      <p data-test="rounds-title" v-if="transactionType === 'data_request' && rounds" class="label">
        Rounds
      </p>
      <p data-test="rounds" v-if="transactionType === 'data_request' && rounds" class="info">
        <span class="light">Maximum</span> {{ rounds.commit }}
        <span class="light">commit rounds </span>+
        {{ rounds.reveal }}
        <span class="light">reveal rounds</span>
      </p>
      <p data-test="current-stage-title" v-if="transactionType === 'data_request'" class="label">
        Current stage
      </p>
      <p data-test="current-stage" v-if="transactionType === 'data_request'" class="info">
        {{ state }}
      </p>
      <p
        data-test="reveals-title"
        v-if="transactionType === 'data_request' && reveals"
        class="label"
      >
        Reveals
      </p>
      <div class="info" v-if="transactionType === 'data_request'">
        <div data-test="reveals" v-for="(reveal, index) in reveals" :key="index" class="reveal">
          <font-awesome-icon
            data-test="reveal-icon"
            :class="reveal.in_consensus ? 'consensed' : 'not-consensed'"
            icon="circle"
          />
          <div data-test="reveal-address" class="address">
            {{ cropString(reveal.address, 32, 'middle') }}
          </div>
          <div data-test="reveal-result" class="result">{{ reveal.result }}</div>
        </div>
      </div>
      <p data-test="result-title" v-if="transactionType === 'data_request' && result" class="label">
        Final result
      </p>
      <p data-test="result" v-if="transactionType === 'data_request'" class="info">{{ result }}</p>
    </div>
  </div>
</template>

<script>
import { cropString } from '@/utils'

export default {
  name: 'Transaction',
  data() {
    return {
      showDetails: false,
    }
  },
  props: {
    block: [String, Number],
    date: String,
    id: String,
    witnesses: Object,
    rewards: Object,
    rounds: Object,
    state: String,
    reveals: Array,
    result: String,
    transactionType: String,
  },
  methods: {
    cropString,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.transaction-details {
  margin-top: 24px;
  display: grid;
  grid-template-rows: auto auto auto;
  justify-items: center;
  grid-template-columns: auto auto;
  grid-gap: 16px;
  .label {
    justify-self: right;
    font-size: 12px;
    font-weight: bold;
    color: $grey-4;
  }
  .info {
    font-size: 13px;
    justify-self: left;
    color: $alt-grey-5;
    .light {
      color: $grey-4;
    }
    .reveal {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      .consensed {
        font-size: 10px;
        margin-right: 8px;
        color: $green-3;
      }
      .not-consensed {
        font-size: 10px;
        margin-right: 8px;
        color: $red-2;
      }
      .address {
        color: $grey-4;
        margin-right: 8px;
      }
    }
  }
}
</style>
