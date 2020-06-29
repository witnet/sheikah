<template>
  <!--  Emit click event to indicate a new address should be created -->
    <el-tooltip content="Generate new address" placement="right" effect="light">
  <div class="card" @click="$emit('click')">
      <font-awesome-icon class="icon" icon="plus" />
  </div>
    </el-tooltip>
</template>

<script>
/**
 * Button that helps generate Addresses.
 */
export default {
  name: 'AddressCardButton',
}
</script>

<style lang="scss" scoped>
.card {
  align-items: center;
  border: 1px dashed rgb(68, 66, 64, 0.5);
  border-radius: 3px;
  color: rgb(68, 66, 64, 0.5);
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  position: relative;
  width: 25px;
}
</style>

<docs>
### Example

```jsx
  <AddressCardButton />
```
</docs>
