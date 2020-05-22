<template>
  <div :class="`output ${label}`">
    <p v-show="filter" class="filter">{{ filter }}</p>
    <p class="label">{{ label }}</p>
    <div class="output-box" />
  </div>
</template>

<script>
export default {
  name: 'OperatorOutput',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    filter() {
      if (this.label === 'filterOutput') {
        return 'Array'
      } else {
        return null
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.output {
  align-items: center;
  border-radius: $input_big-border-radius;
  display: flex;
  font-size: 14px;
  font-weight: normal;
  margin-left: 8px;
  overflow: hidden;
  text-align: center;
  width: max-content;

  .label {
    color: $white;
    padding: 0 4px;
  }

  .filter {
    background-color: $black;
    color: $white;
    padding: 0 4px;
  }

  // TODO: get the output of the filter when the library is ready
  &.filterOutput {
    background-color: $string;
    border: 1px solid $string;
  }

  &.string {
    background-color: $string;
    border: 1px solid $string;
  }

  &.mixed {
    background-color: $mixed;
    border: 1px solid $mixed;
  }

  &.boolean {
    background-color: $boolean;
    border: 1px solid $boolean;
  }

  &.int {
    background-color: $int;
    border: 1px solid $int;
  }

  &.float {
    background-color: $float;
    border: 1px solid $float;
  }

  &.array {
    background-color: $array;
    border: 1px solid $array;
  }

  &.map {
    background-color: $map;
    border: 1px solid $map;
  }

  &.null {
    background-color: $null;
    border: 1px solid $null;
  }

  &.result {
    background-color: $result;
    border: 1px solid $result;
  }

  &.bytes {
    background-color: $bytes;
    border: 1px solid $bytes;
  }

  &.generic {
    background-color: $generic;
    border: 1px solid $generic;
  }

  &.integer {
    background-color: $integer;
    border: 1px solid $integer;
  }

  &.match {
    background-color: $matchOutput;
    border: 1px solid $matchOutput;
  }

  &.inner {
    background-color: $inner;
    border: 1px solid $inner;
  }

  &.same {
    background-color: $same;
    border: 1px solid $same;
  }

  &.subscriptOutput {
    background-color: $subscriptOutput;
    border: 1px solid $subscriptOutput;
  }

  .output-box {
    background: $white;
    height: 24px;
    min-width: 44px;
  }
}
</style>
