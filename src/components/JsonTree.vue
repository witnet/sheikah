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
      type: [Boolean, Number, Object, String],
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.json-tree-root {
  background-color: white;
  border-radius: 3px;
  margin: 2px 0;
  min-width: max-content;
  padding: 10px;
}

.json-tree {
  color: $alt-grey-3;
  font-family: Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  line-height: 20px;
}

.json-tree-row:hover {
  background-color: #f9f5fe;
}

.json-tree-key {
  word-wrap: none;
}

.json-tree-ending {
  &.json-tree-paired {
    background-color: #f9f5fe;
  }
}

.json-tree-value-string {
  color: $alt-grey-6;
  max-width: 300px;
  overflow-wrap: break-word;
}

.json-tree-value-boolean {
  color: $alt-grey-6;
}
</style>
