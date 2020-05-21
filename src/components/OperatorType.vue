<template>
  <p :class="`type ${type}`">
    {{ type }}
  </p>
</template>

<script>
export default {
  name: 'OperatorType',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.type {
  background-color: inherit;
  border-radius: $input_big-border-radius;
  color: $grey-5;
  font-size: 14px;
  font-weight: normal;
  margin-left: 8px;
  padding: 0 4px;

  &.string {
    border: 1px solid $string;
  }

  &.mixed {
    border: 1px solid $mixed;
  }

  &.boolean {
    border: 1px solid $boolean;
  }

  &.int {
    border: 1px solid $int;
  }

  &.float {
    border: 1px solid $float;
  }

  &.array {
    border: 1px solid $array;
  }

  &.map {
    border: 1px solid $map;
  }

  &.null {
    border: 1px solid $null;
  }

  &.result {
    border: 1px solid $result;
  }

  &.bytes {
    border: 1px solid $bytes;
  }

  &.generic {
    border: 1px solid $generic;
  }

  &.integer {
    border: 1px solid $integer;
  }
}
</style>
