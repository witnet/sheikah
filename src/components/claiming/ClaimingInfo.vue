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
        <p v-show="vesting.length >= 1" class="sub-title">Yes</p>
        <p v-show="vesting.length <= 1" class="sub-title">No</p>
      </div>
    </div>
    <div class="list-data">
      <div v-for="step in vesting" :key="step.date.getTime()" class="list-row">
        <div class="data">
          <p :class="`type_${type}`">{{ type }}</p>
        </div>
        <p class="data date">{{ changeDateFormat(step.date, 'claiming') }}</p>
        <p class="data amount"
          >{{ step.amount }}<span class="currency"> WIT</span></p
        >
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
      return calculateVesting(this.vestingInfo, this.amount, this.genesisDate)
    },
  },
  watch: {
    vesting: {
      handler: function() {
        this.$store.commit('setVesting', this.vesting)
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
  border: 1px solid $yellow-2;
  border-radius: 4px;
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
    background-color: $yellow-0;
    max-height: 200px;
    overflow-y: auto;

    .list-row {
      display: flex;
      padding: 16px;

      .data {
        font-size: 16px;
        margin-right: 24px;

        .currency {
          font-size: 12px;
        }
      }

      .amount {
        flex-basis: 100%;
      }

      .date {
        color: $grey-5;
        flex-basis: 100%;
        font-size: 14px;
        text-align: center;
      }

      .type_LOCK-UP {
        background-color: $purple-3;
        border: 1px solid $purple-6;
        border-radius: 2px;
        color: $white;
        font-size: 12px;
        height: min-content;
        padding: 0 4px;
        width: max-content;
      }

      .type_DELAY {
        background-color: $blue-0;
        border: 1px solid $blue-1;
        border-radius: 2px;
        color: $white;
        font-size: 12px;
        height: min-content;
        padding: 0 4px;
      }

      .type_GENESIS {
        background-color: $green-3;
        border: 1px solid $green-2;
        border-radius: 2px;
        color: $white;
        font-size: 12px;
        height: min-content;
        padding: 0 4px;
      }
    }
  }
}
</style>
