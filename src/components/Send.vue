<template>
  <el-dialog
    title="Create Value Transfer Transaction"
    :visible="true"
    :show-close="false"
    width="max-content"
    @close="closeAndClear"
  >
    <div v-if="generatedTransaction" class="transaction-container">
      <div class="scroll">
        <div class="info">
          <p class="entry">Amount</p>
          <Amount
            class="amount"
            :amount="generatedTransaction.metadata.value"
          />
          <p class="entry">To</p>
          <p class="value address">{{ generatedTransaction.metadata.to }}</p>
          <p class="entry">Fee</p>
          <Amount class="amount" :amount="generatedTransaction.metadata.fee" />
          <p v-if="isAdvancedVisible" data-test="advance-options" class="entry"
            >Inputs</p
          >
          <div v-if="isAdvancedVisible" class="value-transfer">
            <div
              v-for="(input, index) in generatedTransaction.transaction
                .ValueTransfer.body.inputs"
              :key="input.pkh"
              class="transaction"
            >
              <p class="index"> #{{ index }} </p>
              <p class="output-pointer"> {{ input.output_pointer }}</p>
            </div>
          </div>
        </div>
        <transition name="slide">
          <div v-if="isAdvancedVisible" class="info">
            <p class="entry">Outputs</p>
            <div data-test="advance-options" class="value-transfer">
              <div
                v-for="(output, index) in generatedTransaction.transaction
                  .ValueTransfer.body.outputs"
                :key="output.pkh"
                class="transaction"
              >
                <p class="index"> #{{ index }} </p>
                <Amount :amount="output.value" />
                <p class="address"> {{ output.pkh }}</p>
              </div>
            </div>
            <p class="entry">Bytes</p>
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
          Show less
          <img class="icon" src="@/resources/svg/close.svg" />
        </el-button>
        <el-button
          v-else
          data-test="show-advance-options"
          class="link"
          type="text"
          @click="toggleAdvanceOptions"
        >
          Show advanced options
          <img class="icon" src="@/resources/svg/open.svg" />
        </el-button>
        <span slot="footer" class="dialog-footer">
          <el-button data-test="cancel-tx" @click="closeAndClear">
            Cancel
          </el-button>
          <el-button
            tabindex="2"
            type="primary"
            data-test="confirm-tx"
            @keydown.enter.esc.prevent="confirmTransaction"
            @click="confirmTransaction"
          >
            Confirm
          </el-button>
        </span>
      </div>
    </div>
    <el-form
      v-else
      ref="send-form"
      class="form"
      data-test="tx-form"
      :model="form"
      label-position="left"
      :rules="rules"
      width="max-content"
      label-width="90px"
    >
      <el-form-item label="Address" prop="address">
        <el-input
          v-model="form.address"
          v-focus
          tabindex="1"
          placeholder="Recipient address"
          data-test="tx-address"
          maxlength="43"
        />
      </el-form-item>
      <el-form-item label="Amount" prop="amount">
        <el-input
          v-model.number="form.amount"
          tabindex="3"
          data-test="tx-amount"
        />
      </el-form-item>
      <el-form-item label="fee" prop="fee">
        <el-input v-model.number="form.fee" tabindex="4" data-test="tx-fee" />
      </el-form-item>

      <div class="submit">
        <el-button
          tabindex="5"
          type="primary"
          data-test="sign-send-btn"
          @keydown.enter.esc.prevent="createVTT"
          @click="tryCreateVTT"
        >
          Sign and send
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Amount from '@/components/Amount.vue'

export default {
  name: 'Send',
  components: {
    Amount,
  },
  data() {
    const enoughFunds = (rule, value, callback) => {
      const totalAmount = Number.isInteger(this.form.fee)
        ? value + this.form.fee
        : value
      if (totalAmount > this.availableBalance) {
        callback(new Error("You don't have enough funds"))
      } else {
        callback()
      }
    }

    return {
      isAdvancedVisible: false,
      form: {
        address: '',
        label: '',
        amount: null,
        fee: null,
      },
      rules: {
        address: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { min: 43, max: 43, message: 'Length should be 43', trigger: 'blur' },
        ],
        label: [],
        amount: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { type: 'number', message: 'This field must be a number' },
          { validator: enoughFunds, trigger: 'submit' },
        ],
        fee: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { type: 'number', message: 'This field must be a number' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      availableBalance: state => {
        // TODO: change for available when wallet returns it
        return state.wallet.balance.total
      },
      generatedTransaction: state => state.wallet.generatedTransaction,
      networkStatus: state => state.wallet.networkStatus,
    }),
  },
  methods: {
    ...mapMutations({
      clearError: 'clearError',
      clearGeneratedTransaction: 'clearGeneratedTransaction',
    }),
    ...mapActions({
      sendTransaction: 'sendTransaction',
      createVTT: 'createVTT',
    }),
    clearSendForm() {
      this.form.address = ''
      this.form.label = ''
      this.form.amount = 0
      this.form.fee = 0
    },
    closeAndClear() {
      this.clearSendForm()
      this.clearGeneratedTransaction()
      this.$emit('close')
      if (this.createVTTError) {
        this.clearError({ error: this.createVTTError.name })
      } else if (this.sendTransactionError) {
        this.clearError({ error: this.sendTransactionError.name })
      }
    },
    toggleAdvanceOptions() {
      this.isAdvancedVisible = !this.isAdvancedVisible
    },
    confirmTransaction() {
      this.sendTransaction({ label: this.form.label })
      this.closeDialog()
    },
    tryCreateVTT() {
      this.$refs['send-form'].validate(valid => {
        if (valid) {
          this.createVTT({
            label: this.form.label,
            address: this.form.address,
            amount: this.form.amount,
            fee: this.form.fee,
          })
        }
      })
    },
    closeDialog() {
      this.isAdvancedVisible = false
      this.$emit('close')
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

.form {
  min-width: 600px;
}

.transaction-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  max-height: 500px;

  .scroll {
    overflow-y: auto;
  }

  .info {
    color: $alt-grey-5;
    column-gap: 24px;
    display: grid;
    grid-template-columns: 50px minmax(350px, 1fr);
    grid-template-rows: max-content;
    overflow-wrap: break-word;
    padding-right: 8px;
    row-gap: 24px;
    width: 100%;

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
      color: $grey-4;
      font-size: 13px;
      font-weight: 600;
      text-align: right;
    }

    .amount {
      align-self: center;
    }

    .value {
      font-size: 14px;
      max-width: 350px;

      &.address {
        font-style: italic;
      }
    }

    .value-transfer {
      display: grid;
      grid-template-rows: auto auto;
      max-width: 350px;
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

        .currency {
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
