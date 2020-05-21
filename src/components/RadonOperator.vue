<template>
  <div class="radon-operator">
    <div class="border">
      <p data-test="operator-label" class="label">Operator</p>
      <Select
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
          :argument="argument"
          @update="value => updateArgumentsAndVariables(value)"
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
        <div class="add-operator-container">
          <img
            class="add-operator"
            src="@/resources/svg/add-operator.svg"
            @click="addOperator"
          />
          <p class="add-operator-text">Click to add another operator</p>
        </div>
      </div>
      <OperatorOutput class="output" :label="selectedOption.secondaryText" />
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
} from '@/utils'
import {
  UPDATE_TEMPLATE,
  USED_VARIABLES,
  TOGGLE_VARIABLES,
  DELETE_OPERATOR,
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
    scriptId: {
      type: Number,
      required: true,
    },
    operator: {
      type: Object,
      required: true,
    },
    sourceIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      variableName: null,
    }
  },
  computed: {
    ...mapState({
      variables: state => state.rad.currentTemplate.variables,
    }),
    selectedOption() {
      return {
        id: this.operator.id,
        primaryText: this.operator.selected.label,
        value: this.operator.selected.label,
        secondaryText: this.operator.selected.outputType,
      }
    },
    selectedOperatorArguments() {
      return this.operator.selected.arguments
    },
    hasArguments() {
      return !!this.selectedOperator.arguments.length
    },
    selectedOperator() {
      return this.operator.selected
    },
    operatorOptions() {
      return this.operator.options.map(option => {
        return {
          primaryText: standardizeOperatorName(option.label),
          value: option.label,
          secondaryText: option.outputType,
        }
      })
    },
  },
  mounted() {
    this.selectedOperator.arguments.forEach(arg => {
      this.variableName = arg.value
    })
  },
  methods: {
    ...mapMutations({
      deleteOperator: DELETE_OPERATOR,
      toggleVariables: TOGGLE_VARIABLES,
      updateTemplate: UPDATE_TEMPLATE,
      usedVariables: USED_VARIABLES,
    }),
    ...mapActions({
      saveTemplate: 'saveTemplate',
    }),
    addOperator() {
      this.$emit('add-operator')
    },
    hasVariables(value) {
      if (typeof value === 'string') {
        const newValue = value.slice(1, value.length)
        if (this.variables.find(variable => variable.key === newValue)) {
          const valueInVariable = this.variables.find(
            variable => variable.key === newValue
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
            type
          ),
        })
      } else {
        this.toggleVariables({ hasVariables: false })
        this.updateTemplate({
          id,
          value: getNativeValueFromMarkupArgumentType(value, type),
        })
      }
      this.saveTemplate()
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
      this.saveTemplate()
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
    align-items: center;
    border: $input_border;
    border-radius: $input_big-border-radius;
    column-gap: 16px;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(auto-fit, auto);
    padding: 16px;
    row-gap: 16px;

    .label {
      color: $grey-5;
      font-size: 14px;
      font-weight: normal;
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
</style>

<docs>
### Example

```jsx
  <RadonOperator
    :showOutputType="true"
    :scriptId=1
    :operator="{
      selected:{
        label: 'asFloat',
        outputType: 'float',
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
    }"
  />
```
</docs>
