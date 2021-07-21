<template>
  <el-form
    ref="form"
    :model="form"
    label-position="left"
    :rules="rules"
    class="deploy-form"
    label-width="200px"
    width="max-content"
  >
    <el-form-item :label="$t('witnesses')" prop="witnesses">
      <el-input v-model="form.witnesses" data-test="witnesses"></el-input>
    </el-form-item>

    <el-form-item :label="$t('collateral')" prop="collateral">
      <el-input v-model="form.collateral" data-test="collateral" type="number">
        <AppendUnit
          slot="append"
          :static-unit="WIT_UNIT.WIT"
          data-test="collateral-append"
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

    <el-form-item prop="fee">
      <div slot="label">
        {{ this.$t('fee') }}
        <el-tooltip trigger="hover" effect="light">
          <font-awesome-icon class="info" icon="info-circle" />
          <div slot="content" class="info-message">
            {{ this.$t('fee_info') }}
          </div>
        </el-tooltip>
      </div>
      <el-input
        v-model="form.fee"
        data-test="fee-per-weight-unit"
        type="number"
      >
        <AppendUnit
          slot="append"
          :static-unit="WIT_UNIT.NANO"
          data-test="fee-per-weight-unit-append"
        />
      </el-input>
    </el-form-item>

    <el-switch
      v-model="form.isWeightedFee"
      :active-text="$t('weighted_fee')"
      :inactive-text="$t('absolute_fee')"
      class="switch"
    ></el-switch>

    <el-form-item :label="$t('reward_fee')" prop="rewardFee">
      <el-input v-model="form.rewardFee" data-test="reward-fee" type="number">
        <AppendUnit
          slot="append"
          data-test="reward-fee-append"
          :static-unit="WIT_UNIT.NANO"
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
          :static-unit="WIT_UNIT.NANO"
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
      <el-button @click="goBack">{{ backWord }}</el-button>

      <el-button
        data-test="create-data-request-submit"
        type="primary"
        @keydown.enter.esc.prevent="createDataRequest"
        @click="createDataRequest"
      >
        {{ $t('continue') }}
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { standardizeWitUnits, isGrtMaxNumber } from '@/utils'
import AppendUnit from '@/components/AppendUnit'
import { WIT_UNIT } from '@/constants'

export default {
  name: 'CreateDataRequestForm',
  components: {
    AppendUnit,
  },
  props: {
    backWord: {
      type: String,
      default: '',
    },
  },
  data() {
    const maxNumber = (rule, value, callback) => {
      if (isGrtMaxNumber(value, this.unit)) {
        callback(new Error(this.$t('create_dr_form_error_max_number')))
      } else {
        callback()
      }
    }

    const integerNanoWit = (rule, value, callback) => {
      const isNanoWit = this.unit === WIT_UNIT.NANO
      if (isNanoWit && !Number.isInteger(Number(value))) {
        callback(new Error(this.$t('create_dr_form_error_integer_nanowit')))
      } else {
        callback()
      }
    }

    const minConsensusPercentage = (rule, value, callback) => {
      if (value < 51) {
        callback(
          new Error(this.$t('create_dr_form_error_min_consensus_percentage')),
        )
      } else {
        callback()
      }
    }

    const maxConsensusPercentage = (rule, value, callback) => {
      if (value > 100) {
        callback(
          new Error(this.$t('create_dr_form_error_max_consensus_percentage')),
        )
      } else {
        callback()
      }
    }

    const minCollateralAmount = (rule, value, callback) => {
      const isLessThanMin =
        Number(standardizeWitUnits(value, WIT_UNIT.WIT, WIT_UNIT.WIT)) < 1
      if (isLessThanMin) {
        callback(new Error(this.$t('create_dr_form_error_min_collateral')))
      } else {
        callback()
      }
    }

    const minAmount = (rule, value, callback) => {
      const isNanoWit = this.unit === WIT_UNIT.NANO
      if (isNanoWit && value < 1) {
        callback(new Error(this.$t('create_dr_form_error_min_fee')))
      } else {
        callback()
      }
    }

    const isNumber = (rule, value, callback) => {
      if (!Number(value)) {
        callback(new Error(this.$t('create_dr_form_error_is_number')))
      } else {
        callback()
      }
    }

    return {
      units: {
        [`${WIT_UNIT.WIT}`]: 9,
        [`${WIT_UNIT.MICRO}`]: 3,
        [`${WIT_UNIT.NANO}`]: 0,
      },
      WIT_UNIT,
      form: {
        commitAndRevealFee: '1',
        dataRequest: '1',
        fee: '1',
        isWeightedFee: true,
        minConsensusPercentage: '51',
        rewardFee: '1',
        witnesses: '3',
        collateral: '1',
      },
      rules: {
        commitAndRevealFee: [
          {
            required: true,
            message: this.$t('create_dr_form_error_required_field'),
            trigger: 'blur',
          },
          { validator: isNumber, trigger: 'blur' },
          { validator: minAmount, trigger: 'submit' },
          { validator: integerNanoWit, trigger: 'submit' },
          { validator: maxNumber, trigger: 'blur' },
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
        fee: [
          {
            required: true,
            message: this.$t('create_dr_form_error_required_field'),
            trigger: 'blur',
          },
          { validator: isNumber, trigger: 'blur' },
          { validator: minAmount, trigger: 'submit' },
          { validator: integerNanoWit, trigger: 'submit' },
          { validator: maxNumber, trigger: 'blur' },
        ],
        minConsensusPercentage: [
          {
            required: true,
            message: this.$t('create_dr_form_error_required_field'),
            trigger: 'blur',
          },
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
        return state.wallet.balance.total
      },
      unit: state => state.wallet.unit,
      createDataRequestError: state => state.wallet.errors.createDataRequest,
    }),
    feeType() {
      return this.form.isWeightedFee ? 'weighted' : 'absolute'
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
    unit(inputUnit, outputUnit) {
      this.form = {
        backupWitnesses: this.form.backupWitnesses,
        commitAndRevealFee: this.form.commitAndRevealFee,
        dataRequest: this.form.dataRequest,
        extraCommitRounds: this.form.extraCommitRounds,
        extraRevealRounds: this.form.extraRevealRounds,
        fee: this.form.fee,
        isWeightedFee: this.form.isWeightedFee,
        minConsensusPercentage: this.form.minConsensusPercentage,
        rewardFee: this.form.rewardFee,
        witnesses: this.form.witnesses,
        collateral: this.form.collateral,
      }
    },
  },
  methods: {
    standardizeWitUnits,
    ...mapMutations({
      clearError: 'clearError',
      setError: 'setError',
    }),
    goBack() {
      this.$emit('go-back')
    },
    createDataRequest() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('create-dr', {
            backupWitnesses: this.form.backupWitnesses,
            commitAndRevealFee: this.form.commitAndRevealFee,
            dataRequest: this.form.dataRequest,
            extraCommitRounds: this.form.extraCommitRounds,
            extraRevealRounds: this.form.extraRevealRounds,
            fee: this.form.fee,
            feeType: this.feeType,
            minConsensusPercentage: this.form.minConsensusPercentage,
            rewardFee: this.form.rewardFee,
            witnesses: this.form.witnesses,
            collateral: this.form.collateral,
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

  .submit {
    margin-top: 32px;
    text-align: right;
    width: 100%;
  }

  .error {
    color: $red-2;
    font-size: 14px;
    margin-bottom: 8px;
    word-break: break-word;
  }
}
</style>
