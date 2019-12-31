<template>
  <div class="radon-operator">
    <Select
      :value="selectedOption"
      @input="option => updateTemplate(selectedOption.id, option.value)"
      :options="operatorOptions"
      type="operator"
    />
    <div class="with-arguments" v-if="hasArguments">
      <div v-for="(argument, index) in selectedOperator.arguments" :key="argument.label + index">
        <div v-if="argument.markupType === 'input'" class="input-container">
          <Input
            class="input-operator"
            :placeholder="argument.label"
            :value="argument.value"
            @input="value => updateTemplate(argument.id, value, variables)"
          />
          <font-awesome-icon class="link" v-show="hasVariables" icon="link" />
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
    <div class="icon-container">
      <font-awesome-icon class="icon sort-down" icon="sort-down" />
    </div>
  </div>
</template>

<script>
import Select from './Select'
import Input from '@/components/Input'
import {
  UPDATE_TEMPLATE,
  STORE_VARIABLE_COMPONENT_ID,
  TOOGLE_VARIABLES,
} from '@/store/mutation-types'

export default {
  name: 'RadonOperator',
  data() {
    return {
      variableName: null,
    }
  },
  props: {
    operator: {
      required: true,
    },
  },
  components: {
    Input,
    Select,
  },
  methods: {
    updateTemplate(id, value, variables) {
      console.log('updatetemplate', id, value, variables)
      if (value && this.hasArguments) {
        this.variableName = value
        this.$store.commit(TOOGLE_VARIABLES, { hasVariables: true })
        if (this.hasVariables) {
          const variableMatch = variables.find(x => x.key === value.slice(1))
          this.$store.commit(UPDATE_TEMPLATE, {
            id,
            value: '$' + variableMatch.key,
          })
          this.$store.commit(STORE_VARIABLE_COMPONENT_ID, {
            id: id,
            variable: variableMatch.key,
            value: variableMatch.value,
          })
        } else {
          this.$store.commit(TOOGLE_VARIABLES, { hasVariables: false })
          this.$store.commit(UPDATE_TEMPLATE, { id, value })
        }
        this.$store.dispatch('saveTemplate')
      } else {
        this.selected = { id: id, primaryText: value, value: value, secondaryText: 'boolean' }
        this.$store.commit(UPDATE_TEMPLATE, { id, value })
      }
    },
  },
  computed: {
    selectedOption() {
      return {
        id: this.operator.id,
        primaryText: this.operator.selected.label,
        value: this.operator.selected.label,
        secondaryText: this.operator.selected.outputType,
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
    emitIsVariable() {
      return this.this.$store.state.rad.currentTemplate.hasVariables
    },
    hasVariables() {
      if (typeof this.variableName === 'string') {
        const newValue = this.variableName.slice(1, this.variableName.length)
        if (this.variables.find(variable => variable.key === newValue)) {
          const valueInVariable = this.variables.find(variable => variable.key === newValue).key
          if (newValue === valueInVariable) {
            return true
          }
        }
      }
      return false
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
          primaryText: option.label,
          value: option.label,
          secondaryText: option.output_type,
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
  mounted() {
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
    width: 90px;
    height: 30px;
  }
  .variables {
    position: fixed;
    bottom: 40px;
    width: 200px;
    padding: 20px;
    background-color: black;
    color: white;
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
