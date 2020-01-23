<template>
  <div data-test="fees-dr-form" class="form">
    <div class="title">Select the fees for the data request</div>
    <div v-for="fee in fees" :key="fee.label" class="row">
      <div class="label">
        <label class for>{{ fee.label }}</label>
      </div>
      <InputNumber data-test="fee-input" v-model="fee.amount" />
    </div>
    <div class="submit">
      <Button
        @keydown.enter.esc.prevent="createDataRequest"
        data-test="sign-send-btn"
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
import Button from './Button'

export default {
  name: 'CreateDataRequestForm',
  components: {
    InputNumber,
    Button,
  },
  props: {
    fees: Array,
  },
  methods: {
    createDataRequest() {
      this.$emit('create-dr', this.fees)
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
      text-align: right;
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
