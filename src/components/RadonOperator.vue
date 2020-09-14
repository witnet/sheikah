<template>
  <div
    class="radon-operator"
    @mouseover="showDelete = true"
    @mouseleave="showDelete = false"
  >
    <div class="border">
      <el-tooltip
        v-show="showDelete && !hideDelete"
        content="Delete operator"
        placement="right"
        effect="light"
      >
        <img
          class="delete"
          src="@/resources/svg/delete-btn.svg"
          @click="deleteOperator"
        />
      </el-tooltip>
      <p data-test="operator-label" class="label">Operator</p>
      <Select
        ref="operator"
        data-test="operator"
        type="operator"
        :value="selectedOption"
        :options="operatorOptions"
        @input="
          option => updateOperatorAndVariables(selectedOption.id, option.value)
        "
      />
      <p v-if="hasArguments" data-test="arguments-label" class="label"
        >Arguments</p
      >
      <div v-if="hasArguments" data-test="has-arguments" class="with-arguments">
        <EditorOperatorArgument
          v-for="(argument, index) in selectedOperatorArguments"
          :key="argument.label + index"
          :subscript-partial-results="subscriptPartialResults"
          :argument="argument"
          :error="error"
          @update="updater => updateArgumentsAndVariables(updater)"
        />
      </div>
    </div>
    <div class="operator-bottom">
      <div v-if="showOutputType" class="icon-container">
        <img
          class="row sheikah-icon"
          src="@/resources/svg/operator-arrow.svg"
        />
      </div>
      <div v-else class="icon-container">
        <img class="row sheikah-icon" src="@/resources/svg/long-arrow.svg" />
        <div class="add-operator-container" @click="addOperator">
          <img
            class="add-operator"
            data-test="add-operator"
            src="@/resources/svg/add-operator.svg"
          />
          <p class="add-operator-text">Click to add another operator</p>
        </div>
      </div>
      <OperatorOutput
        :subscript="subscript"
        class="output"
        :label="outputLabel"
        :filter="isFilter"
        :output="operatorOutput"
        :error="radonError"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import EditorOperatorArgument from '@/components/EditorOperatorArgument.vue'
import OperatorOutput from '@/components/OperatorOutput.vue'
import Select from '@/components/Select'
import {
  standardizeOperatorName,
  getNativeValueFromMarkupArgumentType,
  standardizeOutputType,
  selectInnerError,
} from '@/utils'
import {
  UPDATE_TEMPLATE,
  USED_VARIABLES,
  TOGGLE_VARIABLES,
} from '@/store/mutation-types'

