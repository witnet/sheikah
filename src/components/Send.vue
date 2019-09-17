<template>
  <div class="send">
    <Card class="card" title="NEW TRANSACTION">
      <div class="row">
        <div class="label">
          <label class for>Address</label>
        </div>
        <Input v-model="address" placeholder="Recipient address" />
      </div>

      <div class="row">
        <div class="label">
          <label class for>Label</label>
        </div>
        <Input v-model="label" />
      </div>

      <div class="row">
        <div class="label">
          <label class for>Amount</label>
        </div>
        <InputNumber v-model="amount" />
      </div>
      <div class="row">
        <div class="label">
          <label class for>Fee</label>
        </div>
        <Select v-model="fee" :options="options" />
      </div>
      <div class="submit">
        <Button :onClick="createVTT" type="primary">Sign and send</Button>
      </div>
    </Card>

    <el-dialog title="Confirm Transaction" :visible.sync="showDialog" width="40%" center>
      <div v-if="generatedTransaction" class="transaction-info">
        <div class="row">
          <p class="entry">Amount</p>
          <p class="value">{{ generatedTransaction.amount }} Wit</p>
        </div>
        <div class="row">
          <p class="entry">Type</p>
          <p class="value">{{ generatedTransaction.type }}</p>
        </div>
        <div class="row">
          <p class="entry">To</p>
          <p class="value">{{ generatedTransaction.to }}</p>
        </div>
        <div class="row">
          <p class="entry">Fee</p>
          <p class="value">{{ generatedTransaction.fee }} uWit/B</p>
        </div>

        <div v-if="isAdvancedVisible" class="row">
          <p class="entry">Inputs</p>
          <p></p>
          <div class="column">
            <p class="address value" v-for="input in generatedTransaction.inputs" :key="input">
              {{ input }}
            </p>
          </div>
        </div>
        <div v-if="isAdvancedVisible" class="row">
          <p class="entry">Outputs</p>
          <p></p>
          <div class="column">
            <p class="address value" v-for="output in generatedTransaction.outputs" :key="output">
              <span>PKH: {{ output.pkh }}</span>
              <span>Amount: {{ output.value }}</span>
            </p>
          </div>
        </div>

        <div v-if="isAdvancedVisible" class="row">
          <p class="entry">Bytes</p>
          <p></p>
          <div class="column">
            <p class="address value">{{ generatedTransaction.bytes }}</p>
          </div>
        </div>
      </div>
      <p v-if="!isAdvancedVisible" @click="toggleAdvanceOptions" class="link">
        Show advanced options
      </p>
      <p v-if="isAdvancedVisible" @click="toggleAdvanceOptions" class="link">Show less</p>
      <span slot="footer" class="dialog-footer">
        <Button :onClick="closeDialog" type="secondary" class="button">Cancel</Button>
        <Button :onClick="confirmTransaction" type="primary" class="button">Confirm</Button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Card from './card/Card'
import Button from './Button'
import Input from './Input'
import InputNumber from './InputNumber'
import Select from './Select'

export default {
  name: 'send',
  components: {
    Card,
    Button,
    Input,
    InputNumber,
    Select,
  },
  data() {
    return {
      isAdvancedVisible: false,
      showDialog: false,
      address: '',
      label: '',
      amount: 0,
      fee: { value: 79, primaryText: 'High', secondaryText: '79 uWit/B' },
      options: [
        { value: 79, primaryText: 'High', secondaryText: '79 uWit/B' },
        { value: 59, primaryText: 'Medium', secondaryText: '59 uWit/B' },
        { value: 39, primaryText: 'Low', secondaryText: '39 uWit/B' },
      ],
    }
  },
  computed: {
    generatedTransaction() {
      return this.$store.state.wallet.generatedTransaction
    },
  },
  methods: {
    toggleAdvanceOptions() {
      this.isAdvancedVisible = !this.isAdvancedVisible
    },

    confirmTransaction() {
      this.$store.dispatch('sendTransaction')
      this.showDialog = false
    },
    createVTT() {
      this.$store.dispatch('createVTT', {
        label: this.label,
        address: this.address,
        amount: this.amount,
        fee: this.fee.value,
      })
    },
    closeDialog() {
      this.showDialog = false
    },
  },
  watch: {
    generatedTransaction(value) {
      if (value) {
        this.showDialog = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.transaction-info {
  align-items: center;
  display: flex;
  flex-direction: column;

  .entry {
    font-weight: bold;
    font-size: 14px;
    color: #333;
    min-width: max-content;
    width: 70px;
    margin-right: 16px;
  }

  .value {
    font-size: 16px;
    font-weight: 400;
  }

  .row {
    padding: 15px 10px;
    width: 80%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #bfbfbf;
    margin: 0 0 16px 0;

    .column {
      display: flex;
      flex-direction: column;
    }
  }
}

.send {
  padding: 32px;

  .card {
    max-width: 650px;
    min-width: 650px;
    .row {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      max-width: 600px;

      .label {
        min-width: 64px;
        margin-right: 24px;
        text-align: right;
      }
    }
    .submit {
      width: 100%;
      text-align: right;
    }
  }
}

.dialog-footer {
  margin-top: 16px;
  .button {
    margin-right: 15px;
  }
}

.send {
  padding: 32px;

  .card {
    max-width: 650px;
    min-width: 650px;
    .row {
      display: flex;
      align-items: center;
      max-width: 600px;

      .label {
        min-width: 64px;
        margin-right: 24px;
        text-align: right;
      }
    }
    .submit {
      width: 100%;
      text-align: right;
    }
  }
}
</style>
