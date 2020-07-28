<template>
  <div class="radon-script">
    <div class="operator-bottom">
      <div v-if="emptyScript" class="icon-container">
        <img
          class="row sheikah-icon"
          src="@/resources/svg/operator-arrow.svg"
        />
        <div class="add-operator-container">
          <img
            class="add-operator"
            src="@/resources/svg/add-operator.svg"
            @click="addOperator"
          />
          <p class="add-operator-text">Click to add an operator</p>
        </div>
      </div>
    </div>
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
          :operatorOutput="
            subscriptPartialResults &&
            subscriptPartialResults[subscriptIndex][index + 1]
              ? subscriptPartialResults[subscriptIndex][index + 1][0]
              : null
          "
          :error="radonError"
          :hideDelete="index === 0"
          @add-operator="addOperator"
          @delete-operator="removeOperator(operator.scriptId, operator.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { PUSH_OPERATOR, DELETE_OPERATOR } from '@/store/mutation-types'
import { mapMutations, mapState } from 'vuex'

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
    subscriptPartialResults: {
      type: Array,
      default: null,
    },
    subscriptId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState({
      subscriptIds: state => state.rad.subscriptIds,
    }),
    subscriptIndex() {
      return this.subscriptIds.findIndex(id => id === this.subscriptId)
    },
    emptyScript() {
      return this.script.length < 1
    },
    radonError() {
      return this.finalResult && this.finalResult.RadonError
        ? this.finalResult.RadonError
        : null
    },
  },
  created() {
    this.setSubscriptId({ id: this.subscriptId })
  },
  beforeDestroy() {
    this.clearSubscriptIds()
  },
  methods: {
    ...mapMutations({
      pushOperator: PUSH_OPERATOR,
      deleteOperator: DELETE_OPERATOR,
      clearDataRequestResult: 'clearDataRequestResult',
      setSubscriptId: 'setSubscriptId',
      clearSubscriptIds: 'clearSubscriptIds',
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

.operator-bottom {
  align-items: flex-start;
  display: flex;

  .icon-container {
    margin-left: 16px;
  }

  .output {
    margin-top: 16px;
  }
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
