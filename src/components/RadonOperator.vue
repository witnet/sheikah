<template>
  <div
    class="radon-operator"
    @mouseover="showDelete = true"
    @mouseleave="showDelete = false"
  >
    <div class="border">
      <el-tooltip
        v-show="showDelete && !hideDelete"
        :content="$t('delete_operator')"
        placement="right"
        effect="light"
      >
        <p class="delete" data-test="delete-operator" @click="deleteOperator">
          <CustomIcon name="DeleteBtn" />
        </p>
      </el-tooltip>
      <p data-test="operator-label" class="label">{{ $t('operator') }}</p>
      <Select
        ref="operator"
        data-test="operator"
        type="operator"
        :model-value="selectedOption"
        :options="operatorOptions"
        @input="
          option => updateOperatorAndVariables(selectedOption.id, option.value)
        "
      />
      <p v-if="hasArguments" data-test="arguments-label" class="label">{{
        $t('arguments')
      }}</p>
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
        <CustomIcon class-name="row sheikah-icon" name="OperatorArrow" />
      </div>
      <div v-else class="icon-container">
        <CustomIcon class-name="row sheikah-icon" name="LongArrow" />
        <div
          class="add-operator-container"
          data-test="add-operator"
          @click="addOperator"
        >
          <CustomIcon
            class-name="add-operator"
            data-test="add-operator"
            name="AddOperator"
          />
          <p class="add-operator-text">{{ $t('add_operator') }}</p>
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
import { mapState, mapMutations } from 'vuex'
import EditorOperatorArgument from '@/components/EditorOperatorArgument.vue'
import OperatorOutput from '@/components/OperatorOutput.vue'
import Select from '@/components/Select.vue'
import CustomIcon from '@/components/CustomIcon.vue'
import {
  standardizeOperatorName,
  standardizeOutputType,
  selectInnerError,
  getNativeValueFromMarkupArgumentType,
} from '@/utils'
import {
  UPDATE_TEMPLATE,
  USED_VARIABLES,
  TOGGLE_VARIABLES,
  DELETE_USED_VARIABLE,
} from '@/store/mutation-types'

export default {
  name: 'RadonOperator',
  components: {
    OperatorOutput,
    Select,
    EditorOperatorArgument,
    CustomIcon,
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
      template: state => state.rad.currentTemplate,
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
      deleteUsedVariable: DELETE_USED_VARIABLE,
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
        this.usedVariables({
          id: id,
          variable: variableMatch.key,
          value: variableMatch.value,
          type: type,
        })
        this.updateTemplate({
          id,
          value: '$' + variableMatch.key,
        })
      } else {
        this.template.usedVariables.map((variable, index) => {
          if (variable.id === id) {
            this.deleteUsedVariable({ index })
          }
        })
        this.toggleVariables({ hasVariables: false })
        this.updateTemplate({
          id,
          value: getNativeValueFromMarkupArgumentType(value, type),
        })
      }
    },
    updateOperatorAndVariables(id, value) {
      this.selected = {
        id: id,
        primaryText: value,
        value,
        secondaryText: 'boolean',
      }
      this.updateTemplate({
        id,
        value,
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
    border: var(--operator-border);
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
      top: 4px;
      width: 10px;
    }

    .label {
      color: var(--text-medium-emphasis);
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
        color: var(--text-low-emphasis);
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
