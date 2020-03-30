<template>
  <div class="main">
    <div class="header">
      <div class="main-col border">
        <p class="title">PARTICIPATION</p>
        <p class="sub-title">${{ participation }}</p>
      </div>
      <div class="main-col border">
        <p class="title">TOTAL TOKENS ALLOCATION</p>
        <p class="sub-title">{{ amount }} <span class="currency">WIT</span></p>
      </div>
      <div class="main-col">
        <p class="title">LOCK-UPS</p>
        <p class="sub-title" v-show="vesting.length >= 1">Yes</p>
        <p class="sub-title" v-show="vesting.length <= 1">No</p>
      </div>
    </div>
    <div class="list-data">
      <div class="list-row" v-for="step in vesting" :key="step.date.getTime()">
        <div class="data">
          <p :class="`type_${type}`">{{ type }}</p>
        </div>
        <p class="data date">{{ changeDateFormat(step.date, 'claiming') }}</p>
        <p class="data amount">{{ step.amount }}<span class="currency"> WIT</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { calculateVesting, changeDateFormat } from '@/utils'
export default {
  name: 'ClaimingInfo',
  computed: {
    ...mapState({
      vestingInfo: state => state.wallet.claimingFileInfo.info.data.vesting,
      genesisDate: state => state.wallet.claimingFileInfo.info.data.genesisDate,
      amount: state => state.wallet.claimingFileInfo.info.data.wit,
      participation: state => state.wallet.claimingFileInfo.info.data.usd,
    }),
    type() {
      const genesis = this.vesting.lenght <= 1
      const delay = this.vestingInfo.delay > 0 && !genesis
      if (genesis) {
        return 'GENESIS'
      } else if (delay) {
        return 'DELAY'
      } else {
        return 'LOCK-UP'
      }
    },
    vesting() {
      const vesting = calculateVesting(this.vestingInfo, this.amount, this.genesisDate)
      return vesting
    },
  },
  watch: {
    vesting: {
      handler: function() {
        this.$store.commit('setComputedVesting', this.vesting)
      },
      immediate: true,
    },
  },
  methods: {
    changeDateFormat,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.main {
  border-radius: 4px;
  border: 1px solid $yellow-2;
  display: flex;
  flex-direction: column;
  .header {
    background-color: $yellow-2;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .main-col {
      flex-grow: 1;
      padding: 16px;
      &.border {
        border-right: 1px solid $white;
      }
      .title {
        color: $grey-5;
        font-size: 14px;
      }
      .sub-title {
        font-size: 24px;
        .currency {
          font-size: 12px;
        }
      }
    }
  }
  .list-data {
    max-height: 200px;
    overflow-y: auto;
    background-color: $yellow-0;
    .list-row {
      display: flex;
      padding: 16px;
      .data {
        margin-right: 24px;
        font-size: 16px;
        .currency {
          font-size: 12px;
        }
      }
      .amount {
        flex-basis: 100%;
      }
      .date {
        flex-basis: 100%;
        text-align: center;
        color: $grey-5;
        font-size: 14px;
      }
      .type_LOCK-UP {
        height: min-content;
        width: max-content;
        padding: 0px 4px;
        background-color: $purple-3;
        color: $white;
        font-size: 12px;
        border-radius: 2px;
        border: 1px solid $purple-6;
      }
      .type_DELAY {
        height: min-content;
        padding: 0px 4px;
        background-color: $blue-0;
        color: $white;
        font-size: 12px;
        border-radius: 2px;
        border: 1px solid $blue-1;
      }
      .type_GENESIS {
        height: min-content;
        padding: 0px 4px;
        background-color: $green-3;
        color: $white;
        font-size: 12px;
        border-radius: 2px;
        border: 1px solid $green-2;
      }
    }
  }
}
</style>
