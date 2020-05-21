<template>
  <button
    :class="normalizeType(type)"
    :nativeType="nativeType"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    nativeType: {
      type: String,
      default: '',
    },
    onClick: {
      type: Function,
      default: () => {},
    },
    type: {
      type: String,
      default: '',
    },
  },
  methods: {
    normalizeType(propType) {
      const buttonTypes = [
        'danger',
        'dashed',
        'default',
        'navigation',
        'option',
        'positive',
        'primary',
      ]
      return buttonTypes.includes(propType) ? propType : 'default'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.default,
.primary,
.danger,
.dashed,
.positive {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  height: 42px;
  line-height: 1.5;
  min-width: max-content;
  padding: 0 16px;
  text-align: center;
  transition: all 0.25s;
  z-index: -1;
}

:active,
:hover,
:focus {
  outline-color: $purple-4;
}

.default {
  background-color: $white;
  border: 1px solid $purple-4;
  color: $purple-4;

  &:active {
    border: 1px solid $purple-4;
    color: $purple-4;
  }
}

.primary {
  background-color: $purple-4;
  color: $white;

  &:active {
    background-color: $purple-4;
    color: $white;
  }
}

.danger {
  background-color: $red-4;
  color: $alt-grey-5;

  &:active {
    background-color: $alt-grey-5;
    border-color: $red-5;
    color: $red-5;
  }
}

.dashed {
  background: $alt-grey-1;
  border: 1px dashed $alt-grey-5;
  color: $alt-grey-5;

  &:active {
    border: 1px dashed $purple-4;
    color: $purple-4;
  }
}

.positive {
  background-color: $green-5;
  color: $alt-grey-1;

  &:active {
    background-color: $green-5;
    border-color: $green-5;
    color: $alt-grey-1;
  }
}

.option {
  align-items: center;
  background: $white;
  border: $button_option-border;
  color: $button_option-color;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font: inherit;
  height: 65px;
  justify-content: space-between;
  outline: inherit;
  padding: 0 24px;
  width: 450px;

  &:hover {
    border-color: $alt-grey-3;
  }

  &:active {
    background: $button_option-active-background;
    border-color: $button_option-active-border-color;
    box-shadow: $button_option-active-box-shadow;
    color: $button_option-active-color;
  }
}

.navigation {
  background: $button_navigation-background;
  border-color: $button_navigation-border-color;
  border-radius: 0;
  border-style: $button_navigation-border-style;
  border-width: 1px 1px 0 0;
  color: $button_navigation-color;
  cursor: pointer;
  font: inherit;
  height: 60px;
  padding: 0;
  width: 50%;

  &:last-of-type {
    border-left: 0;
  }

  &:focus {
    border-color: $button_navigation-border-color;
  }

  &:active {
    background: $button_navigation-hover-background;
  }
}

.recommended {
  height: 75px;
}
</style>
