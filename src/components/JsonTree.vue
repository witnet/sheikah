<template>
  <JsonViewer :value="data" :expand-depth="2" theme="json-tree-viewer-theme" />
</template>

<script>
import JsonViewer from 'vue-json-viewer'

export default {
  name: 'JsonTree',
  components: {
    JsonViewer,
  },
  props: {
    data: {
      type: [Boolean, Number, Object, String],
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.json-tree-viewer-theme {
  .jv-item {
    &.jv-array {
      color: $black;
    }

    &.jv-boolean {
      color: $black;
    }

    &.jv-number {
      color: $black;
    }

    &.jv-object {
      color: $black;
    }

    &.jv-undefined {
      color: $black;
    }

    &.jv-string {
      color: $black;
    }
  }
}
</style>
