<template>
  <div class="inputnumber">
    <Input data-test="send-amount" v-model="inputValue" />
    <font-awesome-icon
      data-test="send-increase-amount"
      @click="increase"
      class="increase"
      icon="angle-up"
    />
    <div class="unit">
      <p class="text">WIT</p>
    </div>
  </div>
</template>

<script>
import Input from './Input'

export default {
  name: 'InputNumber',
  components: {
    Input,
  },
  props: {
    value: [String, Number],
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(inputValue) {
        this.$emit('input', inputValue)
      },
    },
  },
  methods: {
    increase() {
      this.$emit('input', parseInt(this.value, 10) + 1)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.inputnumber {
  display: flex;
  width: max-content;
  min-width: max-content;

  .input {
    height: 35px;
    width: 140px;
    border-radius: 4px 0px 0px 4px;
    border-right: none;
    outline-color: $blue-5;
  }
  .increase {
    width: 48px;
    height: 35px;
    padding: 8px;
    color: $grey-1;
    border: 1px solid $grey-1;

    &:hover {
      color: $blue-6;
    }
  }

  .unit {
    width: 60px;
    height: 35px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $grey-2;
    border-radius: 0 4px 4px 0;

    .text {
      margin: 0;
      color: $white;
    }
  }
}
</style>
