<template>
<div class="receive">
  <Card class="card" title="NEW PAYMENT REQUEST">
    <div class="layout">
      <div class="form">
        <div class="row">
          <div class="label">
            <label class="" for>Label</label>
          </div>
          <Input v-model="label" />
        </div>

        <div class="submmit-button">
        <Button class="button" :onClick="generateAddress" type="primary">Generate address</Button>
        </div>
      </div>
    </div>
  </Card>

  <div class="text">
    <p class="title"> About payment requests </p>
    <p class="paragraph">
      Every time you generate a receiving address in
      Sheikah, you can label and store it as a payment
      request. This allows you to better trace every
      payment you receive.
    </p>

    <p class="paragraph">
      You can generate as many payment requests
      at once. However, it is advised that you only
      generate as you need them, instead of creating
      a lot of them  preemptively.
    </p>

    <p class="paragraph">
      All this data is completely private and it is only
      stored in your device in a encrypted database
      that only you can read.
    </p>
  </div>
</div>
</template>

<script>
import Card from './card/Card'
import Button from './Button'
import Input from './Input'
import InputNumber from './InputNumber'
import Select from './Select'

export default {
  name: 'receive',
  components: {
    Card,
    Button,
    Input,
    InputNumber,
    Select,
  },
  data () {
    return {
      label: '',
      amount: 0,
      expires: '',
      options: [
        { value: 0, primaryText: 'Never', secondaryText: '' },
      ],
    }
  },
  methods: {
    generateAddress () {
      this.$store.dispatch('generateAddress', { label: this.label, expires: this.expires, amount: this.amount })
    },
  },

  computed: {
    generatedAddress () {
      return this.$store.state.wallet.generatedAddress
    },
  },
}
</script>

<style lang="scss" scoped>
.receive{
  padding: 32px;
  display: flex;
  justify-content: space-between;

  .text {
    width: 300px;

    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 12px;
    }

    .paragraph {
      font-weight: lighter;
      font-style: italic;
      margin-bottom: 12px;
    }
  }

  .card {
    max-width: 400px;
    min-width: 400px;

    .layout {
      display: flex;

      .row {
        display: flex;
        align-items: center;

        .label {
          min-width: 64px;
          margin-right: 24px;
          text-align: right;
        }
      }

      .submit {
        margin-top: 20px;
        width: 100%;
        text-align: right;
      }
    }
  }
}

@media only screen and (max-width: 1500px) {
  .receive {
    flex-direction: column-reverse;

    .text {
      margin-bottom: 10px;
      width: 100%;
    }
  }
}
</style>
