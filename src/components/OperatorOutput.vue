<template>
  <div :class="`output ${label}`">
    <p v-if="filter && !error" data-test="filter-output" class="filter"
      >array</p
    >
    <p class="label" data-test="label">{{ label }}</p>
    <div class="output-box">
      <!-- Partial result of the operator -->
      <div v-if="loading">
        <DotsLoading size="5px" color="#8280a4" margin="0" />
      </div>
      <el-popover
        v-if="showOutput"
        popper-class="result"
        data-test="output"
        :visible-arrow="false"
        placement="top-start"
        trigger="hover"
        :content="stringifiedOutput"
        width="max-content"
      >
        <template #reference>
          <p v-if="explicitOutput" class="icon explicit-output">
            {{ explicitOutput }}
          </p>
          <font-awesome-icon
            v-else-if="stringifiedOutput"
            class="icon"
            icon="eye"
          />
        </template>

        <JsonTree :data="simplifyDrResult(output)" />
      </el-popover>
      <!-- Empty state of the operator output -->
      <el-popover
        v-if="showEmptyState"
        data-test="empty-output"
        placement="top-start"
        :visible-arrow="false"
        trigger="hover"
        content="Click 'Try Data Request' to see the partial result"
      >
        <template #reference>
          <font-awesome-icon class="icon ban" icon="eye-slash" />
        </template>
      </el-popover>
      <!-- Error when trying data request-->
      <el-popover
        v-else-if="showError"
        data-test="error"
        placement="top-start"
        :visible-arrow="false"
        popper-class="error"
        width="500"
        trigger="hover"
        :content="error"
      >
        <template #reference>
          <font-awesome-icon class="icon error" icon="exclamation-triangle" />
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DotsLoading from '@/components/DotsLoading.vue'
import JsonTree from '@/components/JsonTree.vue'
import { simplifyDrResult } from '@/utils'

export default {
  name: 'OperatorOutput',
  components: {
    DotsLoading,
    JsonTree,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    output: {
      type: [Object, Array],
      default: () => {},
    },
    subscript: {
      type: Boolean,
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
    ...mapState({
      loading: state => state.uiInteractions.generateRadRequestResultLoading,
    }),
    explicitOutput() {
      return this.output &&
        (this.output.RadonInteger ||
          this.output.RadonFloat ||
          this.output.RadonBytes ||
          this.output.RadonString ||
          this.output.RadonBoolean)
        ? Object.values(this.output)[0]
        : null
    },
    stringifiedOutput() {
      return JSON.stringify(this.output)
    },
    showOutput() {
      return this.output && !this.error && !this.loading
    },
    showEmptyState() {
      return !this.output && !this.error && !this.loading
    },
    showError() {
      return this.error && !this.loading
    },
  },
  methods: {
    simplifyDrResult,
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/scroll.scss';

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
    color: var(--output-label-color);
    padding: 0 4px;
  }

  .output {
    bottom: 0;
    left: 100px;
    position: absolute;
    z-index: 2;
  }

  .filter {
    background-color: var(--reducer-color);
    color: var(--output-label-color);
    padding: 0 4px;
  }

  // TODO: get the output of the filter when the library is ready
  &.filter {
    background-color: $string;
    border: 1px solid $string;
  }

  &.reducer {
    background-color: var(--reducer-color);
    border: 1px solid var(--reducer-color);
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

  &.subscript {
    background-color: $subscriptOutput;
    border: 1px solid $subscriptOutput;
  }

  .output-box {
    align-items: center;
    background: var(--output-box);
    cursor: pointer;
    display: flex;
    height: 24px;
    justify-content: center;
    min-width: 44px;

    .icon {
      color: var(--output-icon);

      &.ban {
        color: var(--output-icon-disabled);
      }

      &.error {
        color: var(--output-icon-error);
      }

      &.explicit-output {
        color: var(--output-icon);
        font-size: 14px;
        max-width: 150px;
        overflow: hidden;
        padding: 4px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
