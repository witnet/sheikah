<template>
  <div class="radon-script">
    <div class="operators">
      <div
        v-for="(operator, index) in script"
        :key="operator.toString() + index"
        class="operator-container"
      >
        <RadonOperator
          data-test="radon-operator"
          class="operator"
          :operator="operator"
          :script-id="scriptId"
          :show-output-type="index !== script.length - 1"
          :subscript="true"
          :error="radonError"
          @add-operator="addOperator"
          @delete-operator="removeOperator(operator.scriptId, operator.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { PUSH_OPERATOR, DELETE_OPERATOR } from '@/store/mutation-types'
import { mapMutations } from 'vuex'

export default {
  name: 'Subscript',
  components: {
    RadonOperator: () => import('@/components/RadonOperator'),
  },
  props: {
    script: {
      type: Array,
      required: true,
    },
    scriptId: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    radonError() {
      return this.finalResult && this.finalResult.RadonError
        ? this.finalResult.RadonError
        : null
    },
  },
  methods: {
    ...mapMutations({
      pushOperator: PUSH_OPERATOR,
      deleteOperator: DELETE_OPERATOR,
    }),
    removeOperator(scriptId, operatorId) {
      this.deleteOperator({ scriptId, operatorId })
    },
    addOperator() {
      // TODO: get scriptId in a more consistent way
      this.pushOperator({
        scriptId: this.script[0] ? this.script[0].scriptId : this.scriptId,
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.radon-script {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content;
}

.operators {
  grid-column-end: -1;
  grid-column-start: 1;

  .operator-container {
    display: grid;
    grid-template-rows: min-content;
    margin: 16px;

    .operator {
      margin: 0 16px;
    }
  }
}
</style>

<docs>
### Subscript

```jsx
  <Subscript
      :script="[{
      hierarchicalType: 'operator',
      id: 12,
      label: 'getString',
      markupType: 'select',
      options: [{
        hierarchicalType: 'operatorOption',
        label: 'StringAsBoolean',
        markupType: 'option',
        outputType: 'boolean'
      },{
        hierarchicalType: 'operatorOption',
        label: 'StringAsBytes',
        markupType: 'option',
        outputType: 'bytes'
      },{
        hierarchicalType: 'operatorOption',
        label: 'StringAsFloat',
        markupType: 'option',
        outputType: 'float'
      },{
        hierarchicalType: 'operatorOption',
        label: 'StringAsInteger',
        markupType: 'option',
        outputType: 'integer'
      },{
        hierarchicalType: 'operatorOption',
        label: 'StringLength',
        markupType: 'option',
        outputType: 'integer'
      },{
        hierarchicalType: 'operatorOption',
        label: 'StringMatch',
        markupType: 'option',
        outputType: 'matchOutput'
      },{
        hierarchicalType: 'operatorOption',
        label: 'StringParseJsonArray',
        markupType: 'option',
        outputType: 'array'
      },{
        hierarchicalType: 'operatorOption',
        label: 'StringParseJsonMap',
        markupType: 'option',
        outputType: 'map'
      },{
        hierarchicalType: 'operatorOption',
        label: 'StringParseXML',
        markupType: 'option',
        outputType: 'map'
      },{
        hierarchicalType: 'operatorOption',
        label: 'StringToLowerCase',
        markupType: 'option',
        outputType: 'string'
      },{
        hierarchicalType: 'operatorOption',
        label: 'StringToUpperCase',
        markupType: 'option',
        outputType: 'string'
      }]
    }]"
  />
```

</docs>
