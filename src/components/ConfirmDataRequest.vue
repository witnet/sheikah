<template>
  <el-form
    ref="form"
    label-position="left"
    class="deploy-form"
    label-width="200px"
  >
    <el-form-item label="Witnesses" prop="witnesses">
      <el-input v-model.number="witnesses" disabled></el-input>
    </el-form-item>

    <el-form-item label="Min Consensus Percentage">
      <el-input v-model.number="minConsensusPercentage" disabled></el-input>
    </el-form-item>

    <el-form-item label="Extra reveal rounds">
      <el-input v-model.number="extraRevealRounds" disabled></el-input>
    </el-form-item>

    <el-form-item label="Extra commit rounds">
      <el-input v-model.number="extraCommitRounds" disabled></el-input>
    </el-form-item>

    <el-form-item label="Backup witnesses">
      <el-input v-model.number="backupWitnesses" disabled></el-input>
    </el-form-item>

    <el-form-item label="Data request fee">
      <el-input v-model.number="fee" disabled></el-input>
    </el-form-item>

    <el-form-item label="Reward fee">
      <el-input v-model.number="rewardFee" disabled></el-input>
    </el-form-item>

    <el-form-item label="Commit fee">
      <el-input v-model.number="commitFee" disabled></el-input>
    </el-form-item>

    <el-form-item label="Reveal fee">
      <el-input v-model.number="revealFee" disabled></el-input>
    </el-form-item>

    <el-form-item label="Tally fee">
      <el-input v-model.number="tallyFee" disabled></el-input>
    </el-form-item>

    <div class="submit">
      <el-button @click="goBack">Back</el-button>
      <el-button
        data-test="sign-send-btn"
        type="primary"
        @keydown.enter.esc.prevent="confirmDataRequest"
        @click="confirmDataRequest"
      >
        Deploy
      </el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'ConfirmDataRequest',
  props: {
    backupWitnesses: {
      type: Number,
      required: true,
    },
    commitFee: {
      type: Number,
      required: true,
    },
    extraCommitRounds: {
      type: Number,
      required: true,
    },
    extraRevealRounds: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    generatedTransaction: {
      type: Object,
      required: true,
    },
    minConsensusPercentage: {
      type: Number,
      required: true,
    },
    revealFee: {
      type: Number,
      required: true,
    },
    rewardFee: {
      type: Number,
      required: true,
    },
    tallyFee: {
      type: Number,
      required: true,
    },
    witnesses: {
      type: Number,
      required: true,
    },
    timelock: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isAdvancedVisible: true,
    }
  },
  methods: {
    toggleAdvanceOptions() {
      this.isAdvancedVisible = !this.isAdvancedVisible
    },
    confirmDataRequest() {
      this.$emit('confirm-dr')
    },
    goBack() {
      this.$emit('go-back')
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.title {
  color: $alt-grey-3;
  font-size: 18px;
  margin: 0 0 40px 32px;
}

.submit {
  margin-top: 32px;
  text-align: right;
  width: 100%;
}
</style>
