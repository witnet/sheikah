<template>
    <button :class="normalizeType(type)" @click="onClick" :nativeType=nativeType>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    nativeType: String,
    onClick: Function,
    type: String,
  },
  methods: {
    normalizeType (propType) {
      const buttonTypes = ['danger', 'dashed', 'default', 'positive', 'primary', 'navigation']
      return buttonTypes.includes(propType) ? propType : 'default'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.default, .primary,
.danger, .dashed, .positive {
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  height: 32px;
  line-height: 1.5;
  padding: 0 15px;
  text-align: center;
  transition: all 0.25s;
  border: none;
}

:active, :focus, :hover {
  outline: none;
}

.default {
  background-color: $grey-4;
  border: 1px solid $grey-4;
  color: $grey-8;
  &:active {
    border: 1px solid $blue-6;
    color: $blue-6;
  }
}

.primary {
  background-color: $blue-6;
  color: $grey-1;
  &:active {
    background-color: $blue-5;
    color: $grey-1;
  }
}

.danger {
  background-color: $red-6;
  color: $grey-3;
  &:active {
    background-color: $grey-3;
    border-color: $red-5;
    color: $red-5;
  }
}

.dashed {
  background: $grey-1;
  border: 1px dashed $grey-5;
  color: $grey-8;
  &:active {
    border: 1px dashed $blue-5;
    color: $blue-5;
  }
}

.positive {
  background-color: $green-7;
  color: $grey-1;
  &:active {
    background-color: $green-5;
    border-color: $green-5;
    color: $grey-1;
  }
}
</style>
