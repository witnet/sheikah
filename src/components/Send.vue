<template>
<div class="send">
  <BaseCard class="card" title="NEW TRANSACTION">
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

    <Button class="button" :onClick="() => 0" type="primary">Sign and send</Button>
  </BaseCard>
</div>
</template>

<script>
import BaseCard from './BaseCard'
import Button from './Button'
import Input from './Input'
import InputNumber from './InputNumber'
import Select from './Select'

export default {
  name: 'send',
  components: {
    BaseCard,
    Button,
    Input,
    InputNumber,
    Select,
  },
  data () {
    return {
      address: '',
      label: '',
      amount: 0,
      fee: '',
      options: [
        { value: 79, primaryText: 'High', secondaryText: '79 uWit/B' },
        { value: 59, primaryText: 'Medium', secondaryText: '59 uWit/B' },
        { value: 39, primaryText: 'Low', secondaryText: '39 uWit/B' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.send {
  padding: 32px;

  .card {
    max-width: 1000px;
    min-width: 500px;
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

    .button {
      margin-left: 96px;
      margin-top: 24px;
    }
  }
}
</style>
