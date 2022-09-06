<template>
  <el-form
    ref="send-form"
    class="form"
    data-test="tx-form"
    :model="form"
    label-position="left"
    :rules="rules"
    width="max-content"
  >
    <p class="subtitle">{{ $t('set_miner_fee') }}</p>
    <el-form-item prop="estimation">
      <SelectEstimatedFee
        :selected-fee="selectedFee"
        :estimation-options="estimationOptions"
        :is-custom="customFee"
        @change="setFee"
      />
    </el-form-item>
    <el-form-item v-if="customFee" prop="fee">
      <el-input
        v-if="customFee"
        v-model="form.fee"
        type="number"
        tabindex="4"
        data-test="tx-fee"
      >
        <AppendUnit slot="append" :static-unit="WIT_UNIT.NANO" />
      </el-input>
    </el-form-item>
    <transition name="slide">
      <div v-if="customFee">
        <el-switch
          v-model="form.isWeightedFee"
          :active-text="$t('weighted_fee')"
          :inactive-text="$t('absolute_fee')"
          class="switch"
        ></el-switch>
      </div>
    </transition>
    <p v-if="createVTTError" class="error">{{ createVTTError.message }}</p>
    <div class="submit">
      <el-button
        class="send-btn"
        tabindex="6"
        type="secondary"
        data-test="cleat-vtt-values"
        @click="clearVttValues"
      >
        {{ $t('back') }}
      </el-button>
      <el-button
        class="send-btn"
        tabindex="7"
        type="primary"
        data-test="sign-send-btn"
        @click="tryCreateVTT"
      >
        {{ $t('sign_send') }}
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AppendUnit from '@/components/AppendUnit'
import { isGrtMaxNumber } from '@/utils'
import { WIT_UNIT, FEE_TRAITS } from '@/constants'
import SelectEstimatedFee from '@/components/SelectEstimatedFee'

export default {
  name: 'SendValueTransferForm',
  components: {
    AppendUnit,
    SelectEstimatedFee,
  },
  props: {
    vttValues: {
      type: Object,
      required: true,
    },
  },
  data() {
    const maxNumber = (rule, value, callback) => {
      if (isGrtMaxNumber(value, this.unit)) {
        callback(new Error(this.$t('validate_max_number')))
      } else {
        callback()
      }
    }

    const integerNanoWit = (rule, value, callback) => {
      const isNanoWit = this.unit === WIT_UNIT.NANO
      if (isNanoWit && !Number.isInteger(Number(value))) {
        callback(new Error(this.$t('validate_integer_nano_wit')))
      } else {
        callback()
      }
    }

    const minAmount = (rule, value, callback) => {
      const isNanoWit = this.unit === WIT_UNIT.NANO
      if (isNanoWit && value < 1) {
        callback(new Error(this.$t('validate_min_amount')))
      } else {
        callback()
      }
    }

    const isNumber = (rule, value, callback) => {
      if (!Number(value)) {
        callback(new Error(this.$t('validate_number')))
      } else {
        callback()
      }
    }

    return {
      customFee: false,
      selectedFee: {},
      WIT_UNIT,
      estimatedTransactions: null,
      form: {
        address: this.vttValues.address,
        label: this.vttValues.label,
        amount: this.vttValues.amount,
        fee: null,
        isWeightedFee: true,
        timelock: this.vttValues.timelock,
      },
      rules: {
        fee: [
          {
            required: true,
            message: this.$t('required_field'),
            trigger: 'blur',
          },
          { validator: isNumber, trigger: 'blur' },
          { validator: minAmount, trigger: 'submit' },
          { validator: integerNanoWit, trigger: 'submit' },
          { validator: maxNumber, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      unit: state => state.wallet.unit,
      createVTTError: state => state.wallet.errors.createVTT,
      feeEstimationReport: state => state.wallet.feeEstimationReport,
    }),
    vttEstimationReport() {
      if (this.feeEstimationReport) {
        const { vtt_stinky, vtt_low, vtt_medium, vtt_high, vtt_opulent } =
          this.feeEstimationReport.report
        return {
          stinky: vtt_stinky,
          low: vtt_low,
          medium: vtt_medium,
          high: vtt_high,
          opulent: vtt_opulent,
        }
      } else {
        return {}
      }
    },
    estimationOptions() {
      if (this.estimatedTransactions && this.vttEstimationReport) {
        const result = FEE_TRAITS.reduce((acc, trait) => {
          acc.push({
            label: trait,
            report: this.vttEstimationReport[trait],
            transaction: this.estimatedTransactions
              ? this.estimatedTransactions[trait]
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
      return this.form.isWeightedFee
        ? {
            key: 'weighted',
            text: this.$t('weighted_fee'),
          }
        : {
            key: 'absolute',
            text: this.$t('absolute_fee'),
          }
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
  },
  async mounted() {
    await this.getFeeEstimationReport()
    await this.getEstimatedTransactions()
  },
  methods: {
    ...mapMutations({
      clearError: 'clearError',
      clearGeneratedTransaction: 'clearGeneratedTransaction',
    }),
    ...mapActions({
      getFeeEstimationReport: 'getFeeEstimationReport',
      createVTT: 'createVTT',
    }),
    async getEstimatedTransactions() {
      const txRequests = FEE_TRAITS.map(async trait => {
        return {
          label: trait,
          result: await this.createVTT({
            ...this.form,
            fee: this.vttEstimationReport[trait].priority,
            feeType: this.feeType,
          }),
        }
      })
      Promise.all(txRequests).then(result => {
        this.estimatedTransactions = result.reduce((acc, tx) => {
          acc[tx.label] = tx.result
          return acc
        }, {})
      })
    },
    setFee(fee) {
      this.selectedFee = fee
      this.form.fee = fee.transaction ? fee.transaction.metadata.fee : 1
      this.customFee = fee.label === 'custom'
    },
    clearVttValues() {
      if (this.createVTTError) {
        this.clearError({ error: this.createVTTError.name })
      }
      this.$emit('clear-vtt-values')
    },
    async tryCreateVTT() {
      this.$refs['send-form'].validate(async valid => {
        if (valid && !this.createVTTError) {
          this.$emit(
            'create-vtt',
            this.selectedFee.transaction
              ? this.selectedFee.transaction
              : await this.createVTT({
                  label: this.form.label,
                  address: this.form.address,
                  amount: this.form.amount,
                  fee: this.form.fee,
                  feeType: this.feeType,
                  timelock: this.form.timelock,
                }),
          )
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
  padding-right: 24px;
  width: 600px;

  .subtitle {
    font-size: 32;
    margin-bottom: 16px;
  }
}

.switch {
  justify-content: flex-end;
  margin-bottom: 16px;
  width: 100%;
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
