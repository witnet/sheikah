<template>
  <div class="radon-operator">
    <div class="border">
      <p class="label">Operator</p>
      <Select
        :value="selectedOption"
        type="operator"
        :options="operatorOptions"
        @input="option => updateTemplateAndVariables(selectedOption.id, option.value)"
      />
      <p class="label" v-if="hasArguments">Arguments</p>
      <div class="with-arguments" v-if="hasArguments">
        <div v-for="(argument, index) in selectedOperator.arguments" :key="argument.label + index">
          <div v-if="argument.markupType === 'input'" class="input-container">
            <el-input
              class="input-operator"
              data-test="argument-input"
              :placeholder="argument.label"
              :value="argument.value ? argument.value.toString() : ''"
              @input="value => updateTemplateAndVariables(argument.id, value, argument.type)"
            />
            <div class="link">
              <font-awesome-icon
                data-test="variable-link-icon"
                v-show="hasVariables(argument.value)"
                icon="link"
              />
              <p :class="`type ${argument.type}`">
                {{ argument.type }}
              </p>
            </div>
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
    </div>
    <div class="operator-bottom">
      <div class="icon-container">
        <img class="row sheikah-icon" src="@/resources/svg/operator-arrow.svg" />
      </div>
      <div :class="`output ${selectedOption.secondaryText}`">
        <p class="label">{{ selectedOption.secondaryText }}</p>
        <div class="output-box" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Select from '@/components/Select'
import { standardizeOperatorName, getNativeValueFromMarkupArgumentType } from '@/utils'
import {
  UPDATE_TEMPLATE,
  USED_VARIABLES,
  TOGGLE_VARIABLES,
  DELETE_OPERATOR,
} from '@/store/mutation-types'

export default {
  name: 'RadonOperator',
  components: {
    Select,
  },
  data() {
    return {
      variableName: null,
      options: [],
      selectedOptionValue: {
        primaryText: this.operator.label,
        secondaryText: this.operator.outputType,
      },
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
        secondaryText: this.operator.selected.outputType,
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
  min-width: max-content;
  position: relative;
  .border {
    padding: 16px;
    border: $input_border;
    border-radius: $input_big-border-radius;
    display: grid;
    row-gap: 16px;
    column-gap: 16px;
    align-items: center;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(auto-fit, auto);
    .label {
      font-size: 14px;
      color: $grey-5;
      font-weight: normal;
    }
  }
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

.input-container {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: right;
  align-items: center;
  .link {
    color: $grey-5;
    right: 16px;
    position: absolute;
    font-size: 12px;
    display: flex;
    align-items: center;
    .type {
      font-size: 14px;
      color: $grey-5;
      padding: 0px 4px;
      font-weight: normal;
      margin-left: 8px;
      border-radius: $input_big-border-radius;
      background-color: $white;
      &.string {
        border: 1px solid $string;
      }
      &.mixed {
        border: 1px solid $mixed;
      }
      &.boolean {
        border: 1px solid $boolean;
      }
      &.int {
        border: 1px solid $int;
      }
      &.float {
        border: 1px solid $float;
      }
      &.array {
        border: 1px solid $array;
      }
      &.map {
        border: 1px solid $map;
      }
      &.null {
        border: 1px solid $null;
      }
      &.result {
        border: 1px solid $result;
      }
      &.bytes {
        border: 1px solid $bytes;
      }
      &.boolean {
        border: 1px solid $boolean;
      }
      &.generic {
        border: 1px solid $generic;
      }
      &.integer {
        border: 1px solid $integer;
      }
    }
  }
}
.operator-bottom {
  display: flex;
  align-items: center;
  .icon-container {
    text-align: left;
    margin-left: 16px;
  }
  .output {
    width: max-content;
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    display: flex;
    align-items: center;
    border-radius: $input_big-border-radius;
    margin-left: 8px;
    overflow: hidden;
    .label {
      color: $white;
      padding: 0px 4px;
    }
    &.string {
      border: 1px solid $string;
      background-color: $string;
    }
    &.mixed {
      border: 1px solid $mixed;
      background-color: $mixed;
    }
    &.boolean {
      border: 1px solid $boolean;
      background-color: $boolean;
    }
    &.int {
      border: 1px solid $int;
      background-color: $int;
    }
    &.float {
      border: 1px solid $float;
      background-color: $float;
    }
    &.array {
      border: 1px solid $array;
      background-color: $array;
    }
    &.map {
      border: 1px solid $map;
      background-color: $map;
    }
    &.null {
      border: 1px solid $null;
      background-color: $null;
    }
    &.result {
      border: 1px solid $result;
      background-color: $result;
    }
    &.bytes {
      border: 1px solid $bytes;
      background-color: $bytes;
    }
    &.boolean {
      border: 1px solid $boolean;
      background-color: $boolean;
    }
    &.generic {
      border: 1px solid $generic;
      background-color: $generic;
    }
    &.integer {
      border: 1px solid $integer;
      background-color: $integer;
    }
    .output-box {
      min-width: 44px;
      height: 24px;
      background: $white;
    }
  }
}
</style>
