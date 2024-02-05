<template>
  <el-form
    ref="send-form"
    class="form"
    data-test="tx-form"
    :model="feeValues"
    label-position="left"
    :rules="rules"
    width="max-content"
  >
    <el-form-item v-if="estimationOptions.length" prop="estimation">
      <SelectEstimatedFee
        data-test="select-estimated-fee"
        :is-dr-tx="!!drValues"
        :selected-fee="selectedFee"
        :estimation-options="estimationOptions"
        :is-custom="customFee"
        @change="setFee"
      />
    </el-form-item>
    <div v-else class="loading">
      <h3 class="title">{{ $t('estimating_fees') }}</h3>
      <DotsLoading size="8px" />
    </div>
    <el-form-item v-if="customFee" prop="fee">
      <el-input v-model="feeValues.fee" tabindex="4" data-test="tx-fee">
        <template #append>
          <AppendUnit :static-unit="unit" />
        </template>
      </el-input>
    </el-form-item>
    <transition name="slide">
      <div v-if="customFee" class="switcher-row">
        <el-switch
          v-model="feeValues.isWeightedFee"
          data-test="fee-type-switch"
          :active-text="$t('weighted_fee')"
          :inactive-text="$t('absolute_fee')"
          class="switch"
        ></el-switch>
      </div>
    </transition>
    <p v-if="customFeeError" class="error" data-test="create-dr-error">{{
      customFeeError
    }}</p>
    <div v-show="estimationOptions.length" class="submit">
      <el-button
        class="send-btn"
        tabindex="6"
        data-test="cancel"
        @click="clearValues"
      >
        {{ $t('back') }}
      </el-button>
      <el-button
        class="send-btn"
        tabindex="7"
        type="primary"
        data-test="continue"
        @click="setTransaction"
      >
        {{ $t('continue') }}
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AppendUnit from '@/components/AppendUnit.vue'
import FormValidation from '@/services/FormValidation'
import { WIT_UNIT, FEE_TIERS } from '@/constants'
import SelectEstimatedFee from '@/components/SendTransaction/SelectEstimatedFee.vue'
import DotsLoading from '@/components/DotsLoading.vue'
import { standardizeWitUnits } from '@/utils'