export default {
  name: 'RadonOperator',
  components: {
    OperatorOutput,
    Select,
    EditorOperatorArgument,
  },
  props: {
    showOutputType: {
      // eslint-disable-next-line vue/no-boolean-default
      default: true,
      type: Boolean,
    },
    subscript: {
      type: Boolean,
    },
    scriptId: {
      type: Number,
      default: null,
    },
    hideDelete: {
      type: Boolean,
    },
    operator: {
      type: Object,
      required: true,
    },
    error: {
      type: String,
      default: null,
    },
    subscriptPartialResults: {
      type: Array,
      default: null,
    },
    operatorOutput: {
      type: Object,
      default: () => {},
    },
    sourceIndex: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      variableName: null,
      showDelete: false,
    }
  },
  computed: {
    ...mapState({
      variables: state => state.rad.currentTemplate.variables,
      currentFocus: state => state.rad.currentFocus,
    }),
    radonError() {
      return this.outputLabel === 'error' || !this.operatorOutput
        ? selectInnerError(this.error)
        : null
    },
    isReducer() {
      return this.operator.selected.outputType === 'reducerOutput'
    },
    isFilter() {
      return this.operator.selected.outputType === 'filterOutput'
    },
    outputLabel() {
      if (this.operatorOutput) {
        const output =
          this.isFilter && this.operatorOutput.RadonArray
            ? this.operatorOutput.RadonArray[0]
            : this.operatorOutput
        const innerOutput = Object.keys(output)[0]
        return standardizeOperatorName(innerOutput)
      } else if (this.error) {
        return 'error'
      } else {
        return standardizeOutputType(this.operator.selected.outputType)
      }
    },
    selectedOperatorArguments() {
      return this.operator.selected.arguments
    },
    hasArguments() {
      return !!this.selectedOperator.arguments.length
    },
    selectedOption() {
      return {
        id: this.operator.id,
        primaryText: this.operator.selected.label,
        value: this.operator.selected.label,
        secondaryText:
          this.isReducer || this.isFilter
            ? null
            : standardizeOutputType(this.operator.selected.outputType),
      }
    },
    selectedOperator() {
      return this.operator.selected
    },
    operatorOptions() {
      const isFirstSubscriptOperator = this.subscript && this.hideDelete
      return this.operator.options.map(option => {
        return {
          primaryText: isFirstSubscriptOperator
            ? option.label
            : standardizeOperatorName(option.label),
          value: option.label,
          secondaryText:
            this.isReducer || this.isFilter
              ? null
              : standardizeOutputType(option.outputType),
        }
      })
    },
  },
  watch: {
    async currentFocus(val) {
      if ((val || Number.isInteger(val)) && val === this.operator.id) {
        await this.$nextTick()
        this.scrollToCurrentFocus()
      }
    },
  },
  async mounted() {
    this.selectedOperator.arguments.forEach(arg => {
      this.variableName = arg.value
    })

    if (
      (this.currentFocus || Number.isInteger(this.currentFocus)) &&
      this.currentFocus === this.operator.id
    ) {
      await this.$nextTick()

      this.scrollToCurrentFocus()
    }
  },
  methods: {
    ...mapMutations({
      toggleVariables: TOGGLE_VARIABLES,
      updateTemplate: UPDATE_TEMPLATE,
      usedVariables: USED_VARIABLES,
    }),
    ...mapActions({
      tryDataRequest: 'tryDataRequest',
    }),
    addOperator() {
      this.$emit('add-operator')
    },
    deleteOperator() {
      this.$emit('delete-operator')
    },
    hasVariables(value) {
      if (typeof value === 'string') {
        const newValue = value.slice(1, value.length)
        if (this.variables.find(variable => variable.key === newValue)) {
          const valueInVariable = this.variables.find(
            variable => variable.key === newValue,
          ).key
          if (newValue === valueInVariable) {
            return true
          }
        }
      }
      return false
    },
    updateArgumentsAndVariables(input) {
      const id = input.id
      const value = input.value
      const type = input.type

      this.variableName = value
      this.toggleVariables({ hasVariables: true })
      if (this.hasVariables(value)) {
        const variableMatch = this.variables.find(x => x.key === value.slice(1))
        this.updateTemplate({
          id,
          value: '$' + variableMatch.key,
        })
        this.usedVariables({
          id: id,
          variable: variableMatch.key,
          value: getNativeValueFromMarkupArgumentType(
            variableMatch.value,
            type,
          ),
        })
      } else {
        this.toggleVariables({ hasVariables: false })
        this.updateTemplate({
          id,
          value: getNativeValueFromMarkupArgumentType(value, type),
        })
      }
    },
    updateOperatorAndVariables(id, value, type) {
      this.selected = {
        id: id,
        primaryText: value,
        value: value,
        secondaryText: 'boolean',
      }
      this.updateTemplate({
        id,
        value: getNativeValueFromMarkupArgumentType(value, type),
      })
    },
    scrollToCurrentFocus() {
      this.$refs.operator.$el.scrollIntoView()
      this.$store.commit('clearCurrentFocus')
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.radon-operator {
  border-radius: 5px;
  margin-bottom: 8px;
  min-width: max-content;
  position: relative;

  .border {
    border: $input_border;
    border-radius: $input_big-border-radius;
    column-gap: 16px;
    display: grid;
    grid-template-columns: auto auto;
    padding: 16px 24px 16px 16px;
    padding-right: 24;
    position: relative;
    row-gap: 16px;

    .delete {
      cursor: pointer;
      position: absolute;
      right: 8px;
      top: 8px;
      width: 10px;
    }

    .label {
      color: $grey-5;
      font-size: 14px;
      font-weight: normal;
    }

    .output {
      .label {
        color: white;
      }
    }

    .with-arguments {
      display: grid;
      grid-template-rows: repeat(auto-fit, auto);
      row-gap: 16px;
    }
  }

  .operator-select {
    width: 100%;
  }

  .selected-operator {
    align-items: center;
    display: flex;
    justify-content: flex-start;

    .el-input__prefix {
      left: 185px;
      top: 14px;

      .delete {
        background-color: transparent;
        color: $red-2;
        cursor: pointer;
        display: none;
        font-size: 12px;
        font-weight: 700;
        vertical-align: middle;
      }
    }
  }
}

.radon-operator:hover {
  .selected-operator {
    .delete {
      display: block;
    }
  }
}

.operator-bottom {
  align-items: flex-start;
  display: flex;

  .output {
    margin-top: 16px;
  }

  .icon-container {
    margin-left: 16px;
    position: relative;
    text-align: left;

    .add-operator-container {
      bottom: 24px;
      cursor: pointer;
      display: flex;
      left: -4px;
      position: absolute;
      width: max-content;

      .add-operator-text {
        color: $grey-4;
        font-size: 12px;
        font-weight: medium;
        margin-left: 16px;
      }
    }
  }
}
@media (max-width: 1300px) {
  .radon-operator {
    .border {
      grid-template-columns: 1fr;
    }
  }
}
</style>

<docs>
### Example

```jsx
  <RadonOperator
    :showOutputType="true"
    :scriptId=1
    :operator="{
      selected:{
        label: 'map',
        outputType: 'subscriptOutput',
        arguments: [{
          hierarchicalType: 'argument',
          id: 14,
          label: 'key',
          markupType: 'input',
          type: 'string',
          value: 'best_block_hash'
        },{
          hierarchicalType: 'argument',
          id: 14,
          label: 'key',
          markupType: 'subscript',
          script: [{
            selected:{
              label: 'map',
              outputType: 'subscriptOutput',
              arguments: [{
                hierarchicalType: 'argument',
                id: 14,
                label: 'key',
                markupType: 'input',
                type: 'string',
                value: 'best_block_hash'
              }]
            },
            options: [{
                label: 'asBoolean',
                outputType: 'boolean',
              },{
                label: 'asBytes',
                outputType: 'bytes',
              },{
                label: 'asFloat',
                outputType: 'float',
              },
            ]
          }]
        }]
      },
      options: [{
          label: 'asBoolean',
          outputType: 'boolean',
        },{
          label: 'asBytes',
          outputType: 'bytes',
        },{
          label: 'asFloat',
          outputType: 'float',
        },
      ]
    }"
  />
```

### Subscript

```jsx
  <RadonOperator
    :showOutputType="true"
    :scriptId=1
    :operator="{
      hierarchicalType: 'operator',
      id: 9,
      label: 'sort',
      markupType: 'select',
      outputType: 'same',
      scriptId: 2,
      options: [{
        hierarchicalType: 'operatorOption',
        label: 'ArrayCount',
        markupType: 'option',
        outputType: 'integer'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArrayFilter',
        markupType: 'option',
        outputType: 'same'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArrayFlatten',
        markupType: 'option',
        outputType: 'array'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArrayGetArray',
        markupType: 'option',
        outputType: 'array'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArrayGetBoolean',
        markupType: 'option',
        outputType: 'boolean'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArrayGetBytes',
        markupType: 'option',
        outputType: 'bytes'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArrayGetFloat',
        markupType: 'option',
        outputType: 'float'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArrayGetInteger',
        markupType: 'option',
        outputType: 'integer'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArrayGetMap',
        markupType: 'option',
        outputType: 'map'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArrayGetString',
        markupType: 'option',
        outputType: 'string'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArrayMap',
        markupType: 'option',
        outputType: 'arrayMap'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArrayReduce',
        markupType: 'option',
        outputType: 'inner'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArraySome',
        markupType: 'option',
        outputType: 'filterOutput'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArraySort',
        markupType: 'option',
        outputType: 'same'
      },{
        hierarchicalType: 'operatorOption',
        label: 'ArrayTake',
        markupType: 'option',
        outputType: 'array'
      }],
      selected:{
        description: 'Sort the input Array in 103,symbol order',
        arguments:[{
            hierarchicalType: 'argument',
            id: 10,
            label: 'mapFunction',
            markupType: 'script',
            outputType: 'subscriptOutput',
            subscript:[{
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
                }],
                outputType: 'string',
                scriptId: 11,
                selected:{
                  arguments: [{
                    hierarchicalType: 'argument',
                    id: 13,
                    label: 'key',
                    markupType: 'input',
                    value: 'symbol',
                    type: 'string'
                  }],
                  description: 'Access to the “symbol” key of the input Map, and manage the value as String',
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'getString',
                  markupType: 'option',
                  outputType: 'string'
                }
              }
            ]
          }
        ],
        hierarchicalType: 'selectedOperatorOption',
        label: 'sort',
        markupType: 'option',
        outputType: 'same'
      },
    }"
  />
```

</docs>
