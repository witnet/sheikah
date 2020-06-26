<template>
  <div class="argument-container">
    <div
      v-if="argument.markupType === 'input'"
      data-test="argument-input"
      class="input-container"
    >
      <el-input
        class="input-operator"
        :placeholder="argument.label"
        :value="argumentValue"
        @input="
          value =>
            updateTemplateAndVariables({
              id: argument.id,
              value,
              type: argument.markupType,
            })
        "
      />
      <div class="link">
        <font-awesome-icon
          v-show="hasVariables"
          data-test="variable-link-icon"
          icon="link"
        />
        <OperatorType v-if="argument.type" :type="argument.type" />
      </div>
    </div>
    <div
      v-if="argument.markupType === 'select'"
      data-test="argument-select"
      class="select-argument"
    >
      <Select
        :value="selectedArgumentValue"
        :options="argumentOptions"
        @input="
          value =>
            updateTemplateAndVariables({
              id: argument.id,
              value: value.primaryText,
              type: argument.markupType,
            })
        "
      />
      <div
        v-if="argument.selected.arguments"
        data-test="select-argument"
        class="input-container"
      >
        <el-input
          class="input-operator"
          data-test="argument-input"
          :placeholder="argument.selected.arguments[0].label"
          :value="
            argument.selected.arguments
              ? argument.selected.arguments[0].value.toString()
              : ''
          "
          @input="
            value =>
              updateTemplateAndVariables({
                id: argument.selected.arguments[0].id,
                value,
                type: argument.selected.arguments[0].markupType,
              })
          "
        />
        <div class="link">
          <font-awesome-icon
            v-show="hasArgumentVariables"
            data-test="variable-link-icon"
            icon="link"
          />
          <OperatorType :type="argument.selected.arguments[0].type" />
        </div>
      </div>
    </div>
    <div v-if="argument.markupType === 'script'" class="subscripts">
      <div class="operators">
        <Subscript :script="subscript" />
      </div>
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select'
import Subscript from '@/components/Subscript'
import OperatorType from '@/components/OperatorType'
import { mapState } from 'vuex'

export default {
  name: 'EditorOperatorArgument',
  components: {
    Select,
    Subscript,
    OperatorType,
  },
  props: {
    argument: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedArgumentValue: {
        primaryText: this.argument.selected ? this.argument.selected.label : '',
        secondaryText: this.argument.selected
          ? this.argument.selected.outputType
          : '',
      },
    }
  },
  computed: {
    ...mapState({
      variables: state => state.rad.currentTemplate.variables,
    }),
    subscript() {
      return this.argument.subscript
    },
    argumentOptions() {
      return this.argument.options
        ? this.argument.options.map(option => {
            return {
              primaryText: option.label,
              secondaryText: option.outputType,
            }
          })
        : []
    },
    argumentValue() {
      return this.argument.value || typeof this.argument.value === 'boolean'
        ? this.argument.value.toString()
        : ''
    },
    hasArgumentVariables() {
      const argumentLabel = this.argument.selected.arguments[0].value
      if (typeof argumentLabel === 'string') {
        const newValue = argumentLabel.slice(1, argumentLabel.length)
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
    hasVariables() {
      if (typeof this.argument.value === 'string') {
        const newValue = this.argument.value.slice(
          1,
          this.argument.value.length,
        )
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
  },
  methods: {
    // FIXME(#19): fix update select argument in radon.js library
    updateTemplateAndVariables(value) {
      this.$emit('update', value)
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.select-argument {
  display: grid;
  grid-template-rows: repeat(auto-fit, auto);
  row-gap: 8px;
}

.subscripts {
  border: $input_border;
  border-radius: $input_big-border-radius;

  .empty {
    color: $grey-5;
    font-size: 14px;
    padding: 16px;
  }
}

.input-container {
  align-items: center;
  display: flex;
  justify-content: right;
  position: relative;
  width: 100%;

  .link {
    align-items: center;
    color: $grey-5;
    display: flex;
    font-size: 10px;
    position: absolute;
    right: 16px;
  }
}
</style>
