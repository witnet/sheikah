<template>
  <div class="radon-operator">
    <div class="selected-operator">
      <Select
        :value="selectedOption"
        @input="option => updateTemplate(selectedOption.id, option.value)"
        :options="options"
        v-on:filtered="filtered"
        type="operator"
      />
      <font-awesome-icon @click="deleteOperator" icon="times-circle" class="delete-op-btn" />
    </div>
    <div class="with-arguments" v-if="hasArguments">
      <div v-for="(argument, index) in selectedOperator.arguments" :key="argument.label + index">
        <div v-if="argument.markupType === 'input'" class="input-container">
          <el-input
            class="input-operator"
            size="small"
            data-test="argument-input"
            :placeholder="argument.label"
            :value="argument.value.toString()"
            @input="value => updateTemplate(argument.id, value, argument.type)"
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
          v-if="argument.markup_type === 'select'"
        >
          <p>{{ argument.label }}</p>
          <Select
            class="argument-options"
            :value="selectedArgument[index]"
            :options="argumentOptions[index]"
            type="operator"
          />
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
import Select from './Select'
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
  components: {
    Select,
  },
  methods: {
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
    deleteOperator() {
      this.$store.commit(DELETE_OPERATOR, {
        scriptId: this.scriptId,
        operatorId: this.operator.id,
      })
    },
    updateTemplate(id, value, type) {
      if (value && this.hasArguments) {
        this.variableName = value
        this.$store.commit(TOGGLE_VARIABLES, { hasVariables: true })
        if (this.hasVariables(value)) {
          const variableMatch = this.variables.find(x => x.key === value.slice(1))
          this.$store.commit(UPDATE_TEMPLATE, {
            id,
            value: '$' + variableMatch.key,
          })
          this.$store.commit(USED_VARIABLES, {
            id: id,
            variable: variableMatch.key,
            value: getNativeValueFromMarkupArgumentType(variableMatch.value, type),
          })
        } else {
          this.$store.commit(TOGGLE_VARIABLES, { hasVariables: false })
          this.$store.commit(UPDATE_TEMPLATE, {
            id,
            value: getNativeValueFromMarkupArgumentType(value, type),
          })
        }
        this.$store.dispatch('saveTemplate')
      } else {
        this.selected = { id: id, primaryText: value, value: value, secondaryText: 'boolean' }
        this.$store.commit(UPDATE_TEMPLATE, {
          id,
          value: getNativeValueFromMarkupArgumentType(value, type),
        })
        this.$store.dispatch('saveTemplate')
      }
    },
  },
  computed: {
    linkVariables() {
      return this.$store.state.rad.hasVariables
    },
    usedVariables() {
      return this.$store.state.rad.currentTemplate.usedVariables
    },
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
    variables() {
      return this.$store.state.rad.currentTemplate.variables
    },
    matchVariables() {
      return this.$store.state.rad.hasVariables
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
    operator(newOperator) {
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

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.radon-operator {
  border-radius: 5px;
  margin-bottom: 8px;
  .selected-operator {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .delete-op-btn {
      display: none;
      cursor: pointer;
      color: $red-0;
      font-size: 16px;
      background-color: transparent;
      border: none;
      margin-left: 20px;
      position: absolute;
      font-weight: 700;
    }
    &:hover .delete-op-btn {
      display: block;
    }
  }
}
.with-arguments {
  background-color: $grey-0;
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
