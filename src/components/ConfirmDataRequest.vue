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
        data-test="sign-send-btn"
        type="primary"
        @keydown.enter.esc.prevent="confirmDataRequest"
        @click="confirmDataRequest"
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

.generated-transaction {
  max-width: 250px;
}

.row {
  align-items: center;
  display: flex;
  margin-bottom: 16px;

  .label {
    font-size: 16px;
    margin-right: 16px;
    min-width: 130px;
    text-align: left;
  }

  .input {
    padding-left: 16px;
    text-align: left;
  }
}

.form {
  .title {
    color: $alt-grey-3;
    font-size: 18px;
    margin: 0 0 40px 32px;
  }

  .submit {
    text-align: right;
    width: 100%;
  }
}
</style>
