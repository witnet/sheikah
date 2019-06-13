<template>
  <textarea
    @input="$emit('update:model', $event.target.value)"
    v-value="model"
    :class="type === 'big' ? type : '' "
  />
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: String,
    model: {
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';

.big {
  border: $input_big-border;
  border-radius: $input_big-border-radius;
  min-height: 80px;
  transition: all 0.1s ease;
  width: $input_big-width;

  &:hover,
  &:focus {
    border: $input_big-hover-border;
    box-shadow: $input_big-hover-box-shadow;
    outline: 0;
    outline-color: transparent;
    outline-style: none;
  }
}
</style>
