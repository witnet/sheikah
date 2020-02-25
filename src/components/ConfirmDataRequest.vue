<template>
  <div data-test="confirm-deploy-dr" class="form">
    <div class="title">Confirm</div>
    <div class="data-request-info">
      <div class="row">
        <p>Min. consensus percentage:</p>
        <p>{{ minConsensusPercentage }}</p>
      </div>
      <div class="row">
        <p>Witnesses:</p>
        <p>{{ witnesses }}</p>
      </div>
      <div class="row">
        <p>Extra reveal rounds:</p>
        <p>{{ extraRevealRounds }}</p>
      </div>
      <div class="row">
        <p>Extra commit rounds:</p>
        <p>{{ extraCommitRounds }}</p>
      </div>
      <div class="row">
        <p>Backup witnesses:</p>
        <p>{{ backupWitnesses }}</p>
      </div>
      <div class="row">
        <p>Data request fee:</p>
        <p>{{ fee }}</p>
      </div>
      <div class="row">
        <p>Reward fee:</p>
        <p>{{ rewardFee }}</p>
      </div>
      <div class="row">
        <p>Commit fee:</p>
        <p>{{ commitFee }}</p>
      </div>
      <div class="row">
        <p>Reveal fee:</p>
        <p>{{ revealFee }}</p>
      </div>
      <div class="row">
        <p>Tally fee:</p>
        <p>{{ tallyFee }}</p>
      </div>
      <div class="row">
        <p>Timelock:</p>
        <p>{{ timelock }}</p>
      </div>
    </div>
    <div class="submit">
      <el-button
        @keydown.enter.esc.prevent="confirmDataRequest"
        data-test="sign-send-btn"
        @click="confirmDataRequest"
        type="primary"
      >
        Confirm
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
  max-width: 250px;
}

.form {
  margin: 16px;
  .title {
    color: $grey-4;
    font-size: 18px;
    margin: 0px 0px 40px 32px;
  }
  .data-request-info {
    margin: 16px;
  }
  .submit {
    width: 100%;
    text-align: right;
    padding-top: 40px;
  }
}
</style>
