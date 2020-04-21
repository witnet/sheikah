<template>
  <!--  Emit click event to indicate a new address should be created -->
  <div class="card" @click="$emit('click')">
    <font-awesome-icon class="icon" icon="plus" />
  </div>
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
  width: 25px;
  height: 40px;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  border: 1px dashed rgb(68, 66, 64, 0.5);
  color: rgb(68, 66, 64, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<docs>
### Example

```jsx
  <AddressCardButton />
```
</docs>
