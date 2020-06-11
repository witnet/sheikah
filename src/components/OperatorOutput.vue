<template>
  <div :class="`output ${label}`">
    <p v-if="filter && !error" data-test="filter-output" class="filter"
      >array</p
    >
    <p class="label" data-test="label">{{ label }}</p>
    <div class="output-box">
      <!-- Partial result of the operator -->
      <el-popover
        v-if="output && !error"
        popper-class="result"
        placement="top-start"
        trigger="hover"
        :content="operatorOutput"
      >
        <p
          v-if="explicitOutput"
          slot="reference"
          data-test="output"
          class="icon explicit-output "
        >
          {{ explicitOutput }}
        </p>
        <font-awesome-icon
          v-else-if="operatorOutput"
          slot="reference"
          data-test="output"
          class="icon"
          icon="eye"
        />
      </el-popover>
      <!-- Empty state of the operator output -->
      <el-popover
        v-if="!output && !error"
        placement="top-start"
        trigger="hover"
        content="Click 'Try Data Request' to see the partial result"
      >
        <font-awesome-icon
          slot="reference"
          data-test="empty-output"
          class="icon ban"
          icon="eye-slash"
        />
      </el-popover>
      <!-- Error when trying data request-->
      <el-popover
        v-if="error"
        placement="top-start"
        popper-class="error"
        width="500"
        trigger="hover"
        :content="error"
      >
        <font-awesome-icon
          slot="reference"
          data-test="error"
          class="icon error"
          icon="exclamation-triangle"
        />
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
    },
    filter: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // FIXME(#1192): include RadonString as explicit output and define max-width of the shown partial result
    explicitOutput() {
      return this.output &&
        (this.output.RadonInteger ||
          this.output.RadonFloat ||
          this.output.RadonBoolean)
        ? Object.values(this.output)[0]
        : null
    },
    operatorOutput() {
      return JSON.stringify(this.output)
    },
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
    max-width: 500px;
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

  &.error {
    background-color: $red-2;
    border: 1px solid $red-2;
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

      &.explicit-output {
        color: $grey-5;
        font-size: 14px;
        max-width: 150px;
        padding: 4px;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
