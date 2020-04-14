<template>
  <div class="radon-operator">
    <div class="selected-operator">
      <el-select
        data-test="select-btn"
        class="operator-select"
        v-model="selectedOptionValue"
        @change="value => updateTemplateAndVariables(selectedOption.id, value)"
        :clearable="true"
        v-on:clear="
          deleteOperator({
            scriptId: scriptId,
            operatorId: operator.id,
          })
        "
      >
        <el-option
          v-for="(x, idx) in options"
          :key="x.primaryText + selectedOption.id + idx"
          :label="x.primaryText"
          :value="x.value"
        >
          <span :data-test="`option-${idx}`" style="float: left">{{ x.primaryText }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">
            {{ x.secondaryText }}
          </span>
        </el-option>
      </el-select>
    </div>
    <div class="with-arguments" v-if="hasArguments">
      <div v-for="(argument, index) in selectedOperator.arguments" :key="argument.label + index">
        <div v-if="argument.markupType === 'input'" class="input-container">
          <el-input
            class="input-operator"
            size="small"
            data-test="argument-input"
            :placeholder="argument.label"
            :value="argument.value ? argument.value.toString() : ''"
            @input="value => updateTemplateAndVariables(argument.id, value, argument.type)"
          />
          <font-awesome-icon
            data-test="variable-link-icon"
            class="link"
            v-show="hasVariables(argument.value)"
            icon="link"
          />
        </div>
        <div
          :style="{ display: 'flex', flexDirection: 'column' }"
          v-if="argument.markupType === 'select'"
        >
          <p>{{ argument.label }}</p>
          <el-select
            class="argument-options"
            v-model="selectedArgumentValue[index]"
            :options="argumentOptions[index]"
          >
            <el-option
              v-for="o in argumentOptions[index]"
              :key="o.primaryText"
              :label="o.primaryText"
              :value="o.primaryText"
            >
            </el-option>
          </el-select>
        </div>
        <div v-if="argument.markupType === 'subscript'" class>
          Subscipts are not supported yet.
        </div>
      </div>
    </div>
    <div v-if="showUnionIcon" class="icon-container">
      <font-awesome-icon class="icon sort-down" icon="sort-down" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { standardizeOperatorName, getNativeValueFromMarkupArgumentType } from '@/utils'
import {
  UPDATE_TEMPLATE,
  USED_VARIABLES,
  TOGGLE_VARIABLES,
  DELETE_OPERATOR,
} from '@/store/mutation-types'

export default {
  name: 'RadonOperator',
  data() {
    return {
      variableName: null,
      options: [],
      selectedOptionValue: this.operator.label,
      selectedArgumentValue: [
        this.operator.selected.arguments[0] ? this.operator.selected.arguments[0].value : '',
        this.operator.selected.arguments[1] ? this.operator.selected.arguments[1].value : '',
      ],
    }
  },
  props: {
    showUnionIcon: {
      type: Boolean,
      default: false,
    },
    showOutputType: {
      default: true,
      type: Boolean,
    },
    scriptId: {
      required: true,
    },
    operator: {
      required: true,
    },
    sourceIndex: Number,
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
    // TODO: find a better way to filter when searching a specific operator
    filtered(filtered) {
      this.options = filtered
    },
    hasVariables(value) {
      if (typeof value === 'string') {
        const newValue = value.slice(1, value.length)
        if (this.variables.find(variable => variable.key === newValue)) {
          const valueInVariable = this.variables.find(variable => variable.key === newValue).key
          if (newValue === valueInVariable) {
            return true
          }
        }
      }
      return false
    },
    updateTemplateAndVariables(id, value, type) {
      if (value && this.hasArguments) {
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
            value: getNativeValueFromMarkupArgumentType(variableMatch.value, type),
          })
        } else {
          this.toggleVariables({ hasVariables: false })
          this.updateTemplate({
            id,
            value: getNativeValueFromMarkupArgumentType(value, type),
          })
        }
        this.saveTemplate()
      } else {
        this.selected = { id: id, primaryText: value, value: value, secondaryText: 'boolean' }
        this.updateTemplate({
          id,
          value: getNativeValueFromMarkupArgumentType(value, type),
        })
        this.saveTemplate()
      }
    },
  },
  computed: {
    ...mapState({
      linkVariables: state => state.rad.hasVariables,
      variables: state => state.rad.currentTemplate.variables,
      matchVariables: state => state.rad.hasVariables,
    }),
    selectedOption() {
      return {
        id: this.operator.id,
        primaryText: this.operator.selected.label,
        value: this.operator.selected.label,
        secondaryText: this.showOutputType ? this.operator.selected.outputType : '',
      }
    },
    hasArguments() {
      return !!this.selectedOperator.arguments.length
    },
    selectedOperator() {
      return this.operator.selected
    },
    selectedArgument: {
      get() {
        const selectedArg = this.hasArguments
          ? this.operator.selected.arguments.map(argument => {
              return {
                primaryText: argument.label,
                secondaryText: argument.output_type,
              }
            })
          : []
        return selectedArg
      },
      set(inputValue) {
        return inputValue
      },
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
    argumentOptions() {
      return this.hasArguments
        ? this.operator.selected.arguments.map(argument => {
            return argument.options
              ? argument.options.map(option => {
                  return {
                    primaryText: option.label,
                    secondaryText: option.output_type,
                  }
                })
              : []
          })
        : []
    },
  },
  watch: {
    selectedOption(selected) {
      this.selectedOptionValue = selected.value
    },
    operator(newOperator) {
      const selectedOperatorArgs = newOperator.selected.arguments
      this.selectedOptionValue = newOperator.label
      this.selectedArgumentValue = [
        selectedOperatorArgs[0] ? selectedOperatorArgs[0].value : '',
        selectedOperatorArgs[1] ? selectedOperatorArgs[1].value : '',
      ]
      this.options = this.operatorOptions
    },
  },
  mounted() {
    this.options = this.operatorOptions
    this.selectedOperator.arguments.forEach(arg => {
      this.variableName = arg.value
    })
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.radon-operator {
  border-radius: 5px;
  margin-bottom: 8px;
  .operator-select {
    width: 100%;
  }
  .selected-operator {
    display: flex;
    align-items: center;
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

.with-arguments {
  background-color: $grey-1;
  padding: 8px;
}
.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .input-operator {
    margin: 8px;
    width: 90px;
    height: 30px;
  }
  .variables {
    position: fixed;
    bottom: 40px;
    width: 200px;
    padding: 16px;
    background-color: black;
    color: $white;
    .variable-value {
      background-color: black;
      width: 80px;
      height: 20px;
    }
  }
  .link {
    font-size: 12px;
    margin-left: 16px;
  }
}
.icon-container {
  text-align: right;
  .icon {
    font-size: 25px;
    margin-right: 16px;
  }
}
</style>
