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
      <el-input v-model.number="form.witnesses" type="number"></el-input>
    </el-form-item>

    <el-form-item
      label="Min Consensus Percentage"
      prop="minConsensusPercentage"
    >
      <el-input
        v-model.number="form.minConsensusPercentage"
        type="number"
      ></el-input>
    </el-form-item>

    <el-form-item label="Data request fee" prop="fee">
      <el-input v-model.number="form.fee" type="number">
        <AppendCurrency slot="append" />
      </el-input>
    </el-form-item>

    <el-form-item label="Reward fee" prop="rewardFee">
      <el-input v-model.number="form.rewardFee" type="number">
        <AppendCurrency slot="append" />
      </el-input>
    </el-form-item>

    <el-form-item label="Commit fee" prop="commitFee">
      <el-input v-model.number="form.commitFee" type="number">
        <AppendCurrency slot="append" />
      </el-input>
    </el-form-item>

    <el-form-item label="Reveal fee" prop="revealFee">
      <el-input v-model.number="form.revealFee" type="number">
        <AppendCurrency slot="append" />
      </el-input>
    </el-form-item>

    <el-form-item label="Tally fee" prop="tallyFee">
      <el-input v-model.number="form.tallyFee" type="number">
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
        this.form.witnesses * this.form.commitFee +
        this.form.fee +
        this.form.witnesses * this.form.revealFee +
        this.form.witnesses * this.form.rewardFee +
        this.form.tallyFee
      if (totalAmount > this.availableBalance) {
        callback(new Error("You don't have enough funds"))
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
        commitFee: 1,
        dataRequest: 1,
        fee: 1,
        minConsensusPercentage: 51,
        revealFee: 1,
        rewardFee: 1,
        tallyFee: 1,
        witnesses: 3,
        collateral: 1000000000,
      },
      rules: {
        commitFee: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { type: 'number', message: 'This field must be a number' },
        ],
        dataRequest: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { type: 'number', message: 'This field must be a number' },
        ],
        fee: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { type: 'number', message: 'This field must be a number' },
          { validator: enoughFunds, trigger: 'submit' },
        ],
        minConsensusPercentage: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { type: 'number', message: 'This field must be a number' },
        ],
        rewardFee: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { type: 'number', message: 'This field must be a number' },
        ],
        revealFee: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { type: 'number', message: 'This field must be a number' },
        ],
        tallyFee: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { type: 'number', message: 'This field must be a number' },
        ],
        witnesses: [
          { required: true, message: 'Required field', trigger: 'blur' },
          { type: 'number', message: 'This field must be a number' },
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
        commitFee: this.form.commitFee,
        dataRequest: this.form.dataRequest,
        extraCommitRounds: this.form.extraCommitRounds,
        extraRevealRounds: this.form.extraRevealRounds,
        fee: this.form.fee,
        minConsensusPercentage: this.form.minConsensusPercentage,
        revealFee: this.form.revealFee,
        rewardFee: this.form.rewardFee,
        tallyFee: this.form.tallyFee,
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
