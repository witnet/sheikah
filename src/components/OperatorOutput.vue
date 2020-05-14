<template>
  <div :class="`output ${label}`">
    <p class="label">{{ label }}</p>
    <div class="output-box" />
  </div>
</template>

<script>
export default {
  name: 'OperatorOutput',
  props: {
    label: String,
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.output {
  width: max-content;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  display: flex;
  align-items: center;
  border-radius: $input_big-border-radius;
  margin-left: 8px;
  overflow: hidden;
  .label {
    color: $white;
    padding: 0px 4px;
  }
  &.string {
    border: 1px solid $string;
    background-color: $string;
  }
  &.mixed {
    border: 1px solid $mixed;
    background-color: $mixed;
  }
  &.boolean {
    border: 1px solid $boolean;
    background-color: $boolean;
  }
  &.int {
    border: 1px solid $int;
    background-color: $int;
  }
  &.float {
    border: 1px solid $float;
    background-color: $float;
  }
  &.array {
    border: 1px solid $array;
    background-color: $array;
  }
  &.map {
    border: 1px solid $map;
    background-color: $map;
  }
  &.null {
    border: 1px solid $null;
    background-color: $null;
  }
  &.result {
    border: 1px solid $result;
    background-color: $result;
  }
  &.bytes {
    border: 1px solid $bytes;
    background-color: $bytes;
  }
  &.boolean {
    border: 1px solid $boolean;
    background-color: $boolean;
  }
  &.generic {
    border: 1px solid $generic;
    background-color: $generic;
  }
  &.integer {
    border: 1px solid $integer;
    background-color: $integer;
  }
  .output-box {
    min-width: 44px;
    height: 24px;
    background: $white;
  }
}
</style>
