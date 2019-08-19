<template>
  <div class="inputnumber">
    <Input v-model="inputValue" />
    <font-awesome-icon @click="increase" class="increase" icon="angle-up" />
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
.inputnumber {
  display: flex;
  width: max-content;
  min-width: max-content;

  .input {
    border-radius: 4px 0px 0px 4px;
    border-right: none;
    outline-color: #40a9ff;
  }
  .increase {
    width: 42px;
    height: 42px;
    font-size: 18px;
    padding: 10px;
    color: #ccc;
    border: 1px solid #ccc;

    &:hover {
      color: #1a6cfb;
    }
  }

  .unit {
    padding: 8px;
    display: flex;
    align-items: center;
    background-color: #b3b3b3;
    border-radius: 0 4px 4px 0;

    .text {
      margin: 0;
      font-weight: bold;
      color: white;
    }
  }
}
</style>
