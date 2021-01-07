<template>
  <JsonViewer :data="data" :level="2" />
</template>

<script>
import JsonViewer from 'vue-json-tree'

export default {
  name: 'JsonTree',
  components: {
    JsonViewer,
  },
  props: {
    data: {
      type: [Boolean, Number, Object, String, Array],
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.json-tree-root {
  background-color: var(--tooltip-background);
  border-radius: 3px;
  margin: 2px 0;
  min-width: max-content;
  padding: 10px;
}

.json-tree {
  color: var(--text-medium-emphasis);
  font-family: Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  line-height: 20px;
}

.json-tree-row:hover {
  background-color: var(--app-background-color);
}

.json-tree-key {
  word-wrap: none;
}

.json-tree-ending {
  &.json-tree-paired {
    background-color: var(--app-background-color);
  }
}

.json-tree-value-string {
  color: var(--text-high-emphasis);
  max-width: 300px;
  overflow-wrap: break-word;
}

.json-tree-value-boolean {
  color: var(--text-high-emphasis);
}
</style>
