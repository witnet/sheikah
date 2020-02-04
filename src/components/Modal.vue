<template>
  <el-dialog>
    <slot></slot>

    <span slot="footer">
      <slot name="footer"></slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Modal',
}
</script>

<style></style>

<docs>
Basic modal component. Wrapper of the [Element Dialog](https://element.eleme.io/#/en-US/component/dialog) component.


## Examples

Orange button:
```jsx
  <Modal></Modal>
```

Ugly button with pink font and blue background:

```jsx
<app-button color="pink" background="blue">
  Ugly button
</app-button>
```

Button containing custom tags:

```jsx
<app-button>
  Text with <b>bold</b>
</app-button>
```
</docs>
