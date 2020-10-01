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
    <el-form-item label="Witnesses" prop="witnesses">
      <el-input v-model="form.witnesses" type="number"></el-input>
    </el-form-item>

    <el-form-item
      label="Min Consensus Percentage"
      prop="minConsensusPercentage"
    >
      <el-input v-model="form.minConsensusPercentage" type="number"></el-input>
    </el-form-item>

    <el-form-item label="Data request fee" prop="fee">
      <el-input v-model="form.fee" type="number">
        <AppendCurrency slot="append" />
      </el-input>
    </el-form-item>

    <el-form-item label="Reward fee" prop="rewardFee">
      <el-input v-model="form.rewardFee" type="number">
        <AppendCurrency slot="append" />
      </el-input>
    </el-form-item>

    <el-form-item label="Commit and reveal fee" prop="commitAndRevealFee">
      <el-input v-model="form.commitAndRevealFee" type="number">
        <AppendCurrency slot="append" />
      </el-input>
    </el-form-item>

    <div class="submit">
      <el-button @click="goBack">{{ backWord }}</el-button>

      <el-button
        data-test="create-data-request-submit"
        type="primary"
        @keydown.enter.esc.prevent="createDataRequest"
        @click="createDataRequest"
      >
        Continue
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import AppendCurrency from '@/components/AppendCurrency'
import { standardizeWitUnits } from '@/utils'
import { WIT_UNIT } from '@/constants'

export default {
  name: 'CreateDataRequestForm',
  components: {
    AppendCurrency,
  },
  props: {
    backWord: {
      type: String,
      default: '',
    },
  },
  data() {
    const enoughFunds = (rule, value, callback) => {
      const totalAmount =
        Number(this.form.witnesses) * 2 * Number(this.form.commitAndRevealFee) +
        Number(this.form.fee) +
        Number(this.form.witnesses) * Number(this.form.rewardFee)
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
      units: {
        [`${WIT_UNIT.WIT}`]: 9,
        [`${WIT_UNIT.MICRO}`]: 3,
        [`${WIT_UNIT.NANO}`]: 0,
      },
      form: {
        commitAndRevealFee: 1,
        dataRequest: 1,
        fee: 1,
        minConsensusPercentage: 51,
        rewardFee: 1,
        witnesses: 3,
        collateral: 1000000000,
      },
      rules: {
        commitAndRevealFee: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { validator: isNumber, trigger: 'change' },
          { validator: minAmount, trigger: 'submit' },
          { validator: integerNanoWit, trigger: 'submit' },
        ],
        dataRequest: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { validator: isNumber, trigger: 'change' },
        ],
        fee: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { validator: isNumber, trigger: 'change' },
          { validator: enoughFunds, trigger: 'submit' },
          { validator: minAmount, trigger: 'submit' },
          { validator: integerNanoWit, trigger: 'submit' },
        ],
        minConsensusPercentage: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { validator: isNumber, trigger: 'change' },
        ],
        rewardFee: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { validator: isNumber, trigger: 'change' },
          { validator: minAmount, trigger: 'submit' },
          { validator: integerNanoWit, trigger: 'submit' },
        ],
        witnesses: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { validator: isNumber, trigger: 'change' },
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
      currency: state => state.wallet.currency,
    }),
  },
  watch: {
    currency(inputCurrency, outputCurrency) {
      this.form = {
        backupWitnesses: this.form.backupWitnesses,
        commitAndRevealFee: this.form.commitAndRevealFee,
        dataRequest: this.form.dataRequest,
        extraCommitRounds: this.form.extraCommitRounds,
        extraRevealRounds: this.form.extraRevealRounds,
        fee: this.form.fee,
        minConsensusPercentage: this.form.minConsensusPercentage,
        rewardFee: this.form.rewardFee,
        witnesses: this.form.witnesses,
        collateral: this.form.collateral,
      }
    },
  },
  methods: {
    standardizeWitUnits,
    goBack() {
      this.$emit('go-back')
    },
    createDataRequest() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('create-dr', { ...this.form })
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

  .submit {
    margin-top: 32px;
    text-align: right;
    width: 100%;
  }
}
</style>
