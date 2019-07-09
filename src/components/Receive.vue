<template>
<div class="receive">
  <BaseCard class="card" title="NEW PAYMENT REQUEST">
    <div class="layout">
      <div class="form">
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
            <label class="" for>Expires</label>
          </div>
          <Select v-model="expires" :options="options" />
        </div>
        <Button class="button" :onClick="generateAddress" type="primary">Save and generate address</Button>
      </div>

      <div class="qr">
        <p v-show="!generatedAddress" class="text">Your QR code will appear here once the payment request is saved</p>
        <qrcode :class="`code ${!generatedAddress ? 'blur': '' }`" :value="generatedAddress || 'witnet'" :options="{ width: 300 }"></qrcode>
      </div>
    </div>
  </BaseCard>

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
import BaseCard from './BaseCard'
import Button from './Button'
import Input from './Input'
import InputNumber from './InputNumber'
import Select from './Select'

export default {
  name: 'receive',
  components: {
    BaseCard,
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
    max-width: 1000px;
    min-width: 900px;

    .layout {
      display: flex;

      .qr {
        position: relative;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content:center;
        z-index: 1;

        .code {
          width: 300px;

          &.blur {
            opacity: 0.1;
            filter: blur(9px);
          }
        }

        .text {
          font-size: 18px;
          z-index:2;
          position: absolute;
        }
      }

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
        margin-left: 88px;
        margin-top: 24px;
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
