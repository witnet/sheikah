<template>
  <div class="card" :class="{ selected: selected, used: used }" @click="onClick"></div>
</template>

<script>
// TODO: Research why docs don't change according to the passed props.

/**
 * Small card that represent a single address
 */
export default {
  name: 'AddressCard',
  props: {
    /**
     * Indicates if the card is selected
     */
    selected: {
      required: false,
      default: false,
      type: Boolean,
    },
    /**
     * Indicates if the address has been used
     */
    used: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    onClick() {
      /**
       * Indicates that the card has been clicked
       */
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.card {
  width: 25px;
  height: 40px;
  background: $green-3;
  border: 1px solid $green-5;
  border-radius: 3px;
  cursor: pointer;
  position: relative;

  .used {
    background: $red-2;
    border: 1px solid $red-3;
  }

  .selected,
  &:hover {
    &::after {
      content: ' ';
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border: 1px solid $alt-grey-5;
      border-radius: 5px;
    }
  }
}
</style>

<docs>
### Examples

#### Not Used
```jsx
  <AddressCard :used="false" />
```

#### Used
```jsx
  <AddressCard :used="true" />
```

#### Selected
```jsx
  <AddressCard :used="false" :selected="true" />
```
</docs>
