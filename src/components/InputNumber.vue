<template>
  <div class="inputnumber">
    <el-input data-test="tx-amount" v-model="inputValue">
      <template slot="append">
        <div class="increase" @click="increase">
          <div class="icon">
            <font-awesome-icon data-test="send-increase-amount" icon="angle-up" />
          </div>
        </div>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'InputNumber',
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
  align-items: center;
  width: max-content;
  min-width: max-content;
  .increase {
    display: flex;
    align-items: center;
    color: $grey-4;
    &:hover {
      cursor: pointer;
      color: $purple-6;
    }
  }
  .text {
    color: $grey-4;
    font-size: 14px;
    margin-left: 16px;
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
