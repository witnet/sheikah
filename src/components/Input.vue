<template>
  <textarea
    :ref="`input${Date.now()}`"
    v-model="inputValue"
    data-test="textarea"
    v-bind="$attrs"
    class="input"
    :class="{
      big: type === 'big',
      underlined: type === 'underlined',
      default: type !== 'underlined' && type !== 'big',
      autoresize,
    }"
    :placeholder="placeholder"
    @keydown.enter.esc.prevent="toogleGoNextItem"
  />
</template>

<script>
import resizeMixin from '@/components/resizeMixin.js'

export default {
  // inheritAttrs: false,
  name: 'Input',
  // TODO: fix mixing
  mixins: [resizeMixin],
  props: {
    maxlength: {
      type: Number,
      default: null,
    },
    nativeType: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: [Number, String],
      default: '',
    },
    modelValue: {
      type: String,
      required: true,
    },
    autoresize: {
      type: Boolean,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue
      },
      set(inputValue) {
        this.$emit('update:modelValue', inputValue)
      },
    },
  },
  watch: {
    inputValue(value) {
      this.$emit('input', value)
    },
  },
  mounted() {
    if (this.autoresize) {
      this.makeItAutoresizeable(this.$refs[Object.keys(this.$refs)[0]])
    }
  },
  methods: {
    toogleGoNextItem() {
      this.$emit('go-next')
    },
    getClass(className) {
      const classes = ['big', 'underlined']
      return classes.includes(className) ? className : 'default'
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.input {
  background: transparent;
  box-sizing: border-box;
  display: inline-block;
  resize: none;
  width: 100%;

  &.autoresize {
    overflow: hidden;
  }

  &.big {
    border: var(--seed-big-border);
    border-radius: $input_big-border-radius;
    font-size: 22px;
    min-height: 80px;
    transition: all 0.1s ease;
    width: $input_big-width;

    &:hover,
    &:focus {
      border: var(--seed-hover-border);
      box-shadow: var(--seed-hover-box-shadow);
      outline: 0;
      outline-color: transparent;
      outline-style: none;
    }
  }

  &.default {
    background-color: $white;
    border: 1px solid $alt-grey-1;
    border-radius: 4px;
    color: $alt-grey-3;
    font-size: 16px;
    line-height: 32px;
    text-align: center;
  }

  &.underlined {
    border: 0;
    border-bottom: $input_underlined-border;
    border-radius: 0;
    color: $input_underlined-color;

    &:focus,
    &:hover {
      box-shadow: none;
      outline: none;
    }
  }
}
</style>
