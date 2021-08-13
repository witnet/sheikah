<template>
  <el-form
    ref="send-form"
    class="form"
    data-test="tx-form"
    :model="form"
    label-position="left"
    :rules="rules"
    width="max-content"
    label-width="200px"
  >
    <el-form-item :label="$t('address')" prop="address">
      <el-input
        v-model="form.address"
        v-focus
        tabindex="1"
        :placeholder="$t('address_placeholder')"
        data-test="tx-address"
        :maxlength="addressLength"
      />
    </el-form-item>
    <el-form-item :label="$t('amount')" prop="amount">
      <!-- FIXME(#1188): create InputWit component after assess how to pass Element validation between transparent wrapper -->
      <el-input v-model="form.amount" tabindex="3" data-test="tx-amount">
        <AppendUnit slot="append" @change-unit="changeUnit" />
      </el-input>
    </el-form-item>
    <el-form-item prop="fee">
      <div slot="label">
        {{ feeType.text }}
        <el-tooltip trigger="hover" effect="light">
          <font-awesome-icon class="info" icon="info-circle" />
          <div slot="content" class="info-message">
            {{ this.$t('fee_info') }}
          </div>
        </el-tooltip>
      </div>
      <el-input
        v-model="form.fee"
        type="number"
        tabindex="4"
        data-test="tx-fee"
      >
        <AppendUnit slot="append" :static-unit="WIT_UNIT.NANO" />
      </el-input>
    </el-form-item>
    <transition name="slide">
      <div v-if="isAdvancedVisible">
        <el-form-item :label="$t('timelock')" prop="timelock">
          <el-date-picker
            v-model="form.timelock"
            type="datetime"
            :placeholder="$t('select_date')"
            tabindex="5"
            :default-value="new Date()"
            value-format="timestamp"
          />
        </el-form-item>
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
        v-if="isAdvancedVisible"
        data-test="advance-options"
        type="text"
        class="link"
        @click="toggleAdvanceOptions"
      >
        {{ this.$t('show_less') }}
        <CustomIcon class-name="icon" name="close" />
      </el-button>
      <el-button
        v-else
        data-test="show-advance-options"
        class="link"
        type="text"
        @click="toggleAdvanceOptions"
      >
        {{ this.$t('show_advance') }}
        <CustomIcon class-name="icon" name="open" />
      </el-button>
      <el-button
        class="send-btn"
        tabindex="6"
        type="primary"
        data-test="sign-send-btn"
        @click="tryCreateVTT"
      >
        {{ this.$t('sign_send') }}
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import AppendUnit from '@/components/AppendUnit'
import { standardizeWitUnits, isGrtMaxNumber } from '@/utils'
import { WIT_UNIT } from '@/constants'
import CustomIcon from '@/components/CustomIcon'

export default {
  name: 'SendValueTransferForm',
  components: {
    AppendUnit,
    CustomIcon,
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
      checkedUtxos: [],
      isAdvancedVisible: false,
      WIT_UNIT,
      form: {
        address: '',
        label: '',
        amount: null,
        fee: null,
        isWeightedFee: true,
        timelock: null,
      },
      rules: {
        // address validation is updated on runtime according to the network
        address: [
          {
            required: true,
            message: this.$t('required_field'),
            trigger: 'blur',
          },
          {
            min: 42,
            max: 43,
            message: this.$t('address_validation_default'),
            trigger: 'blur',
          },
        ],
        label: [],
        amount: [
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
    ...mapGetters(['network']),
    ...mapState({
      unit: state => state.wallet.unit,
      createVTTError: state => state.wallet.errors.createVTT,
    }),
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
          {
            required: true,
            message: this.$t('required_field'),
            trigger: 'blur',
          },
          {
            min: len,
            max: len,
            message: this.$t('address_length_validation', { variable: len }),
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
      clearGeneratedTransaction: 'clearGeneratedTransaction',
    }),
    toggleAdvanceOptions() {
      this.isAdvancedVisible = !this.isAdvancedVisible
    },
    checkedUtxosChange(value) {
      this.checkedUtxos = value
    },
    changeUnit(prevUnit, newUnit) {
      this.form = {
        ...this.form,
        amount: this.form.amount
          ? standardizeWitUnits(this.form.amount, newUnit, prevUnit, 2)
          : null,
      }
    },
    tryCreateVTT() {
      this.$refs['send-form'].validate(valid => {
        if (valid) {
          this.$emit('create-vtt', {
            label: this.form.label,
            address: this.form.address,
            amount: this.form.amount,
            fee: this.form.fee,
            feeType: this.feeType,
            timelock: this.form.timelock,
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
  margin-bottom: 8px;
  word-break: break-word;
}

.form {
  padding-right: 24px;
  width: 600px;
}

.switch {
  justify-content: flex-end;
  margin-bottom: 16px;
  width: 100%;
}

.submit {
  display: flex;
  flex-direction: column;
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
