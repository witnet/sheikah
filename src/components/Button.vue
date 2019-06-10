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
      const buttonTypes = ['danger', 'dashed', 'default', 'navigation', 'option', 'positive', 'primary']
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
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  height: 32px;
  line-height: 1.5;
  padding: 0 15px;
  text-align: center;
  transition: all 0.25s;
  border: none;
  cursor: pointer;
  min-width: max-content;
}

:active,
:focus,
:hover {
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

.option {
  align-items: center;
  background: $button_option-background;
  border: $button_option-border;
  color: $button_option-color;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font: inherit;
  height: 65px;
  justify-content: space-between;
  outline: inherit;
  padding: 0 20px;
  width: 450px;
  &:hover {
    border-color: #9999;
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
    border-left:0;
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
