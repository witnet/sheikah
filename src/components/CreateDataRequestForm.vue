<template>
  <div class="form">
    <div class="title">Select the fields for the data request</div>

    <div class="row">
      <div class="label">
        <label>Witnesses</label>
      </div>
      <Input v-model="witnesses" />
    </div>

    <div class="row">
      <div class="label">
        <label>Min Consensus Percentage</label>
      </div>
      <Input v-model="minConsensusPercentage" />
    </div>

    <div class="row">
      <div class="label">
        <label>Extra reveal rounds</label>
      </div>
      <Input v-model="extraRevealRounds" />
    </div>

    <div class="row">
      <div class="label">
        <label>Extra commit rounds</label>
      </div>
      <Input v-model="extraCommitRounds" />
    </div>

    <div class="row">
      <div class="label">
        <label>Backup witnesses</label>
      </div>
      <Input v-model="backupWitnesses" />
    </div>

    <div class="row">
      <div class="label">
        <label>Data request fee</label>
      </div>
      <InputNumber v-model="fee" />
    </div>

    <div class="row">
      <div class="label">
        <label>Reward fee</label>
      </div>
      <InputNumber v-model="rewardFee" />
    </div>

    <div class="row">
      <div class="label">
        <label>Commit fee</label>
      </div>
      <InputNumber v-model="commitFee" />
    </div>

    <div class="row">
      <div class="label">
        <label>Reveal fee</label>
      </div>
      <InputNumber v-model="revealFee" />
    </div>

    <div class="row">
      <div class="label">
        <label>Tally fee</label>
      </div>
      <InputNumber v-model="tallyFee" />
    </div>

    <div class="submit">
      <Button
        @keydown.enter.esc.prevent="createDataRequest"
        data-test="create-data-request-submit"
        :onClick="createDataRequest"
        type="primary"
      >
        Continue
      </Button>
    </div>
  </div>
</template>

<script>
import InputNumber from './InputNumber'
import Input from './Input'
import Button from './Button'

export default {
  name: 'CreateDataRequestForm',
  components: {
    Button,
    Input,
    InputNumber,
  },
  data() {
    return {
      backupWitnesses: 3,
      commitFee: 1,
      dataRequest: 1,
      extraCommitRounds: 3,
      extraRevealRounds: 3,
      fee: 1,
      minConsensusPercentage: 51,
      revealFee: 1,
      rewardFee: 1,
      tallyFee: 1,
      witnesses: 3,
    }
  },
  methods: {
    createDataRequest() {
      this.$emit('create-dr', {
        backupWitnesses: this.backupWitnesses,
        commitFee: this.commitFee,
        dataRequest: this.dataRequest,
        extraCommitRounds: this.extraCommitRounds,
        extraRevealRounds: this.extraRevealRounds,
        fee: this.fee,
        minConsensusPercentage: this.minConsensusPercentage,
        revealFee: this.revealFee,
        rewardFee: this.rewardFee,
        tallyFee: this.tallyFee,
        witnesses: this.witnesses,
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.form {
  margin: 0px 16px 16px 16px;
  .title {
    color: $grey-4;
    font-size: 18px;
    margin-bottom: 40px;
  }
  .row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .label {
      min-width: 110px;
      font-size: 16px;
      text-align: left;
      margin-right: 16px;
    }
    .input {
      text-align: left;
      padding-left: 16px;
    }
  }
  .submit {
    width: 100%;
    text-align: right;
    padding-top: 40px;
  }
}
</style>
