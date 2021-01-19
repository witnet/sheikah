<template>
  <div
    class="card"
    :class="{ selected: selected, used: used }"
    @click="onClick"
  ></div>
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
  background: var(--address-card-background);
  border: var(--address-card-border-not-used);
  border-radius: 3px;
  cursor: pointer;
  height: 40px;
  position: relative;
  width: 25px;

  .used {
    background: $red-2;
    border: var(--address-card-border-used);
  }

  .selected,
  &:hover {
    &::after {
      border: var(--address-card-selected-border-active);
      border-radius: 5px;
      bottom: -4px;
      content: ' ';
      left: -4px;
      position: absolute;
      right: -4px;
      top: -4px;
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
