<template>
  <el-form
    ref="send-form"
    class="form"
    data-test="tx-form"
    :model="form"
    label-position="top"
    :rules="rules"
    width="max-content"
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
        <template #append>
          <AppendUnit @change-unit="changeUnit" />
        </template>
      </el-input>
    </el-form-item>
    <transition name="slide">
      <div v-if="isAdvancedVisible">
        <div class="label">
          {{ $t('timelock') }}
          <el-tooltip trigger="hover" effect="light">
            <font-awesome-icon class="info" icon="info-circle" />
            <template #content>
              <div class="info-message">
                {{ $t('timelock_tooltip') }}
              </div>
            </template>
          </el-tooltip>
        </div>
        <el-date-picker
          v-model="form.timelock"
          type="datetime"
          :placeholder="$t('select_date')"
          tabindex="5"
          :default-value="new Date()"
          value-format="timestamp"
        />
      </div>
    </transition>
    <p v-if="createVTTError" class="error">{{ createVTTError.message }}</p>
    <div class="submit">
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
      <el-button
        class="send-btn"
        tabindex="6"
        type="primary"
        data-test="sign-send-btn"
        @click="tryCreateVTT"
      >
        {{ $t('continue') }}
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import AppendUnit from '@/components/AppendUnit.vue'
import { standardizeWitUnits } from '@/utils'
import FormValidation from '@/services/FormValidation'
import { WIT_UNIT, VTT_DEFAULT_VALUES } from '@/constants'
import CustomIcon from '@/components/CustomIcon.vue'

export default {
  name: 'SendValueTransferForm',
  components: {
    AppendUnit,
    CustomIcon,
  },
  props: {
    vttValues: {
      type: Object,
      required: true,
    },
  },
  data() {
    const formValidation = () =>
      new FormValidation({
        unit: this.unit,
        balance: this.availableBalance,
        feeType: this.feeType,
      })

    const isGrtThanBalance = (rule, value, callback) => {
      return formValidation().isGrtThanBalance(rule, value, callback)
    }
    const maxNumber = (rule, value, callback) => {
      return formValidation().maxNumber(rule, value, callback)
    }
    const integerNanoWit = (rule, value, callback) => {
      return formValidation().integerNanoWit(rule, value, callback)
    }
    const minAmount = (rule, value, callback) => {
      return formValidation().minAmount(rule, value, callback)
    }
    const isNumber = (rule, value, callback) => {
      return formValidation().isNumber(rule, value, callback)
    }
    return {
      checkedUtxos: [],
      isAdvancedVisible: false,
      WIT_UNIT,
      form: VTT_DEFAULT_VALUES,
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
          {
            validator: isGrtThanBalance,
            trigger: 'blur',
          },
          { validator: isNumber, trigger: 'blur' },
          { validator: minAmount, trigger: 'submit' },
          {
            validator: integerNanoWit,
            trigger: 'submit',
          },
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
      availableBalance: state => state.wallet.balance.available,
    }),
    addressLength() {
      return this.network && this.network.toLowerCase() === 'mainnet' ? 42 : 43
    },
  },
  watch: {
    form: {
      handler() {
        if (this.createVTTError) {
          this.clearError({ error: this.createVTTError.name })
        } else {
          this.generatePosibleTransactions
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
  mounted() {
    // Set saved values in store
    this.form = this.vttValues
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
          this.$emit('set-vtt-values', {
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

.label {
  color: var(--text-medium-emphasis);
  margin-bottom: 16px;

  .info {
    font-size: 13px;
    margin-left: 4px;
  }
}

.form {
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
  margin-top: 24px;

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
