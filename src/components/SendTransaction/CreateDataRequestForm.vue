<template>
  <el-form
    ref="form"
    :model="form"
    label-position="left"
    :rules="rules"
    class="deploy-form"
    label-width="200px"
    width="800px"
  >
    <el-form-item :label="$t('witnesses')" prop="witnesses">
      <el-input v-model="form.witnesses" data-test="witnesses"></el-input>
    </el-form-item>

    <el-form-item :label="$t('collateral')" prop="collateral">
      <el-input v-model="form.collateral" data-test="collateral">
        <AppendUnit
          slot="append"
          data-test="collateral-append"
          @change-unit="changeUnit"
        />
      </el-input>
    </el-form-item>

    <el-form-item
      :label="$t('min_consensus_percentage')"
      prop="minConsensusPercentage"
    >
      <el-input
        v-model="form.minConsensusPercentage"
        data-test="consensus"
      ></el-input>
    </el-form-item>

    <el-form-item :label="$t('reward_fee')" prop="rewardFee">
      <el-input v-model="form.rewardFee" data-test="reward-fee">
        <AppendUnit
          slot="append"
          data-test="reward-fee-append"
          @change-unit="changeUnit"
        />
      </el-input>
    </el-form-item>

    <el-form-item
      :label="$t('commit_and_reveal_fee')"
      prop="commitAndRevealFee"
    >
      <el-input v-model="form.commitAndRevealFee" data-test="commit-reveal-fee">
        <AppendUnit
          slot="append"
          data-test="commit-reveal-fee-append"
          @change-unit="changeUnit"
        />
      </el-input>
    </el-form-item>
    <p
      v-if="createDataRequestError"
      data-test="create-data-request-error"
      class="error"
      >{{ createDataRequestError.message }}</p
    >
    <div class="submit">
      <div class="buttons-container">
        <el-button @click="goBack">{{ $t('cancel') }}</el-button>
        <el-button
          data-test="create-data-request-submit"
          type="primary"
          @keydown.enter.esc.prevent="createDataRequest"
          @click="createDataRequest"
        >
          {{ $t('continue') }}
        </el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { standardizeWitUnits } from '@/utils'
import AppendUnit from '@/components/AppendUnit.vue'
import { WIT_UNIT, DR_DEFAULT_VALUES } from '@/constants'
import FormValidation from '@/services/FormValidation'

export default {
  name: 'CreateDataRequestForm',
  components: {
    AppendUnit,
  },
  props: {
    drValues: {
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
    const minConsensusPercentage = (rule, value, callback) => {
      return formValidation().minConsensusPercentage(rule, value, callback)
    }
    const maxConsensusPercentage = (rule, value, callback) => {
      return formValidation().maxConsensusPercentage(rule, value, callback)
    }
    const minCollateralAmount = (rule, value, callback) => {
      return formValidation().minCollateralAmount(rule, value, callback)
    }
    return {
      WIT_UNIT,
      isAdvancedVisible: false,
      form: DR_DEFAULT_VALUES,
      formValuesToStandardize: [
        { key: 'collateral', unit: WIT_UNIT.WIT },
        { key: 'rewardFee', unit: WIT_UNIT.NANO },
        { key: 'commitAndRevealFee', unit: WIT_UNIT.NANO },
      ],
      rules: {
        commitAndRevealFee: [
          {
            required: true,
            message: this.$t('create_dr_form_error_required_field'),
            trigger: 'blur',
          },
          { validator: isNumber, trigger: 'blur' },
          { validator: maxNumber, trigger: 'blur' },
          { validator: minAmount, trigger: 'submit' },
          { validator: integerNanoWit, trigger: 'submit' },
          { validator: isGrtThanBalance, trigger: 'blur' },
        ],
        collateral: [
          {
            required: true,
            message: this.$t('create_dr_form_error_required_field'),
            trigger: 'blur',
          },
          { validator: isNumber, trigger: 'blur' },
          { validator: minCollateralAmount, trigger: 'submit' },
          { validator: maxNumber, trigger: 'blur' },
          { validator: isGrtThanBalance, trigger: 'blur' },
        ],
        dataRequest: [
          {
            required: true,
            message: this.$t('create_dr_form_error_required_field'),
            trigger: 'blur',
          },
          { validator: isNumber, trigger: 'blur' },
          { validator: maxNumber, trigger: 'blur' },
        ],
        minConsensusPercentage: [
          {
            required: true,
            message: this.$t('create_dr_form_error_required_field'),
            trigger: 'blur',
          },
          { validator: isNumber, trigger: 'blur' },
          { validator: minAmount, trigger: 'submit' },
          { validator: minConsensusPercentage, trigger: 'blur' },
          { validator: maxConsensusPercentage, trigger: 'blur' },
          { validator: maxNumber, trigger: 'blur' },
        ],
        rewardFee: [
          {
            required: true,
            message: this.$t('create_dr_form_error_required_field'),
            trigger: 'blur',
          },
          { validator: isGrtThanBalance, trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' },
          { validator: minAmount, trigger: 'submit' },
          { validator: integerNanoWit, trigger: 'submit' },
          { validator: maxNumber, trigger: 'blur' },
        ],
        witnesses: [
          {
            required: true,
            message: this.$t('create_dr_form_error_required_field'),
            trigger: 'blur',
          },
          { validator: isNumber, trigger: 'blur' },
          { validator: maxNumber, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      availableBalance: state => {
        // TODO: change for available when wallet returns it
        return state.wallet.balance.available
      },
      unit: state => state.wallet.unit,
      createDataRequestError: state => state.wallet.errors.createDataRequest,
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
    fee() {
      return this.form.fee
    },
  },
  watch: {
    form: {
      handler(val) {
        if (this.createDataRequestError) {
          this.clearError({ error: this.createDataRequestError.name })
        }
      },
      deep: true,
    },
  },
  created() {
    // set dr values saved in store
    this.form = this.drValues
    this.formValuesToStandardize.forEach(value => {
      this.form[value.key] = standardizeWitUnits(
        1,
        this.unit,
        value.unit,
      ).toString()
    })
  },
  methods: {
    standardizeWitUnits,
    ...mapMutations({
      clearError: 'clearError',
      setError: 'setError',
    }),
    changeUnit(prevUnit, newUnit) {
      this.form = {
        ...this.form,
        commitAndRevealFee: this.form.commitAndRevealFee
          ? standardizeWitUnits(
              this.form.commitAndRevealFee,
              newUnit,
              prevUnit,
              2,
            )
          : null,
        rewardFee: this.form.rewardFee
          ? standardizeWitUnits(this.form.rewardFee, newUnit, prevUnit, 2)
          : null,
        collateral: this.form.collateral
          ? standardizeWitUnits(this.form.collateral, newUnit, prevUnit, 2)
          : null,
      }
    },
    toggleAdvanceOptions() {
      this.isAdvancedVisible = !this.isAdvancedVisible
    },
    goBack() {
      this.$emit('go-back')
    },
    createDataRequest() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('set-dr-values', {
            ...this.form,
            feeType: this.feeType.key,
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.deploy-form {
  padding-right: 24px;

  .switch {
    justify-content: flex-end;
    margin-bottom: 16px;
    width: 100%;
  }

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

  .submit {
    margin-top: 32px;
    width: 100%;

    .buttons-container {
      text-align: right;
    }

    .link {
      font-size: 14px;
      grid-column-end: span 2;
      text-align: left;
      width: fit-content;

      .icon {
        width: 8px;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .error {
    color: $red-2;
    font-size: 14px;
    margin-bottom: 8px;
    word-break: break-word;
  }
}
</style>
