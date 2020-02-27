<template>
  <div data-test="confirm-deploy-dr" class="form">
    <div class="row">
      <label class="label">Witnesses</label>
      <el-input v-model="witnesses" disabled />
    </div>
    <div class="row">
      <label class="label">Min Consensus Percentage</label>
      <el-input v-model="minConsensusPercentage" disabled />
    </div>

    <div class="row">
      <label class="label">Extra reveal rounds</label>
      <el-input v-model="extraRevealRounds" disabled />
    </div>

    <div class="row">
      <label class="label">Extra commit rounds</label>
      <el-input v-model="extraCommitRounds" disabled />
    </div>

    <div class="row">
      <label class="label">Backup witnesses</label>
      <el-input v-model="backupWitnesses" disabled />
    </div>

    <div class="row">
      <label class="label">Data request fee</label>
      <el-input v-model="fee" disabled />
    </div>

    <div class="row">
      <label class="label">Reward fee</label>
      <el-input v-model="rewardFee" disabled />
    </div>

    <div class="row">
      <label class="label">Commit fee</label>
      <el-input v-model="commitFee" disabled />
    </div>

    <div class="row">
      <label class="label">Reveal fee</label>
      <el-input v-model="revealFee" disabled />
    </div>

    <div class="row">
      <label class="label">Tally fee</label>
      <el-input v-model="tallyFee" disabled />
    </div>

    <div class="row">
      <label class="label">Timelock</label>
      <el-input v-model="timelock" disabled />
    </div>

    <div class="submit">
      <el-button @click="goBack">Back</el-button>
      <el-button
        @keydown.enter.esc.prevent="confirmDataRequest"
        data-test="sign-send-btn"
        @click="confirmDataRequest"
        type="primary"
      >
        Deploy
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDataRequest',
  props: {
    backupWitnesses: Number,
    commitFee: Number,
    extraCommitRounds: Number,
    extraRevealRounds: Number,
    fee: Number,
    generatedTransaction: Object,
    minConsensusPercentage: Number,
    revealFee: Number,
    rewardFee: Number,
    tallyFee: Number,
    witnesses: Number,
    timelock: Number,
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

.generated-transaction {
  max-width: 250px;
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .label {
    min-width: 130px;
    font-size: 16px;
    text-align: left;
    margin-right: 16px;
  }
  .input {
    text-align: left;
    padding-left: 16px;
  }
}

.form {
  .title {
    color: $grey-4;
    font-size: 18px;
    margin: 0px 0px 40px 32px;
  }
  .submit {
    width: 100%;
    text-align: right;
  }
}
</style>
