<template>
  <button :class="checkType(type)" @click="onClick" nativeType="submit">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: String,
    nativeType: String,
  },
  methods: {
    onClick () {
      this.$emit('click')
    },
    checkType (propType) {
      switch (propType) {
        case 'default':
          return propType
        case 'primary':
          return propType
        case 'dashed':
          return propType
        case 'danger':
          return propType
        case 'positive':
          return propType
        case 'navigation-button':
          return propType
        default:
          return 'default'
      }
    },
  },
}

</script>

<style lang="scss">
  @import '@/styles/_colors.scss';
  @import '@/styles/theme.scss';

  .default {
    background-color: $grey-4;
    border-radius: 4px;
    border: 1px solid $grey-5;
    color: $grey-8;
    font-size: 14px;
    font-weight: 400;
    height: 32px;
    line-height: 1.5;
    padding: 0 15px;
    text-align: center;
    transition: all 0.25s;

    &:hover {
      border: 1px solid $blue-6;
      color: $blue-6;
    }
  }

  .primary {
    background-color: $blue-6;
    border-color: $blue-5;
    border-radius: 4px;
    color: $grey-1;
    height: 32px;
    padding: 0 15px;
    text-align: center;
    transition: all 0.25s;

    &:hover,
    &:focus {
      background-color: $blue-5;
      border-color: $blue-4;
      color: $grey-1;
    }

    &:active {
      background-color: $grey-3;
      border-color: $green-7;
      color: $green-7;
    }
  }

  .dashed {
    background: $grey-1;
    border-radius: 4px;
    border: 1px dashed $grey-5;
    color: $grey-8;
    height: 32px;
    padding: 0 15px;
    text-align: center;
    transition: all 0.25s;

    &:hover,
    &:focus {
      border: 1px dashed $blue-5;
      color: $blue-5;
    }
  }

  .danger {
    background-color: $red-6;
    border-color: $grey-5;
    color: $grey-3;
    border-radius: 4px;
    height: 32px;
    padding: 0 15px;
    text-align: center;
    transition: all 0.25s;

    &:hover,
    &:focus {
      background-color: $grey-3;
      border-color: $red-5;
      color: $red-5;
    }
  }

  .positive {
    background-color: $green-7;
    border-color: $green-7;
    color: $grey-1;
    border-radius: 4px;
    height: 32px;
    padding: 0 15px;
    transition: all 0.25s;

    &:hover,
    &:focus {
      background-color: $green-5;
      border-color: $green-5;
      color: $grey-1;
    }
  }

  .navigation-button {
    background: $button_navigation-background;
    border-color: $button_navigation-border-color;
    border-radius: 0;
    border-style: $button_navigation-border-style;
    border-width: 1px 1px 0 0;
    color: $button_navigation-color;
    cursor: pointer;
    font: inherit;
    height: 50px;
    width: 50%;
  }

</style>
