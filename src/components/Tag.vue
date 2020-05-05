<template functional>
  <span class="tag" :class="[props.color]">
    {{ props.text }}
  </span>
</template>

<script>
/**
 * Tag component
 */
export default {
  name: 'Tag',
  props: {
    /**
     * Background color
     * @values green, red
     */
    color: {
      type: String,
      required: true,
    },
    /**
     * Text to show inside the tag
     */
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.tag {
  font-size: 10px;
  font-weight: bold;
  color: $white;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  border-radius: 2px;
  user-select: none;

  &.green {
    background: $green-3;
  }

  &.red {
    background: $red-2;
  }
}
</style>

<docs>
### Examples

#### Green
```jsx
  <Tag color="green" text="SUCCESS" />
```

#### Red
```jsx
  <Tag color="red" text="ERROR" />
```

</docs>