export default {
  name: 'SendValueTransferForm',
  components: {
    AppendUnit,
    SelectEstimatedFee,
    DotsLoading,
  },
  props: {
    vttValues: {
      type: Object,
      default: null,
    },
    drValues: {
      type: Object,
      default: null,
    },
  },
  data() {
    const formValidation = () =>
      new FormValidation({
        unit: this.unit,
        balance: this.availableBalance,
        feeType: this.feeType,
      })

    const maxNumber = (rule, value, callback) => {
      return formValidation().maxNumber(rule, value, callback)
    }
    const integerNanoWitFee = (rule, value, callback) => {
      return formValidation().integerNanoWitFee(rule, value, callback)
    }
    const isNumber = (rule, value, callback) => {
      return formValidation().isNumber(rule, value, callback)
    }
    return {
      customFee: false,
      transactionToSend: null,
      customFeeError: null,
      WIT_UNIT,
      feeValues: {
        fee: '0',
        isWeightedFee: true,
      },
      rules: {
        fee: [
          {
            required: true,
            message: this.$t('required_field'),
            trigger: 'blur',
          },
          { validator: isNumber, trigger: 'blur' },
          {
            validator: integerNanoWitFee,
            trigger: 'submit',
          },
          { validator: maxNumber, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      unit: state => state.wallet.unit,
      createVTTError: state => state.wallet.errors.createVTT,
      createDataRequestError: state => state.wallet.errors.createDataRequest,
      feeEstimationReportError: state =>
        state.wallet.errors.getFeeEstimationReport,
      feeEstimationReport: state => state.wallet.feeEstimationReport,
      transactionOptions: state => state.wallet.transactionOptions,
      selectedFee: state => state.wallet.selectedFee,
    }),
    formatedFeeEstimationReport() {
      if (this.feeEstimationReport) {
        const { drt_stinky, drt_low, drt_medium, drt_high, drt_opulent } =
          this.feeEstimationReport.report
        const { vtt_stinky, vtt_low, vtt_medium, vtt_high, vtt_opulent } =
          this.feeEstimationReport.report
        return {
          stinky: this.drValues ? drt_stinky : vtt_stinky,
          low: this.drValues ? drt_low : vtt_low,
          medium: this.drValues ? drt_medium : vtt_medium,
          high: this.drValues ? drt_high : vtt_high,
          opulent: this.drValues ? drt_opulent : vtt_opulent,
        }
      } else {
        return {}
      }
    },
    estimationOptions() {
      if (this.transactionOptions && this.formatedFeeEstimationReport) {
        const result = FEE_TIERS.reduce((acc, tier) => {
          acc.push({
            label: tier,
            report: this.formatedFeeEstimationReport[tier],
            transaction: this.transactionOptions
              ? this.transactionOptions[tier]
              : {},
          })
          return acc
        }, [])
        return [...result, { label: 'custom' }]
      } else {
        return []
      }
    },
    feeType() {
      return this.feeValues.isWeightedFee
        ? {
            key: 'relative',
            text: this.$t('weighted_fee'),
          }
        : {
            key: 'absolute',
            text: this.$t('absolute_fee'),
          }
    },
  },
  watch: {
    feeValues: {
      handler: function () {
        this.clearErrors()
        if (this.customFee) {
          this.customFeeError = null
          this.setSelectedCustomFee()
        }
      },
      deep: true,
    },
  },
  async mounted() {
    await this.getFeeEstimationReport()
    if (this.selectedFee?.label === 'custom' && this.selectedFee?.fee) {
      this.feeValues = { ...this.selectedFee }
    }
    if (!this.transactionOptions) {
      await this.getEstimatedTransactions()
    }
  },
  methods: {
    ...mapMutations({
      clearError: 'clearError',
      clearSelectedFee: 'clearSelectedFee',
      clearTransactionOptions: 'clearTransactionOptions',
      clearGeneratedTransaction: 'clearGeneratedTransaction',
      setTransactionOptions: 'setTransactionOptions',
      setSelectedFee: 'setSelectedFee',
    }),
    ...mapActions({
      getFeeEstimationReport: 'getFeeEstimationReport',
      createDataRequest: 'createDataRequest',
      createVTT: 'createVTT',
    }),
    async getEstimatedTransactions() {
      const txRequests = FEE_TIERS.map(async tier => {
        let transaction
        if (this.vttValues && this.formatedFeeEstimationReport[tier]) {
          transaction = await this.createVTT({
            ...this.vttValues,
            fee: this.formatedFeeEstimationReport[tier].priority,
            feeType: this.feeType,
          })
        } else if (this.drValues && this.formatedFeeEstimationReport[tier]) {
          transaction = await this.createDataRequest({
            parameters: {
              ...this.drValues,
              fee: this.formatedFeeEstimationReport[tier].priority,
              feeType: this.feeType,
            },
            request: this.drValues.template.radRequest,
          })
        }
        const anyError = this.createVTTError || this.createDataRequestError
        if (anyError && anyError.error !== 'Validation Error') {
          this.clearErrors()
        }
        return {
          label: tier,
          result: await transaction,
        }
      })
      Promise.all(txRequests).then(result => {
        this.setTransactionOptions({
          values: result.reduce(
            (acc, tx) => ({ ...acc, [tx.label]: tx.result }),
            {},
          ),
        })
      })
    },
    async customVttTransaction() {
      return await this.createVTT({
        label: this.vttValues.label,
        address: this.vttValues.address,
        amount: this.vttValues.amount,
        fee: standardizeWitUnits(this.feeValues.fee, WIT_UNIT.NANO, this.unit),
        feeType: this.feeType,
        timelock: this.vttValues.timelock,
      })
    },
    async customDrTransaction() {
      return await this.createDataRequest({
        parameters: {
          ...this.drValues,
          fee: standardizeWitUnits(
            this.feeValues.fee,
            WIT_UNIT.NANO,
            this.unit,
          ),
          feeType: this.feeType,
        },
        request: this.drValues.template.radRequest,
      })
    },
    setSelectedCustomFee() {
      this.setSelectedFee({
        fee: {
          label: 'custom',
          fee: this.feeValues.fee,
          isWeightedFee: this.feeValues.isWeightedFee,
        },
      })
    },
    setFee(fee) {
      this.setSelectedFee({ fee })
      const anyError = this.feeEstimationReportError || fee.transaction?.error
      if (!anyError && this.drValues) {
        this.feeValues.fee = fee.transaction ? fee.transaction.fee : '0'
      } else if (!anyError && this.vttValues) {
        this.feeValues.fee = fee.transaction
          ? fee.transaction.metadata.fee
          : '0'
      }
      this.customFee = fee.label === 'custom'
      this.customFeeError = null
    },
    clearErrors() {
      if (this.createVTTError) {
        this.clearError({ error: this.createVTTError.name })
      } else if (this.createDataRequestError) {
        this.clearError({ error: this.createDataRequestError.name })
      }
    },
    clearValues() {
      this.clearErrors()
      this.clearTransactionOptions()
      this.clearGeneratedTransaction()
      this.clearSelectedFee()
      this.$emit('go-back')
    },
    async setTransaction() {
      this.$refs['send-form'].validate(async valid => {
        const selectedTransaction = this.selectedFee?.transaction
        if (selectedTransaction) {
          this.transactionToSend = selectedTransaction
        } else if (valid && this.vttValues) {
          this.transactionToSend = await this.customVttTransaction()
        } else if (valid && this.drValues) {
          this.transactionToSend = await this.customDrTransaction()
        }
        if (this.customFee && this.transactionToSend?.error) {
          this.customFeeError = this.transactionToSend.error
        }
        if (valid && !this.transactionToSend?.error) {
          this.$emit('set-transaction', this.transactionToSend)
        }
      })
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

.error {
  color: $red-2;
  font-size: 14px;
  margin-bottom: 8px;
  word-break: break-word;
}

.form {
  .subtitle {
    font-size: 32;
    margin-bottom: 16px;
  }
}

.loading {
  color: $yellow-4;
  display: grid;
  font-size: 16px;
  font-weight: bold;
  grid-template-columns: max-content min-content;
  grid-template-rows: max-content;
  justify-content: flex-start;
  justify-items: center;
  margin-bottom: 32px;

  .title {
    margin-top: 8px;
  }
}

.switcher-row {
  display: flex;
  justify-content: flex-end;

  .switch {
    justify-content: flex-end;
    margin-bottom: 16px;
    width: max-content;
  }
}

.submit {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  text-align: right;
  width: 100%;

  .link {
    font-size: 14px;
    text-align: left;
    width: fit-content;

    .icon {
      width: 8px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .send-btn {
    align-self: flex-end;
  }
}
</style>
