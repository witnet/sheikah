<template>
  <div class="transaction-container">
    <div class="scroll">
      <div v-if="type === 'ValueTransfer'" class="info">
        <p class="entry">{{ this.$t('amount') }}</p>
        <Amount
          class="amount"
          :amount="generatedTransaction.metadata.outputs[0].amount"
        />
        <p class="entry">{{ this.$t('to') }}</p>
        <p class="value address">{{
          generatedTransaction.metadata.outputs[0].address
        }}</p>
        <p class="entry">{{ this.$t('fee') }}</p>
        <Amount class="amount" :amount="generatedTransaction.metadata.fee" />
      </div>
      <div v-else class="info">
        <p class="entry">{{ this.$t('witnesses') }}</p>
        <p class="value">{{ witnesses }}</p>
        <p class="entry">{{ this.$t('min_consensus_percentage') }}</p>
        <p class="value">{{ minConsensusPercentage }}</p>
        <p class="entry">{{ this.$t('data_request_fee') }}</p>
        <Amount class="amount" :amount="fee" />
        <p class="entry">{{ this.$t('reward_fee') }}</p>
        <Amount class="amount" :amount="rewardFee" />
        <p class="entry">{{ this.$t('commit_reveal_fee') }}</p>
        <Amount class="amount" :amount="commitAndRevealFee" />
        <p class="entry">{{ this.$t('inputs') }}</p>
        <div data-test="advance-options" class="value-transfer">
          <div
            v-for="(input, index) in generatedTransaction.transaction[type].body
              .inputs"
            :key="input.pkh"
            class="transaction"
          >
            <p class="index"> #{{ index }} </p>
            <p class="output-pointer"> {{ input.output_pointer }}</p>
          </div>
        </div>
        <p class="entry">{{ this.$t('outputs') }}</p>
        <div data-test="advance-options" class="value-transfer">
          <div
            v-for="(output, index) in generatedTransaction.transaction[type]
              .body.outputs"
            :key="output.pkh"
            class="transaction"
          >
            <p class="index"> #{{ index }} </p>
            <Amount :amount="output.value" />
            <p class="address"> {{ output.pkh }}</p>
          </div>
        </div>
      </div>
      <transition name="slide">
        <div v-if="isAdvancedVisible" class="info advanced">
          <p class="entry">{{ this.$t('bytes') }}</p>
          <p data-test="advance-options" class="address value">{{
            generatedTransaction.bytes
          }}</p>
        </div>
      </transition>
    </div>
    <div class="confirm-advance-btn">
      <el-button
        v-if="isAdvancedVisible"
        data-test="advance-options"
        type="text"
        class="link"
        @click="toggleAdvanceOptions"
      >
        {{ this.$t('show_less') }}
        <img
          v-if="darkMode"
          class="icon"
          src="@/resources/svg/close-dark.svg"
        />
        <img v-else class="icon" src="@/resources/svg/close.svg" />
      </el-button>
      <el-button
        v-else
        data-test="show-advance-options"
        class="link"
        type="text"
        @click="toggleAdvanceOptions"
      >
        {{ this.$t('show_advance') }}
        <img v-if="darkMode" class="icon" src="@/resources/svg/open-dark.svg" />
        <img v-else class="icon" src="'@/resources/svg/open.svg" />
      </el-button>
      <span slot="footer" class="dialog-footer">
        <el-button data-test="cancel-tx" @click="closeAndClear">
          {{ this.$t('cancel') }}
        </el-button>
        <el-button
          tabindex="2"
          type="primary"
          data-test="confirm-tx"
          @keydown.enter.esc.prevent="confirmTransaction"
          @click="confirmTransaction"
        >
          {{ this.$t('confirm') }}
        </el-button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Amount from '@/components/Amount.vue'

export default {
  name: 'Send',
  components: {
    Amount,
  },
  props: {
    generatedTransaction: {
      type: Object,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    commitAndRevealFee: {
      type: [Number, String],
      default: null,
    },
    fee: {
      type: [Number, String],
      default: null,
    },
    minConsensusPercentage: {
      type: [Number, String],
      default: null,
    },
    rewardFee: {
      type: [Number, String],
      default: null,
    },
    witnesses: {
      type: [Number, String],
      default: null,
    },
    timelock: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      isAdvancedVisible: false,
    }
  },
  computed: {
    ...mapState({
      unit: state => state.wallet.unit,
      darkMode: state => state.wallet.darkMode,
    }),
  },
  methods: {
    closeAndClear() {
      this.isAdvancedVisible = false
      this.$emit('close-clear')
    },
    toggleAdvanceOptions() {
      this.isAdvancedVisible = !this.isAdvancedVisible
    },
    confirmTransaction() {
      this.$emit('send')
      this.closeAndClear()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/scroll.scss';

.slide-enter-active {
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
  overflow: hidden;
}

.transaction-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  max-height: 700px;
  max-width: max-content;

  .scroll {
    overflow-y: scroll;
  }

  .info {
    color: var(--text-medium-emphasis);
    column-gap: 24px;
    display: grid;
    grid-template-columns: 1fr 350px;
    grid-template-rows: max-content;
    overflow-wrap: break-word;
    padding-right: 24px;
    row-gap: 24px;
    width: 100%;

    &:first-of-type {
      margin-bottom: 24px;
    }

    .label {
      margin-right: 24px;
      margin-top: 8px;
      min-width: 64px;
      text-align: right;
    }

    .input {
      padding-left: 16px;
      text-align: left;
    }

    .entry {
      color: var(--text-medium-emphasis);
      font-size: 13px;
      font-weight: 600;
      text-align: right;
      word-break: break-word;
    }

    .amount {
      align-self: center;
    }

    .value {
      font-size: 14px;

      &.address {
        font-style: italic;
      }
    }

    .value-transfer {
      display: grid;
      grid-template-rows: auto auto;
    }

    .transaction {
      align-items: center;
      display: grid;
      grid-template-columns: [col1-start] 30px [col2-start] auto;
      grid-template-rows: [row1-start] auto [row2-start];
      margin-bottom: 8px;

      .index {
        align-self: self-start;
        font-size: 14px;
        grid-area: index;
        grid-column: col1-start;
        grid-row: row1-start;
      }

      .amount {
        font-size: 14px;
        grid-column: col2-start;
        grid-row: row1-start;

        .unit {
          font-size: 14px;
        }
      }

      .output-pointer {
        font-size: 14px;
        font-style: italic;
        grid-column: col2-start;
        grid-row: row1-start;
      }

      .address {
        font-size: 14px;
        font-style: italic;
        grid-column: col2-start;
        grid-row: row2-start;
      }
    }
  }

  .confirm-advance-btn {
    display: flex;
    flex-direction: column;
    padding-right: 24px;
    text-align: right;
    width: 100%;

    .link {
      font-size: 14px;
      margin-top: 16px;
      text-align: left;

      .icon {
        width: 8px;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.submit {
  margin-top: 32px;
  text-align: right;
  width: 100%;
}
</style>
