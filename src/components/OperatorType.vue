<template>
  <p :class="`type ${type}`">
    {{ type }}
  </p>
</template>

<script>
export default {
  name: 'OperatorType',
  props: {
    type: String,
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.type {
  font-size: 14px;
  color: $grey-5;
  padding: 0px 4px;
  font-weight: normal;
  margin-left: 8px;
  border-radius: $input_big-border-radius;
  background-color: inherit;
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
  &.boolean {
    border: 1px solid $boolean;
  }
  &.generic {
    border: 1px solid $generic;
  }
  &.integer {
    border: 1px solid $integer;
  }
}
</style>
