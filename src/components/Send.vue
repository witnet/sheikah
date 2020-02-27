<template>
  <el-dialog
    title="Create Value Transfer Transaction"
    :visible.sync="showModal"
    width="700px"
    v-on:close="closeAndClear"
    :show-close="false"
  >
    <Alert
      class="alert"
      data-test="alert"
      v-for="error in errors"
      :key="error.message"
      type="error"
      :message="error.message"
      :description="error.description"
      v-on:close="() => clearError(error.name)"
    />

    <div class="">
      <div v-if="generatedTransaction" class="transaction-info">
        <div class="scroll">
          <div class="row">
            <p class="entry">Amount</p>
            <p class="value">{{ generatedTransaction.metadata.value }} Wit</p>
          </div>
          <div class="row">
            <p class="entry">To</p>
            <p class="value">{{ generatedTransaction.metadata.to }}</p>
          </div>
          <div class="row">
            <p class="entry">Fee</p>
            <p class="value">{{ generatedTransaction.metadata.fee }} uWit/B</p>
          </div>
          <div data-test="advance-options" v-if="isAdvancedVisible" class="row">
            <p class="entry">Inputs</p>
            <p></p>
            <div class="column">
              <p
                class="address value"
                v-for="input in generatedTransaction.transaction.ValueTransfer.body.inputs"
                :key="input.output_pointer"
              >
                {{ input.output_pointer }}
              </p>
            </div>
          </div>
          <div data-test="advance-options" v-if="isAdvancedVisible" class="row">
            <p class="entry">Outputs</p>
            <p></p>
            <div class="column">
              <p
                class="address value"
                v-for="output in generatedTransaction.transaction.ValueTransfer.body.outputs"
                :key="output.pkh"
              >
                <span>PKH: {{ output.pkh }}</span>
                <span>Amount: {{ output.value }}</span>
              </p>
            </div>
          </div>

          <div data-test="advance-options" v-if="isAdvancedVisible" class="row">
            <p class="entry">Bytes</p>
            <p></p>
            <div class="column">
              <p class="address value">{{ generatedTransaction.bytes }}</p>
            </div>
          </div>
        </div>
        <div class="confirm-advance-btn">
          <p
            v-if="isAdvancedVisible"
            data-test="advance-options"
            @click="toggleAdvanceOptions"
            class="link"
          >
            Show less
          </p>
          <p v-else data-test="show-advance-options" @click="toggleAdvanceOptions" class="link">
            Show advanced options
          </p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog" data-test="cancel-tx">
              Cancel
            </el-button>
            <el-button
              @keydown.enter.esc.prevent="confirmTransaction"
              type="primary"
              data-test="confirm-tx"
              @click="confirmTransaction"
            >
              Confirm
            </el-button>
          </span>
        </div>
      </div>
      <el-form
        v-else
        data-test="tx-form"
        :model="form"
        label-position="left"
        :rules="rules"
        ref="send-form"
        label-width="120px"
      >
        <el-form-item label="Address" prop="address">
          <el-input
            v-model="form.address"
            placeholder="Recipient address"
            data-test="tx-address"
            maxlength="43"
          />
        </el-form-item>

        <el-form-item label="Label" prop="label">
          <el-input v-model="form.label" data-test="tx-label" />
        </el-form-item>
        <el-form-item label="Amount" prop="amount">
          <el-input v-model.number="form.amount" data-test="tx-amount" />
        </el-form-item>
        <el-form-item label="fee" prop="fee">
          <el-input v-model.number="form.fee" data-test="tx-fee" />
        </el-form-item>

        <div class="submit">
          <el-button
            @keydown.enter.esc.prevent="createVTT"
            type="primary"
            data-test="sign-send-btn"
            @click="createVTT"
          >
            Sign and send
          </el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import Alert from '@/components/Alert'

export default {
  name: 'send',
  components: {
    Alert,
  },
  data() {
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
        ],
        fee: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { type: 'number', message: 'This field must be a number' },
        ],
      },
    }
  },
  props: {
    showModal: Boolean,
  },
  computed: {
    ...mapState({
      createVTTError: state => {
        if (state.wallet.errors.createVTT) {
          return {
            message: state.wallet.errors.createVTT.message,
            description: state.wallet.errors.createVTT.error.message,
            name: state.wallet.errors.createVTT.name,
          }
        }
      },
      saveItemError: state => {
        if (state.wallet.errors.saveItem) {
          return {
            message: state.wallet.errors.saveItem.message,
            description: state.wallet.errors.saveItem.error.message,
            name: state.wallet.errors.saveItem.name,
          }
        }
      },
      errors() {
        if (this.$store.state.wallet.networkStatus !== 'error') {
          return [this.sendTransactionError, this.createVTTError].filter(error => !!error)
        } else {
          return []
        }
      },
    }),
    generatedTransaction() {
      return this.$store.state.wallet.generatedTransaction
    },
  },
  methods: {
    clearSendForm() {
      this.form.address = ''
      this.form.label = ''
      this.form.amount = 0
      this.form.fee = 0
    },
    clearError: function(name) {
      return this.$store.commit('clearError', { error: name })
    },
    closeAndClear() {
      this.clearSendForm()
      this.$store.commit('clearGeneratedTransaction')
      this.$emit('close')
      if (this.createVTTError) {
        this.clearError(this.createVTTError.name)
      } else if (this.sendTransactionError) {
        this.clearError(this.sendTransactionError.name)
      }
    },
    toggleAdvanceOptions() {
      this.isAdvancedVisible = !this.isAdvancedVisible
    },
    confirmTransaction() {
      this.$store.dispatch('sendTransaction', { label: this.form.label })
      this.closeDialog()
    },
    createVTT() {
      this.$refs['send-form'].validate(valid => {
        if (valid) {
          this.$store.dispatch('createVTT', {
            label: this.form.label,
            address: this.form.address,
            amount: this.form.amount,
            fee: this.form.fee,
          })
        }
      })
    },
    closeDialog() {
      if (this.errors) {
        this.isAdvancedVisible = false
        this.$emit('close')
      }
    },
  },
  watch: {
    generatedTransaction(value) {
      // if (value) {
      //   this.showModal = true
      // }
    },
  },
  beforeDestroy() {
    if (this.saveItemError) {
      this.clearError(this.saveItemError.name)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.alert {
  margin-bottom: 40px;
}

.transaction-info {
  overflow-y: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  .entry {
    font-weight: bold;
    font-size: 16px;
    color: $grey-6;
  }
  .value {
    max-width: 200px;
    font-size: 16px;
    font-weight: 400;
  }
  .row {
    padding: 16px 10px;
    width: 300px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $grey-1;
    .column {
      display: flex;
      flex-direction: column;
    }
  }
  .scroll {
    overflow-y: auto;
    overflow-wrap: break-word;
  }
  .confirm-advance-btn {
    margin: 16px 0px 32px 0px;
    width: 300px;
    text-align: right;
    .link {
      padding: 24px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;

  .label {
    min-width: 64px;
    margin-right: 24px;
    margin-top: 8px;
    text-align: right;
  }
  .input {
    text-align: left;
    padding-left: 16px;
  }
}
.submit {
  width: 100%;
  text-align: right;
  padding-top: 10px;
}

.dialog-footer {
  margin-top: 16px;
  .button {
    margin-right: 15px;
  }
}
</style>
