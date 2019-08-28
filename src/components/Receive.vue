<template>
  <div class="receive">
    <div>
      <Card class="card" title="NEW PAYMENT REQUEST">
        <div class="layout">
          <div class="form">
            <div class="row">
              <div class="label">
                <label class for>Label</label>
              </div>
              <Input v-model="label" />
            </div>

            <div class="submit">
              <Button class="button" :onClick="generateAddress" type="primary"
                >Generate address</Button
              >
            </div>
          </div>
        </div>
      </Card>

      <Card class="card" title="GENERATED ADDRESSES">
        <p class="address" v-for="address in addresses" :key="address.address">
          {{ address.address }}
        </p>
      </Card>
    </div>
    <div class="text">
      <p class="title">About payment requests</p>
      <p class="paragraph">
        Every time you generate a receiving address in Sheikah, you can label and store it as a
        payment request. This allows you to better trace every payment you receive.
      </p>
      <p class="paragraph">
        You can generate as many payment requests at once. However, it is advised that you only
        generate as you need them, instead of creating a lot of them preemptively.
      </p>

      <p class="paragraph">
        All this data is completely private and it is only stored in your device in a encrypted
        database that only you can read.
      </p>
    </div>
  </div>
</template>

<script>
import Card from './card/Card'
import Button from './Button'
import Input from './Input'

export default {
  name: 'receive',
  beforeCreate() {
    this.$store.dispatch('getAddresses')
  },
  components: {
    Card,
    Button,
    Input,
  },
  data() {
    return {
      label: '',
    }
  },
  methods: {
    generateAddress() {
      this.$store.dispatch('generateAddress', {
        label: this.label,
      })
    },
  },
  computed: {
    addresses() {
      return this.$store.state.wallet.addresses
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.receive {
  padding: 32px;
  display: flex;
  justify-content: space-between;

  .text {
    width: 300px;

    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .paragraph {
      font-weight: lighter;
      font-style: italic;
      margin-bottom: 16px;
    }
  }

  .card {
    max-width: 400px;
    min-width: 400px;
    margin-bottom: 32px;

    .address {
      text-align: center;
      width: 100%;
      border-bottom: 1px solid $grey-0;
      padding: 16px;
      color: $black;
      font-weight: 500;
    }

    .address:last-child {
      border: none;
    }

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
        margin-top: 24px;
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
      margin-bottom: 16px;
      width: 100%;
    }
  }
}
</style>
