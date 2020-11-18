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
          :maxlength="addressLength"
        />
      </el-form-item>
      <el-form-item label="Amount" prop="amount">
        <!-- FIXME(#1188): create InputWit component after assess how to pass Element validation between transparent wrapper -->
        <el-input v-model="form.amount" tabindex="3" data-test="tx-amount">
          <AppendCurrency slot="append" @change-currency="changeCurrency" />
        </el-input>
      </el-form-item>
      <el-form-item label="fee per weight unit" prop="fee">
        <el-input
          v-model="form.fee"
          type="number"
          tabindex="4"
          data-test="tx-fee"
        >
          <AppendCurrency slot="append" @change-currency="changeCurrency" />
        </el-input>
      </el-form-item>
      <p v-if="createVTTError" class="error">{{ createVTTError.message }}</p>
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
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
    const integerNanoWit = (rule, value, callback) => {
      const isNanoWit = this.currency === WIT_UNIT.NANO
      if (isNanoWit && !Number.isInteger(Number(value))) {
        callback(new Error('Only integer nanoWits values allowed'))
      } else {
        callback()
      }
    }

    const maxNumber = (rule, value, callback) => {
      if (
        Number(standardizeWitUnits(value, WIT_UNIT.NANO, this.currency)) >
        Number.MAX_SAFE_INTEGER
      ) {
        callback(new Error('This number is greater than the maximum'))
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
      WIT_UNIT,
      form: {
        address: '',
        label: '',
        amount: null,
        fee: null,
      },
      rules: {
        // address validation is updated on runtime according to the network
        address: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { min: 42, max: 43, message: 'Length should be 43', trigger: 'blur' },
        ],
        label: [],
        amount: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { validator: isNumber, trigger: 'change' },
          { validator: minAmount, trigger: 'submit' },
          { validator: integerNanoWit, trigger: 'submit' },
          { validator: maxNumber, trigger: 'change' },
        ],
        fee: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { validator: isNumber, trigger: 'change' },
          { validator: minAmount, trigger: 'submit' },
          { validator: integerNanoWit, trigger: 'submit' },
          { validator: maxNumber, trigger: 'change' },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['network']),
    ...mapState({
      availableBalance: state => {
        // TODO: change for available when wallet returns it
        return state.wallet.balance.total
      },
      generatedTransaction: state => {
        return state.wallet.generatedTransaction
      },
      currency: state => state.wallet.currency,
      createVTTError: state => state.wallet.errors.createVTT,
    }),
    addressLength() {
      return this.network && this.network.toLowerCase() === 'mainnet' ? 42 : 43
    },
  },
  watch: {
    form: {
      handler(val) {
        if (this.createVTTError) {
          this.clearError({ error: this.createVTTError.name })
        }
      },
      deep: true,
    },
    addressLength: {
      handler(len) {
        this.rules.address = [
          { required: true, message: 'Required field', trigger: 'blur' },
          {
            min: len,
            max: len,
            message: `Length should be ${len}`,
            trigger: 'blur',
          },
        ]
      },
      immediate: true,
    },
  },

  methods: {
    ...mapMutations({
      clearError: 'clearError',
      setError: 'setError',
      clearGeneratedTransaction: 'clearGeneratedTransaction',
    }),
    ...mapActions({
      sendTransaction: 'sendTransaction',
      createVTT: 'createVTT',
    }),
    changeCurrency(prevCurrency, newCurrency) {
      this.form = {
        address: this.form.address ? this.form.address : '',
        label: '',
        amount: this.form.amount
          ? standardizeWitUnits(this.form.amount, newCurrency, prevCurrency, 2)
          : null,
        fee: this.form.fee
          ? standardizeWitUnits(this.form.fee, newCurrency, prevCurrency, 2)
          : null,
      }
    },
    clearSendForm() {
      this.form.address = ''
      this.form.label = ''
      this.form.amount = null
      this.form.fee = null
    },
    closeAndClear() {
      this.clearSendForm()
      this.clearGeneratedTransaction()
      if (this.createVTTError) {
        this.clearError({ error: this.createVTTError.name })
      }
      this.$emit('close')
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
    standardizeWitUnits,
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

.error {
  color: $red-2;
  font-size: 14px;
  position: absolute;
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
  text-align: right;
  width: 100%;
}
</style>
