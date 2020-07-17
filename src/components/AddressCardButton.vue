<template>
  <!--  Emit click event to indicate a new address should be created -->
  <el-tooltip content="Generate new address" placement="right" effect="light">
    <el-button ref="btn" class="card" @click="$emit('click')">
      <font-awesome-icon class="icon" icon="plus" />
    </el-button>
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
  border: 1px dashed rgb(102, 100, 140, 0.5);
  border-radius: 3px;
  color: rgb(68, 66, 64, 0.5);
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  position: relative;
  width: 25px;

  &:focus,
  &:hover {
    border: 1px dashed rgb(170, 168, 189, 0.5);
    color: rgb(170, 168, 189, 0.5);
  }

  &:active {
    border: 1px dashed rgb(102, 100, 140, 0.5);
    color: rgb(68, 66, 64, 0.5);
  }
}
</style>

<docs>
### Example

```jsx
  <AddressCardButton />
```
</docs>
