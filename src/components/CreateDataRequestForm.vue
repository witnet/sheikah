<template>
  <el-form
    ref="form"
    :model="form"
    label-position="left"
    :rules="rules"
    class="deploy-form"
    label-width="200px"
  >
    <el-form-item label="Witnesses" prop="witnesses">
      <el-input v-model.number="form.witnesses"></el-input>
    </el-form-item>

    <el-form-item
      label="Min Consensus Percentage"
      prop="minConsensusPercentage"
    >
      <el-input v-model.number="form.minConsensusPercentage"></el-input>
    </el-form-item>

    <el-form-item label="Data request fee" prop="fee">
      <el-input v-model.number="form.fee"></el-input>
    </el-form-item>

    <el-form-item label="Reward fee" prop="rewardFee">
      <el-input v-model.number="form.rewardFee"></el-input>
    </el-form-item>

    <el-form-item label="Commit fee" prop="commitFee">
      <el-input v-model.number="form.commitFee"></el-input>
    </el-form-item>

    <el-form-item label="Reveal fee" prop="revealFee">
      <el-input v-model.number="form.revealFee"></el-input>
    </el-form-item>

    <el-form-item label="Tally fee" prop="tallyFee">
      <el-input v-model.number="form.tallyFee"></el-input>
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
export default {
  name: 'CreateDataRequestForm',
  props: {
    backWord: {
      type: String,
      default: '',
    },
  },
  data() {
    const enoughFunds = (rule, value, callback) => {
      const totalAmount =
        this.form.commitFee +
        this.form.dataRequest +
        this.form.fee +
        this.form.minConsensusPercentage +
        this.form.revealFee +
        this.form.rewardFee +
        this.form.tallyFee +
        this.form.witnesses +
        this.form.collateral
      if (totalAmount > this.availableBalance) {
        callback(new Error("You don't have enough funds"))
      } else {
        callback()
      }
    }

    return {
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
    }),
  },
  methods: {
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
  .submit {
    margin-top: 32px;
    text-align: right;
    width: 100%;
  }
}
</style>
