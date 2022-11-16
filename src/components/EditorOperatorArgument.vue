<template>
  <div class="argument-container">
    <div
      v-if="argument.markupType === 'input'"
      data-test="argument-input"
      class="input-container"
    >
      <el-input
        :ref="argument.id"
        :maxlength="60"
        class="input-operator"
        :placeholder="argument.label"
        :value="argumentValue"
        @input="
          value =>
            updateTemplateAndVariables({
              id: argument.id,
              value,
              type: argument.type,
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
        :ref="argument.id"
        :modelValue="selectedArgumentValue"
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
        v-if="
          argument.selected.arguments &&
          argument.selected.arguments.length > 0 &&
          argument.selected.arguments[0].markupType === 'input'
        "
        data-test="select-argument"
        class="input-container"
      >
        <el-input
          :ref="argument.selected.arguments[0].id"
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
                type: argument.selected.arguments[0].type,
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
      <div
        v-if="
          argument.selected.arguments &&
          argument.selected.arguments.length > 0 &&
          argument.selected.arguments[0].markupType === 'script'
        "
        class="subscripts"
      >
        <Subscript
          :subscript-id="argument.selected.arguments[0].id"
          :script="argument.selected.arguments[0].subscript"
          :subscript-partial-results="subscriptPartialResults"
        />
      </div>
    </div>
    <div v-if="argument.markupType === 'script'" class="subscripts">
      <div class="operators">
        <Subscript
          :subscript-id="subscript[0].id"
          :script="subscript"
          :subscript-partial-results="subscriptPartialResults"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Select from '@/components/Select.vue'
import Subscript from '@/components/Subscript.vue'
import OperatorType from '@/components/OperatorType.vue'

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
    subscriptPartialResults: {
      type: Array,
      default: null,
    },
    error: {
      type: String,
      default: null,
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
      currentFocus: state => state.rad.currentFocus,
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
      if (this.argument.type === 'map') {
        return typeof this.argument.value === 'object'
          ? JSON.stringify(this.argument.value)
          : this.argument.value
      } else if (this.argument.type === 'number') {
        return this.argument.value
      } else if (this.argument.value || this.argument.type === 'boolean') {
        return this.argument.value.toString()
      } else {
        return ''
      }
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
  watch: {
    async currentFocus(val) {
      if ((val || Number.isInteger(val)) && this.$refs[val]) {
        await this.$nextTick()

        this.scrollToCurrentFocus()
      }
    },
  },
  mounted() {
    if (
      (this.currentFocus || Number.isInteger(this.currentFocus)) &&
      this.$refs[this.currentFocus]
    ) {
      this.scrollToCurrentFocus()
    }
  },
  methods: {
    scrollToCurrentFocus() {
      this.$refs[this.currentFocus].$el.scrollIntoView()
      this.$store.commit('clearCurrentFocus')
    },
    // FIXME(#19): fix update select argument in radon.js library
    updateTemplateAndVariables(updater) {
      this.$emit('update', updater)
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
  border: var(--input-border);
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
