<template>
  <FrameOutside @click="hideDetails" @focus="hideDetails">
    <div v-if="transactions => 1" :class="`${border ? 'border' : ''}`">
      <div class="transaction" @click="showDetails = !showDetails">
        <img class="icon" :src="arrowIcon" alt="" />
        <div class="amount">
          <span :class="`number ${origin.toLowerCase()}`">{{ amount }}</span>
          <span class="wit">{{ currency }}</span>
        </div>
        <div v-show="transactionType === 'value_transfer'" class="address-container">
          <p class="origin">{{ origin }}</p>
          <p class="address">{{ address }}</p>
        </div>
        <div v-show="transactionType === 'data_request'" class="address-container">
          <p class="address">Data request</p>
        </div>
        <div class="">
          <p class="date">{{ timeAgo }}</p>
        </div>
      </div>
      <div v-if="showDetails">
        <div class="transaction-details">
          <p class="label">Transaction ID</p>
          <p class="info">{{ id }}</p>
          <p class="label">Block</p>
          <p class="info">{{ block }}</p>
          <p class="label">Timestamp</p>
          <p class="info">{{ date }}</p>
          <p v-show="transactionType === 'data_request' && witnesses" class="label">Witnessess</p>
          <p v-show="transactionType === 'data_request' && witnesses" class="info">
            {{ witnesses }}<span class="light"> as a minimum, with </span>{{ witnesses }}
            <span class="light">as backup</span>
          </p>
          <p v-show="transactionType === 'data_request' && rewards" class="label">Rewards</p>
          <p v-show="transactionType === 'data_request' && rewards" class="info">
            {{ rewards }} <span class="light">for each witness </span>+ {{ rewards }}
            <span class="light">in total for miners</span>
          </p>
          <p v-show="transactionType === 'data_request' && rounds" class="label">Rounds</p>
          <p v-show="transactionType === 'data_request' && rounds" class="info">
            <span class="light">Maximum</span> {{ rounds }}
            <span class="light">commit rounds </span>+ {{ rounds }}
            <span class="light">reveal rounds</span>
          </p>
          <p v-show="transactionType === 'data_request'" class="label">Current stage</p>
          <p v-show="transactionType === 'data_request'" class="info">{{ state }}</p>
          <p v-show="transactionType === 'data_request' && reveals" class="label">Reveals</p>
          <div class="info">
            <div
              v-for="reveal in reveals"
              :key="reveal.address"
              v-show="transactionType === 'data_request'"
              class="reveal"
            >
              <font-awesome-icon
                :class="reveal.in_consensus ? 'consensed' : 'not-consensed'"
                icon="circle"
              />
              <div class="address">{{ reveal.address }}</div>
              <div class="result">{{ reveal.result }}</div>
            </div>
          </div>
          <p v-show="transactionType === 'data_request' && result" class="label">Final result</p>
          <p v-show="transactionType === 'data_request'" class="info">{{ result }}</p>
        </div>
        <div class="inputs-outputs">
          <div class="box inputs">
            <p class="title">INPUTS</p>
            <div class="tx" v-for="(input, index) in inputs" :key="input.address">
              <p class="index"># {{ index }}</p>
              <p class="amount">
                {{ input.value }} <span class="currency"> {{ currency }} </span>
              </p>
              <p class="address">{{ input.address }}</p>
            </div>
          </div>
          <div class="box outputs">
            <p class="title">OUTPUTS</p>
            <div class="tx" v-for="(output, index) in outputs" :key="output.address">
              <p class="index"># {{ index }}</p>
              <p class="amount">
                {{ output.value }} <span class="currency"> {{ currency }} </span>
              </p>
              <p class="address">{{ output.address }}</p>
            </div>
            <div class="tx">
              <p class="index">FEE</p>
              <p class="amount">
                {{ fee }} <span class="currency"> {{ currency }} </span>
              </p>
              <p class="address">{{ fee.address }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FrameOutside>
</template>

<script>
import FrameOutside from '@/components/FrameOutside'

export default {
  name: 'Transaction',
  components: {
    FrameOutside,
  },
  data() {
    return {
      showDetails: false,
    }
  },
  props: {
    currency: String,
    amount: String,
    block: [String, Number],
    border: Boolean,
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
  grid-template-columns: max-content max-content auto max-content;
  grid-column-gap: 24px;
  align-items: center;
  cursor: pointer;

  .amount,
  .address {
    display: flex;
    align-items: center;
  }

  .amount {
    .number {
      font-size: 16px;
      font-weight: bold;
    }

    .from {
      color: $green-5;
    }

    .to {
      color: $red-4;
    }

    .wit {
      color: $alt-grey-5;
      margin-left: 8px;
      font-size: 13px;
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
  }

  .block {
    color: $alt-grey-5;
    font-size: 13px;
  }
}
.transaction-details {
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
.inputs-outputs {
  margin-top: 24px;
  background-color: $alt-grey-5;
  border: 1px solid $grey-4;
  display: grid;
  grid-template-columns: auto auto;
  .inputs {
    border-right: 1px solid $grey-4;
  }
  .box {
    padding: 16px 32px;
    .title {
      margin-bottom: 16px;
      color: $white;
      font-size: 10px;
      font-weight: bold;
    }
    .tx {
      margin-bottom: 8px;
      display: grid;
      grid-template-columns: [col1-start] 30px [col2-start] auto;
      grid-template-rows: [row1-start] auto [row2-start];
      .index {
        grid-area: index;
        font-size: 13px;
        font-weight: 600;
        color: $white;
        grid-column: col1-start;
        grid-row: row1-start;
      }
      .amount {
        grid-column: col2-start;
        grid-row: row1-start;
        font-size: 13px;
        font-weight: 600;
        color: $white;
        .currency {
          font-size: 13px;
          color: $white;
        }
      }
      .address {
        font-size: 12px;
        font-style: italic;
        color: $white;
        grid-column: col2-start;
        grid-row: row2-start;
      }
    }
  }
}
</style>
