<template>
  <span class="tag" :class="[color]">
    {{ text }}
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
  align-items: center;
  border-radius: 2px;
  color: $white;
  display: flex;
  font-size: 10px;
  font-weight: bold;
  padding: 6px 10px;
  user-select: none;

  &.green {
    background: var(--tag-background);
  }

  &.red {
    background: $red-2;
  }
}
</style>
