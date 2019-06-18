<template>
  <input
    v-model="inputValue"
    :class="`input ${getClass(type)}`"
    :placeholder="placeholder"
    :type="nativeType"
  />
</template>

<script>
export default {
  name: 'Input',
  props: {
    nativeType: String,
    placeholder: String,
    type: String,
    value: {
      required: true,
    },
  },
  data () {
    return {
      inputValue: this.value,
    }
  },
  methods: {
    getClass (className) {
      const classes = ['big', 'underlined']
      return classes.includes(className) ? className : 'default'
    },
  },
  watch: {
    inputValue (value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
.input {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;

  &.big {
    border: $input_big-border;
    border-radius: $input_big-border-radius;
    min-height: 80px;
    transition: all 0.1s ease;
    width: $input_big-width;

    &:hover,
    &:focus {
      border: $input_big-hover-border;
      box-shadow: $input_big-hover-box-shadow;
      outline: 0;
      outline-color: transparent;
      outline-style: none;
    }
  }

  &.default {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #777;
    font-size: 14px;
    line-height: 32px;
    padding: 4px 12px;
  }

  &.underlined {
    border: 0;
    border-bottom: $input_underlined-border;
    border-radius: 0;
    color: $input_underlined-color;

    &:focus, &:hover {
      box-shadow: none;
      outline: none;
    }
  }

}
</style>
