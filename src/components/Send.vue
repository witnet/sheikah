<template>
  <el-dialog
    title="Create Value Transfer Transaction"
    :visible="true"
    :show-close="false"
    width="max-content"
    @close="closeAndClear"
  >
    <FormInformation
      v-if="generatedTransaction"
      :generated-transaction="generatedTransaction"
      type="ValueTransfer"
      @close-clear="closeAndClear"
      @send="confirmTransaction"
    />
    <el-form
      v-else
      ref="send-form"
      class="form"
      data-test="tx-form"
      :model="form"
      label-position="left"
      :rules="rules"
      width="max-content"
      label-width="150px"
    >
      <el-form-item label="Address" prop="address">
        <el-input
          v-model="form.address"
          v-focus
          tabindex="1"
          placeholder="Recipient address"
          data-test="tx-address"
          maxlength="42"
        />
      </el-form-item>
      <el-form-item label="Amount" prop="amount">
        <!-- FIXME(#1188): create InputWit component after assess how to pass Element validation between transparent wrapper -->
        <el-input
          v-model="form.amount"
          type="number"
          tabindex="3"
          data-test="tx-amount"
        >
          <AppendCurrency slot="append" />
        </el-input>
      </el-form-item>
      <el-form-item label="fee per weight unit" prop="fee">
        <el-input
          v-model="form.fee"
          type="number"
          tabindex="4"
          data-test="tx-fee"
        >
          <AppendCurrency slot="append" />
        </el-input>
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
import FormInformation from '@/components/FormInformation.vue'
import AppendCurrency from '@/components/AppendCurrency'
import { standardizeWitUnits } from '@/utils'
import { WIT_UNIT } from '@/constants'

export default {
  name: 'Send',
  components: {
    AppendCurrency,
    FormInformation,
  },
  data() {
    const enoughFunds = (rule, value, callback) => {
      const totalAmount = Number.isInteger(this.form.fee)
        ? Number(value) + Number(this.form.fee)
        : Number(value)
      const isGreaterThanBalance =
        parseFloat(
          standardizeWitUnits(totalAmount, WIT_UNIT.NANO, this.currency),
        ) > parseFloat(this.availableBalance)
      if (isGreaterThanBalance) {
        callback(new Error("You don't have enough funds"))
      } else {
        callback()
      }
    }

    const integerNanoWit = (rule, value, callback) => {
      const isNanoWit = this.currency === WIT_UNIT.NANO
      if (isNanoWit && !Number.isInteger(Number(value))) {
        callback(new Error('Only integer nanoWits values allowed'))
      } else {
        callback()
      }
    }

    const minAmount = (rule, value, callback) => {
      const isNanoWit = this.currency === WIT_UNIT.NANO
      if (isNanoWit && value < 1) {
        callback(new Error('The minimun fee cannot be less than 1 nanoWit'))
      } else {
        callback()
      }
    }

    const isNumber = (rule, value, callback) => {
      if (!Number(value)) {
        callback(new Error('This should be a number'))
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
          { min: 42, max: 43, message: 'Length should be 43', trigger: 'blur' },
        ],
        label: [],
        amount: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { validator: isNumber, trigger: 'change' },
          { validator: enoughFunds, trigger: 'submit' },
          { validator: minAmount, trigger: 'submit' },
          { validator: integerNanoWit, trigger: 'submit' },
        ],
        fee: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { validator: isNumber, trigger: 'change' },
          { validator: minAmount, trigger: 'submit' },
          { validator: integerNanoWit, trigger: 'submit' },
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
      currency: state => state.wallet.currency,
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
  padding-right: 24px;
  width: 600px;
}

.transaction-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  max-height: 500px;
}

.submit {
  margin-top: 32px;
  text-align: right;
  width: 100%;
}
</style>
