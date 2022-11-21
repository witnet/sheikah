<template>
  <div class="transaction-container">
    <div class="scroll">
      <div v-if="type === 'ValueTransfer'" class="info">
        <p class="entry">{{ $t('amount') }}</p>
        <Amount
          class="amount"
          :amount="generatedTransaction.metadata.outputs[0].amount"
        />
        <p class="entry">{{ $t('to_id') }}</p>
        <Address
          class="value address"
          size="13px"
          :value="generatedTransaction.metadata.outputs[0].address"
        />
        <p class="entry">{{ $t('fee') }}</p>
        <Amount
          class="amount"
          size="14px"
          :amount="generatedTransaction.metadata.fee"
        />
      </div>
      <div v-else class="info">
        <p class="entry">{{ $t('witnesses') }}</p>
        <p class="value">{{ drOutput.witnesses }}</p>
        <p class="entry">{{ $t('min_consensus_percentage') }}</p>
        <p class="value">{{ drOutput.min_consensus_percentage }}</p>
        <p class="entry">{{ $t('data_request_fee') }}</p>
        <Amount class="amount" :amount="drFee" />
        <p class="entry">{{ $t('reward_fee') }}</p>
        <Amount class="amount" :amount="drOutput.witness_reward" />
        <p class="entry">{{ $t('commit_reveal_fee') }}</p>
        <Amount class="amount" :amount="drOutput.commit_and_reveal_fee" />
        <p class="entry">{{ $t('inputs') }}</p>
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
        <p class="entry">{{ $t('outputs') }}</p>
        <div data-test="advance-options" class="value-transfer">
          <div
            v-for="(output, index) in generatedTransaction.transaction[type]
              .body.outputs"
            :key="output.pkh"
            class="transaction"
          >
            <p class="index"> #{{ index }} </p>
            <Amount :amount="output.value" />
            <Address class="address" size="13px" :value="output.pkh" />
          </div>
        </div>
      </div>
      <transition name="slide">
        <div v-if="isAdvancedVisible" class="info advanced">
          <p class="entry">{{ $t('bytes') }}</p>
          <p data-test="advance-options" class="address value">{{
            generatedTransaction.bytes
          }}</p>
        </div>
      </transition>
    </div>
    <div class="confirm-advance-btn">
      <el-link
        v-if="isAdvancedVisible"
        data-test="advance-options"
        class="link"
        @click="toggleAdvanceOptions"
      >
        {{ $t('show_less') }}
        <CustomIcon class-name="icon" name="close" />
      </el-link>
      <el-link
        v-else
        data-test="show-advance-options"
        class="link"
        @click="toggleAdvanceOptions"
      >
        {{ $t('show_advance') }}
        <CustomIcon class-name="icon" name="open" />
      </el-link>
      <span slot="footer" class="dialog-footer">
        <el-button data-test="cancel-tx" @click="closeAndClear">
          {{ $t('back') }}
        </el-button>
        <el-button
          tabindex="2"
          type="primary"
          data-test="confirm-tx"
          @keydown.enter.esc.prevent="confirmTransaction"
          @click="confirmTransaction"
        >
          {{ $t('confirm') }}
        </el-button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Address from '@/components/Address.vue'
import Amount from '@/components/Amount.vue'
import CustomIcon from '@/components/CustomIcon.vue'

export default {
  name: 'Generatedtransaction',
  components: {
    Address,
    Amount,
    CustomIcon,
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
  },
  data() {
    return {
      isAdvancedVisible: false,
    }
  },
  computed: {
    ...mapState({
      unit: state => state.wallet.unit,
    }),
    drOutput() {
      return this.generatedTransaction.transaction.DataRequest.body.dr_output
    },
    drFee() {
      return this.generatedTransaction.fee
    },
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
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/scroll.scss';

.slide-enter-active {
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.1s;
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
    grid-template-columns: 1fr 360px;
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
