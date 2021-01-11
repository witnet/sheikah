<template>
  <!--  Emit click event to indicate a new address should be created -->
  <el-tooltip
    :content="$t('generate_address')"
    placement="right"
    effect="light"
  >
    <button ref="btn" class="card" @click="$emit('click')">
      <font-awesome-icon class="icon" icon="plus" />
    </button>
  </el-tooltip>
</template>

<script>
/**
 * Button that helps generate Addresses.
 */
export default {
  name: 'AddressCardButton',
  methods: {
    focus() {
      this.$refs.btn.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  align-items: center;
  background: none;
  border: var(--address-card-button-border);
  border-radius: 3px;
  color: var(--address-card-button-color);
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  position: relative;
  width: 25px;

  &:focus,
  &:hover {
    border: var(--address-card-button-border-hover);
    color: var(--address-card-button-color-hover);
  }

  &:active {
    border: var(--address-card-button-border-active);
    color: var(--address-card-button-color-active);
  }
}
</style>

<docs>
### Example

```jsx
  <AddressCardButton />
```
</docs>
