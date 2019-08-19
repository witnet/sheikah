<template>
  <div class="send">
    <Card class="card" title="NEW TRANSACTION">
      <div class="row">
        <div class="label">
          <label class="" for>Address</label>
        </div>
        <Input v-model="address" placeholder="Recipient address" />
      </div>

      <div class="row">
        <div class="label">
          <label class="" for>Label</label>
        </div>
        <Input v-model="label" />
      </div>

      <div class="row">
        <div class="label">
          <label class="" for>Amount</label>
        </div>
        <InputNumber v-model="amount" />
      </div>
      <div class="row">
        <div class="label">
          <label class="" for>Fee</label>
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
          <p class="value">{{ generatedTransaction.amount }}</p>
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
          <p class="entry">From</p>
          <p></p>
          <div class="column">
            <p class="address value" v-for="address in generatedTransaction.from" :key="address">
              {{ address }}
            </p>
          </div>
        </div>
        <div class="row">
          <p class="entry">Fee</p>
          <p class="value">{{ generatedTransaction.fee }} uWit/B</p>
        </div>
      </div>
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
      showDialog: false,
      address: '',
      label: '',
      amount: 0,
      fee: 0,
      options: [
        { value: 79, primaryText: 'High', secondaryText: '79 uWit/B' },
        { value: 59, primaryText: 'Medium', secondaryText: '59 uWit/B' },
        { value: 39, primaryText: 'Low', secondaryText: '39 uWit/B' },
      ],
    }
  },
  methods: {
    confirmTransaction() {
      this.$store.dispatch('sendTransaction')
      this.showDialog = false
    },
    createVTT() {
      this.$store.dispatch('createVTT', {
        label: this.label,
        address: this.address,
        amount: this.amount,
        fee: this.fee,
      })
    },
    closeDialog() {
      this.showDialog = false
    },
  },
  computed: {
    generatedTransaction() {
      return this.$store.state.wallet.generatedTransaction
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
  }

  .value {
    font-size: 16px;
    font-weight: 400;
  }
  .address {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 150px;
  }

  .row {
    padding: 15px 10px;
    width: 250px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #bfbfbf;

    .column {
      display: flex;
      flex-direction: column;
    }
  }
}

.dialog-footer {
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
</style>
