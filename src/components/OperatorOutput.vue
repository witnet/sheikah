<template>
  <div :class="`output ${label}`">
    <p v-show="filter" class="filter">{{ filter }}</p>
    <p class="label">{{ label }}</p>
    <div class="output-box">
      <el-popover
        v-if="output && !error"
        offset="300"
        popper-class="result"
        placement="top-start"
        width="500"
        trigger="hover"
        :content="operatorOutput">
        <font-awesome-icon v-if="operatorOutput" slot="reference" class="icon" icon="eye" />
      </el-popover>
      <el-popover
        v-if="!output && !error"
        placement="top-start"
        trigger="hover"
        content="Click try data request to see the result">
        <font-awesome-icon slot="reference" class="icon ban" icon="eye-slash" />
      </el-popover>
      <el-popover
        v-if="error"
        placement="top-start"
        popper-class="error"
        width="500"
        trigger="hover"
        :content="error">
        <font-awesome-icon slot="reference" class="icon error" icon="exclamation-triangle" />
      </el-popover>
    </div>
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
    output: {
      type: Object,
      default: () => {},
    },
    error: {
      type: String,
      default: null,
    }
  },
  computed: {
    filter() {
      if (this.label === 'filter') {
        return 'array'
      } else {
        return null
      }
    },
    operatorOutput() {
      return JSON.stringify(this.output)
    }
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.el-popover {
  &.error {
    color: $red-2;
  }

  &.result {
    max-height: 500px;
    overflow-y: auto;
  }
}

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

  .output {
    bottom: 0;
    left: 100px;
    position: absolute;
    z-index: 2;
  }

  .filter {
    background-color: $black;
    color: $white;
    padding: 0 4px;
  }

  // TODO: get the output of the filter when the library is ready
  &.filter {
    background-color: $string;
    border: 1px solid $string;
  }

  &.reducer {
    background-color: $black;
    border: 1px solid $black;
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
    align-items: center;
    background: $white;
    cursor: pointer;
    display: flex;
    height: 24px;
    justify-content: center;
    min-width: 44px;

    .icon {
      color: $grey-5;

      &.ban {
        color: $grey-2;
      }

      &.error {
        color: $red-2;
      }
    }
  }
}
</style>
