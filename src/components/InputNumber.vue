<template>
  <div class="inputnumber">
    <el-input v-model="inputValue" data-test="tx-amount">
      <template slot="append">
        <div class="increase" @click="increase">
          <div class="icon">
            <font-awesome-icon
              data-test="send-increase-amount"
              icon="angle-up"
            />
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
    value: {
      type: [String, Number],
      default: '',
    },
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
  align-items: center;
  display: flex;
  min-width: max-content;
  width: max-content;

  .increase {
    align-items: center;
    color: $alt-grey-3;
    display: flex;

    &:hover {
      color: $purple-4;
      cursor: pointer;
    }
  }

  .text {
    color: $alt-grey-3;
    font-size: 14px;
    margin-left: 16px;
  }

  .unit {
    align-items: center;
    background-color: $alt-grey-2;
    border-radius: 0 4px 4px 0;
    display: flex;
    height: 35px;
    justify-content: center;
    padding: 8px;
    width: 60px;

    .text {
      color: $white;
      margin: 0;
    }
  }
}
</style>
