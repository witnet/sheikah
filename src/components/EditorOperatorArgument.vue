<template>
  <div class="argument-container">
    <div data-test="argument-input" v-if="argument.markupType === 'input'" class="input-container">
      <el-input
        class="input-operator"
        :placeholder="argument.label"
        :value="argument.value ? argument.value.toString() : ''"
        @input="value => updateTemplateAndVariables(value)"
      />
      <div class="link">
        <font-awesome-icon data-test="variable-link-icon" v-show="hasVariables" icon="link" />
        <OperatorType :type="argument.type" />
      </div>
    </div>
    <div
      data-test="argument-select"
      class="select-argument"
      v-if="argument.markupType === 'select'"
    >
      <Select
        :value="selectedArgumentValue"
        :options="argumentOptions"
        @input="value => updateTemplateAndVariables(value.primaryText)"
      />
      <div data-test="select-argument" v-if="argument.selected.arguments" class="input-container">
        <el-input
          class="input-operator"
          data-test="argument-input"
          :placeholder="argument.selected.arguments[0].label"
          :value="
            argument.selected.arguments ? argument.selected.arguments[0].value.toString() : ''
          "
          @input="value => updateTemplateAndVariables(value)"
        />
        <div class="link">
          <font-awesome-icon data-test="variable-link-icon" v-show="hasVariables" icon="link" />
          <OperatorType :type="argument.selected.arguments[0].type" />
        </div>
      </div>
    </div>
    <div v-if="argument.markupType === 'subscript'" class>
      Subscipts are not supported yet.
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select'
import OperatorType from '@/components/OperatorType'
import { mapState } from 'vuex'

export default {
  name: 'RadonOperator',
  components: {
    Select,
    OperatorType,
  },
  data() {
    return {
      selectedArgumentValue: {
        primaryText: this.argument.selected ? this.argument.selected.label : '',
        secondaryText: this.argument.selected ? this.argument.selected.outputType : '',
      },
    }
  },
  props: {
    argument: Object,
  },
  computed: {
    ...mapState({
      variables: state => state.rad.currentTemplate.variables,
    }),
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
    hasVariables() {
      if (typeof this.argument.value === 'string') {
        const newValue = this.argument.value.slice(1, this.argument.value.length)
        if (this.variables.find(variable => variable.key === newValue)) {
          const valueInVariable = this.variables.find(variable => variable.key === newValue).key
          if (newValue === valueInVariable) {
            return true
          }
        }
      }
      return false
    },
  },
  methods: {
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
    font-size: 10px;
    display: flex;
    align-items: center;
  }
}
</style>
